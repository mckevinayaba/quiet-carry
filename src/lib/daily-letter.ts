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

export async function subscribeToQuietLetter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) return { ok: false, error: "invalid_email" };

  const { data, error } = await supabase.functions.invoke("subscribe-daily-letter", {
    body: { email: trimmed },
  });

  if (error) {
    if (import.meta.env.DEV) console.error("[daily-letter] subscribe failed", error);
    return { ok: false, error: error.message };
  }

  if (data && data.ok === false) {
    return { ok: false, error: data.error };
  }

  return { ok: true };
}
