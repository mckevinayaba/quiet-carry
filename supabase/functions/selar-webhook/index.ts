// Volume 1 purchase fulfillment — turns a Selar sale into a working access code.
//
// Selar does not publish a fixed webhook payload schema, so this function
// reads the buyer's email defensively from several common field shapes
// instead of assuming one exact structure. Whichever path you wire up
// (Selar's own webhook setting, if it has one, or Zapier's "New Sale"
// trigger -> Webhooks by Zapier -> POST), the only hard requirement is
// that the request includes the buyer's email somewhere in the JSON body.
//
// Selar has no native webhook field and "Webhooks by Zapier" requires a
// paid Zapier plan, so the active fulfillment path is selar-poll (polling
// the Selar orders API on a cron schedule) — see that function's header.
// This webhook is kept in place in case Selar adds native webhooks later,
// or you upgrade Zapier; it shares the same fulfillment logic via
// _shared/volume1-fulfillment.ts so both paths stay identical.
//
// Setup:
//   1. Deploy:
//      supabase functions deploy selar-webhook --no-verify-jwt
//   2. Set secrets (Supabase dashboard -> Edge Functions -> selar-webhook -> Secrets,
//      or `supabase secrets set`):
//        RESEND_API_KEY          (already used by send-daily-note)
//        SELAR_WEBHOOK_SECRET    (any random string you choose)
//   3. Point Selar (or your Zapier "Webhooks by Zapier" action) at:
//        https://<project-ref>.supabase.co/functions/v1/selar-webhook?secret=<SELAR_WEBHOOK_SECRET>
//   4. Make one real test purchase. Check this function's logs in the
//      Supabase dashboard. If "no_email_found" appears, paste the logged
//      raw payload back so the email field path can be added in minutes.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { extractEmail, extractOrderRef, fulfillOrder } from "../_shared/volume1-fulfillment.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const expectedSecret = Deno.env.get("SELAR_WEBHOOK_SECRET");
    const providedSecret = url.searchParams.get("secret");

    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // Secret can arrive either in the URL (Selar-native webhooks usually
    // cannot add custom headers) or in the body (Zapier can add either).
    const bodySecret = typeof body.secret === "string" ? body.secret : undefined;
    if (!expectedSecret || (providedSecret !== expectedSecret && bodySecret !== expectedSecret)) {
      console.error("[selar-webhook] rejected — missing or wrong secret");
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("[selar-webhook] payload received:", JSON.stringify(body));

    const email = extractEmail(body);
    if (!email) {
      console.error("[selar-webhook] no_email_found in payload — see logged payload above");
      return new Response(JSON.stringify({ ok: false, error: "no_email_found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderRef = extractOrderRef(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const result = await fulfillOrder(supabase, email, orderRef, Deno.env.get("RESEND_API_KEY"));

    if (!result.ok) {
      return new Response(JSON.stringify(result), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (result.duplicate) {
      console.log("[selar-webhook] order already processed, skipping", orderRef);
    } else {
      console.log("[selar-webhook] code generated and emailed to", email, "emailed:", result.emailed);
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[selar-webhook] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
