// Volume 1 purchase fulfillment — turns a Selar sale into a working access code.
//
// Selar does not publish a fixed webhook payload schema, so this function
// reads the buyer's email defensively from several common field shapes
// instead of assuming one exact structure. Whichever path you wire up
// (Selar's own webhook setting, if it has one, or Zapier's "New Sale"
// trigger -> Webhooks by Zapier -> POST), the only hard requirement is
// that the request includes the buyer's email somewhere in the JSON body.
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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Unambiguous alphabet — no 0/O or 1/I so a typed-out code is never confusing.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode(): string {
  const part = (len: number) =>
    Array.from(
      { length: len },
      () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)],
    ).join("");
  return `NOTE-${part(4)}-${part(4)}`;
}

// Walks a handful of common shapes (Selar-native, Zapier-mapped, Gumroad-style,
// generic) looking for the buyer's email. Returns the first match.
function extractEmail(payload: Record<string, unknown>): string | null {
  const candidates = [
    payload.email,
    payload.buyer_email,
    payload.customer_email,
    (payload.customer as Record<string, unknown> | undefined)?.email,
    (payload.buyer as Record<string, unknown> | undefined)?.email,
    (payload.data as Record<string, unknown> | undefined)?.email,
    (payload.data as Record<string, unknown> | undefined)?.buyer_email,
    (payload.data as Record<string, unknown> | undefined)?.customer_email,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && EMAIL_RE.test(candidate.trim())) {
      return candidate.trim().toLowerCase();
    }
  }
  return null;
}

// Best-effort order reference for idempotency. Returns null if none found —
// the webhook still works, it just cannot dedupe a retried call.
function extractOrderRef(payload: Record<string, unknown>): string | null {
  const candidates = [
    payload.order_id,
    payload.reference,
    payload.transaction_id,
    payload.id,
    (payload.data as Record<string, unknown> | undefined)?.order_id,
    (payload.data as Record<string, unknown> | undefined)?.reference,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    if (typeof candidate === "number") return String(candidate);
  }
  return null;
}

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

    // Idempotency — if this exact order already produced a code, resend
    // nothing new and just confirm success (handles retried webhook calls).
    if (orderRef) {
      const { data: existing } = await supabase
        .from("volume1_access")
        .select("code")
        .eq("order_ref", orderRef)
        .maybeSingle();

      if (existing) {
        console.log("[selar-webhook] order already processed, skipping", orderRef);
        return new Response(JSON.stringify({ ok: true, duplicate: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const code = generateCode();
    const { error: insertError } = await supabase.from("volume1_access").insert({
      code,
      buyer_email: email,
      order_ref: orderRef,
    });

    if (insertError) {
      console.error("[selar-webhook] insert failed", insertError);
      return new Response(JSON.stringify({ ok: false, error: "insert_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("[selar-webhook] RESEND_API_KEY not set — code created but not emailed:", code);
      return new Response(JSON.stringify({ ok: true, emailed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Note You Needed Today <letters@thenoteyouneeded.today>",
        to: [email],
        subject: "Your access code for Volume 1",
        text: [
          "Thank you for getting Volume 1.",
          "",
          `Your access code: ${code}`,
          "",
          "Enter it here to start reading immediately:",
          "https://thenoteyouneeded.today/volume-1/unlock",
          "",
          "This code is yours. Keep this email — you can use the code again on",
          "any device.",
          "",
          "With love,",
          "MAD",
          "The Note You Needed Today",
        ].join("\n"),
      }),
    });

    if (!emailRes.ok) {
      console.error(
        "[selar-webhook] resend failed — code created but not emailed:",
        code,
        await emailRes.text(),
      );
      return new Response(JSON.stringify({ ok: true, emailed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("[selar-webhook] code generated and emailed to", email);
    return new Response(JSON.stringify({ ok: true, emailed: true }), {
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
