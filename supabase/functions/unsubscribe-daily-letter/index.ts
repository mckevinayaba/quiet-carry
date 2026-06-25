// Quiet Daily Delivery — one-click unsubscribe.
// Called from /unsubscribe?id=<subscriber id>, linked from every daily
// letter and the confirmation email. Sets active=false. No auth required —
// standard practice for unsubscribe links; worst case someone unsubscribes
// an email they don't own, which is a no-op risk, not a security one.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let id: string | null = null;

    if (req.method === "GET") {
      id = new URL(req.url).searchParams.get("id");
    } else {
      const body = await req.json().catch(() => ({}));
      id = typeof body.id === "string" ? body.id : null;
    }

    if (!id) {
      return new Response(JSON.stringify({ ok: false, error: "missing_id" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase
      .from("daily_subscribers")
      .update({ active: false })
      .eq("id", id);

    if (error) {
      console.error("[unsubscribe-daily-letter] update failed", error);
      return new Response(JSON.stringify({ ok: false, error: "update_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[unsubscribe-daily-letter] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
