// Daily quiet-letter subscription.
// Calls the public TanStack server route /api/public/quiet-letter-subscribe,
// which inserts into daily_subscribers and enqueues the confirmation email
// via Lovable Emails.

import { isValidEmail } from "@/lib/waitlist";

export interface SubscribeResult {
  ok: boolean;
  error?: string;
}

const TIMEOUT_MS = 10_000;

export async function subscribeToQuietLetter(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) return { ok: false, error: "invalid_email" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch("/api/public/quiet-letter-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      if (import.meta.env.DEV) console.error("[daily-letter] subscribe failed", res.status, data);
      return { ok: false, error: data?.error ?? `http_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    if (import.meta.env.DEV) console.error("[daily-letter] unexpected error", err);
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return { ok: false, error: aborted ? "timeout" : "unknown" };
  } finally {
    clearTimeout(timer);
  }
}
