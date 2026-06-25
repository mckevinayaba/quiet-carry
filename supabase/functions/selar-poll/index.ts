// Volume 1 purchase fulfillment — polling path.
//
// Selar has no native webhook field, and Zapier's "Webhooks by Zapier"
// action requires a paid Zapier plan. This function polls Selar's orders
// API directly on a schedule instead, so fulfillment needs no third-party
// tool at all.
//
// Selar's orders API response shape is not publicly documented, so this
// function reads defensively: it accepts the order list at the top level,
// under `data`, or under `orders`, and reads email/order-id/status from
// several common field names (see _shared/volume1-fulfillment.ts). If a
// real poll logs "no orders array found" or processes zero orders when it
// shouldn't, paste the logged raw response back and the parsing can be
// corrected in minutes — same approach used to get selar-webhook working.
//
// Setup:
//   1. Deploy:
//      supabase functions deploy selar-poll --no-verify-jwt
//   2. Set secrets (Supabase dashboard -> Edge Functions -> selar-poll -> Secrets):
//        SELAR_API_KEY     (from Selar -> Integrations page, e.g. sat_...)
//        RESEND_API_KEY    (already set for the other functions)
//   3. Schedule it to run every 5 minutes:
//      Supabase dashboard -> Edge Functions -> selar-poll -> there should be
//      a "Cron" / "Schedule" tab — set it to `*/5 * * * *`.
//      If the dashboard has no scheduling UI for functions yet, use
//      pg_cron + pg_net from the SQL editor instead:
//
//        select cron.schedule(
//          'selar-poll-every-5-min',
//          '*/5 * * * *',
//          $$
//          select net.http_post(
//            url := 'https://<project-ref>.supabase.co/functions/v1/selar-poll',
//            headers := jsonb_build_object('Authorization', 'Bearer <SUPABASE_SERVICE_ROLE_KEY>')
//          );
//          $$
//        );
//
//   4. Trigger it manually once (curl or the dashboard's "Invoke" button)
//      after a real purchase and check the logs.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import {
  extractEmail,
  extractOrderRef,
  fulfillOrder,
  isCompletedOrder,
} from "../_shared/volume1-fulfillment.ts";

const SELAR_ORDERS_URL = "https://api.selar.co/v1/merchant/products/orders";

// Selar's orders list may come back as a bare array, or wrapped under one
// of these keys. Try each until one yields an array.
function extractOrdersArray(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const key of ["data", "orders", "results"]) {
      if (Array.isArray(obj[key])) return obj[key] as Record<string, unknown>[];
    }
  }
  return [];
}

Deno.serve(async (req: Request) => {
  try {
    const selarApiKey = Deno.env.get("SELAR_API_KEY");
    if (!selarApiKey) {
      console.error("[selar-poll] SELAR_API_KEY is not set");
      return new Response(JSON.stringify({ ok: false, error: "no_selar_key" }), { status: 500 });
    }

    // Selar's API quirk: returns HTTP 500 with body {"status":"error","message":"","data":[]}
    // when there are simply no orders. We treat that shape as a valid empty result.
    let rawPayload: unknown = null;
    let bodyText = "";
    let status = 0;

    try {
      const res = await fetch(SELAR_ORDERS_URL, {
        headers: {
          Authorization: `Bearer ${selarApiKey}`,
          Accept: "application/json",
        },
      });
      status = res.status;
      bodyText = await res.text();
      console.log(`[selar-poll] url=${SELAR_ORDERS_URL} status=${status} body=${bodyText.slice(0, 500)}`);
      try {
        rawPayload = JSON.parse(bodyText);
      } catch {
        rawPayload = null;
      }
    } catch (fetchErr) {
      console.error("[selar-poll] fetch threw:", fetchErr);
      return new Response(JSON.stringify({ ok: false, error: "fetch_threw" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payloadObj = (rawPayload && typeof rawPayload === "object") ? rawPayload as Record<string, unknown> : null;
    const hasEmptyDataArray = !!payloadObj && Array.isArray(payloadObj.data) && (payloadObj.data as unknown[]).length === 0;
    const isOkStatus = status >= 200 && status < 300;
    const isQuirkEmpty = status === 500 && hasEmptyDataArray;

    if (!isOkStatus && !isQuirkEmpty) {
      console.error(`[selar-poll] orders fetch failed status=${status}`);
      return new Response(
        JSON.stringify({ ok: false, error: "orders_fetch_failed", status, body: bodyText.slice(0, 500) }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const orders = extractOrdersArray(rawPayload);

    if (orders.length === 0) {
      console.log("[selar-poll] no orders to process (empty data array)");
      return new Response(
        JSON.stringify({ ok: true, processed: 0, note: "no_orders_yet" }),
        { headers: { "Content-Type": "application/json" } },
      );
    }


    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    let processed = 0;
    let skipped = 0;
    let failed = 0;

    for (const order of orders) {
      if (!isCompletedOrder(order)) {
        skipped += 1;
        continue;
      }

      const email = extractEmail(order);
      if (!email) {
        console.error("[selar-poll] order with no extractable email:", JSON.stringify(order).slice(0, 300));
        failed += 1;
        continue;
      }

      const orderRef = extractOrderRef(order);
      const result = await fulfillOrder(supabase, email, orderRef, resendApiKey);

      if (!result.ok) {
        failed += 1;
        continue;
      }
      if (result.duplicate) {
        skipped += 1;
      } else {
        processed += 1;
        console.log("[selar-poll] fulfilled order", orderRef, "->", email, "emailed:", result.emailed);
      }
    }

    return new Response(JSON.stringify({ ok: true, processed, skipped, failed }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[selar-poll] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), { status: 500 });
  }
});
