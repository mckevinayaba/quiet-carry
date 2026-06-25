// Quiet Daily Delivery — opt-in endpoint.
// Inserts into daily_subscribers (service role, bypasses RLS) and sends the
// confirmation email via Resend. The client never sees RESEND_API_KEY.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    const trimmed = String(email ?? "").trim();

    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inserted, error: insertError } = await supabase
      .from("daily_subscribers")
      .insert({ email: trimmed })
      .select("id")
      .single();

    let subscriberId: string | null = inserted?.id ?? null;

    // 23505 = unique violation — already subscribed. Look up their existing
    // row so the confirmation email still gets a working unsubscribe link.
    if (insertError && insertError.code === "23505") {
      const { data: existing } = await supabase
        .from("daily_subscribers")
        .select("id")
        .eq("email", trimmed)
        .maybeSingle();
      subscriberId = existing?.id ?? null;
    } else if (insertError) {
      console.error("[subscribe-daily-letter] insert failed", insertError);
      return new Response(JSON.stringify({ ok: false, error: "insert_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const unsubscribeUrl = subscriberId
      ? `https://thenoteyouneeded.today/unsubscribe?id=${subscriberId}`
      : "https://thenoteyouneeded.today/unsubscribe";

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Note You Needed Today <letters@notify.thenoteyouneeded.today>",
          to: [trimmed],
          subject: "You are on the quiet list.",
          text: [
            "You asked for one quiet letter a day.",
            "We will send it each morning.",
            "",
            "No noise. No branding. No call to action.",
            "Just the note you needed.",
            "",
            `If you ever want to stop, click here and it's done instantly: ${unsubscribeUrl}`,
            "",
            "With love,",
            "MAD",
            "The Note You Needed Today",
          ].join("\n"),
        }),
      });

      if (!emailRes.ok) {
        // Subscriber is already saved — log but do not fail the request.
        console.error("[subscribe-daily-letter] resend failed", await emailRes.text());
      }
    } else {
      console.error("[subscribe-daily-letter] RESEND_API_KEY is not set");
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[subscribe-daily-letter] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
