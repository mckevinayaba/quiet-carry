// Daily quiet-letter subscription.
// Calls the subscribe-daily-letter edge function, which inserts into
// daily_subscribers and sends the confirmation email via Resend.
// The client never touches the Resend API key directly.

import { supabase } from "@/integrations/supabase/client";
import { isValidEmail } from "@/lib/waitlist";

export interface SubscribeResult {
  ok: boolean;
  error?: string;
}

const TIMEOUT_MS = 8_000;

export async function subscribeToQuietLetter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) return { ok: false, error: "invalid_email" };

  const timeout = new Promise<SubscribeResult>((resolve) =>
    setTimeout(() => resolve({ ok: false, error: "timeout" }), TIMEOUT_MS),
  );

  const request = supabase.functions
    .invoke("subscribe-daily-letter", { body: { email: trimmed } })
    .then(({ data, error }) => {
      if (error) {
        if (import.meta.env.DEV) console.error("[daily-letter] subscribe failed", error);
        return { ok: false, error: error.message } as SubscribeResult;
      }
      if (data && data.ok === false) return { ok: false, error: data.error } as SubscribeResult;
      return { ok: true } as SubscribeResult;
    })
    .catch((err: unknown) => {
      if (import.meta.env.DEV) console.error("[daily-letter] unexpected error", err);
      return { ok: false, error: "unknown" } as SubscribeResult;
    });

  return Promise.race([request, timeout]);
}
