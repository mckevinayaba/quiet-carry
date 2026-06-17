// Waitlist + feedback persistence.
// Writes to Lovable Cloud (Postgres via Supabase). RLS allows INSERT for
// anon + authenticated; reads are admin-only from the dashboard.

import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export type WaitlistSource = "volume" | "account" | "landing";

export interface SaveResult {
  ok: boolean;
  error?: string;
}

function browserContext() {
  if (typeof window === "undefined") return { user_agent: null, page_path: null };
  return {
    user_agent: navigator.userAgent ?? null,
    page_path: window.location.pathname ?? null,
  };
}

export async function saveWaitlistEntry(
  email: string,
  source: WaitlistSource,
): Promise<SaveResult> {
  const trimmed = email.trim();
  if (!trimmed) return { ok: false, error: "empty" };

  const { error } = await supabase.from("waitlist").insert({
    email: trimmed,
    source,
    ...browserContext(),
  });

  // Postgres unique violation (already on the list for this source) — treat as success.
  if (error && error.code === "23505") return { ok: true };

  if (error) {
    if (import.meta.env.DEV) console.error("[waitlist] insert failed", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function saveFeedbackEntry(text: string): Promise<SaveResult> {
  const trimmed = text.trim();
  if (!trimmed) return { ok: false, error: "empty" };
  if (trimmed.length > 1000) return { ok: false, error: "too_long" };

  const { error } = await supabase.from("feedback").insert({
    message: trimmed,
    source: "app",
    ...browserContext(),
  });

  if (error) {
    if (import.meta.env.DEV) console.error("[feedback] insert failed", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export function isValidEmail(email: string) {
  return z.string().email().safeParse(email.trim()).success;
}
