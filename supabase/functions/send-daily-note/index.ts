// Quiet Daily Delivery — cron-triggered send.
// Selects all active subscribers and sends each one today's note via Resend.
//
// NOT scheduled automatically. To activate, add a cron trigger in the
// Supabase dashboard (Edge Functions → send-daily-note → Cron) or via the
// CLI: `supabase functions deploy send-daily-note --no-verify-jwt` then
// schedule with `select cron.schedule(...)` pointing at this function's URL.
// Left unset intentionally — activate manually when ready.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { notesSnapshot } from "./notes-snapshot.ts";

const SUBJECT_BY_DAY: Record<number, string> = {
  0: "For the quiet before the week begins again.",
  1: "For the mornings that feel heavier before they feel lighter.",
  2: "Before the day asks anything of you, this is for you.",
  3: "For the version of you that woke up already carrying something.",
  4: "You have been carrying this since morning.",
  5: "For the long middle of a week that asked a lot.",
  6: "The week is behind you. This is for what it left.",
};

function getDailyNoteIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return dayOfYear % notesSnapshot.length;
}

function buildEmailBody(note: (typeof notesSnapshot)[number], unsubscribeUrl: string): string {
  return [
    note.title,
    "",
    note.body,
    "",
    `FROM: ${note.from}`,
    `TO: ${note.to}`,
    `DATE: ${note.date}`,
    `TOTAL: ${note.total}`,
    "",
    "---",
    "One quiet caption for today:",
    note.caption,
    "",
    "---",
    "One question, if you have the space for it:",
    note.journalPrompt,
    "",
    "---",
    "thenoteyouneeded.today",
    `To stop receiving these letters: ${unsubscribeUrl}`,
  ].join("\n");
}

Deno.serve(async (req: Request) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: subscribers, error } = await supabase
      .from("daily_subscribers")
      .select("id, email")
      .eq("active", true);

    if (error) {
      console.error("[send-daily-note] failed to load subscribers", error);
      return new Response(JSON.stringify({ ok: false, error: "load_failed" }), { status: 500 });
    }

    const note = notesSnapshot[getDailyNoteIndex()];
    const subject = SUBJECT_BY_DAY[new Date().getDay()];
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("[send-daily-note] RESEND_API_KEY is not set");
      return new Response(JSON.stringify({ ok: false, error: "no_resend_key" }), { status: 500 });
    }

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers ?? []) {
      const unsubscribeUrl = `https://thenoteyouneeded.today/unsubscribe?id=${subscriber.id}`;
      const body = buildEmailBody(note, unsubscribeUrl);

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Note You Needed Today <letters@thenoteyouneeded.today>",
          to: [subscriber.email],
          subject,
          text: body,
        }),
      });

      if (res.ok) {
        sent += 1;
      } else {
        failed += 1;
        console.error("[send-daily-note] send failed for", subscriber.email, await res.text());
      }
    }

    return new Response(JSON.stringify({ ok: true, sent, failed }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[send-daily-note] unexpected error", err);
    return new Response(JSON.stringify({ ok: false, error: "unexpected" }), { status: 500 });
  }
});
