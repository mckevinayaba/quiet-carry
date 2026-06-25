// Shared Volume 1 purchase fulfillment logic.
// Used by both selar-webhook (push) and selar-poll (pull) so the two entry
// points never drift: same code format, same idempotency check, same email.

import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Unambiguous alphabet — no 0/O or 1/I so a typed-out code is never confusing.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCode(): string {
  const part = (len: number) =>
    Array.from(
      { length: len },
      () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)],
    ).join("");
  return `NOTE-${part(4)}-${part(4)}`;
}

// Walks a handful of common shapes (Selar-native, Zapier-mapped, Gumroad-style,
// generic) looking for the buyer's email. Returns the first match.
export function extractEmail(payload: Record<string, unknown>): string | null {
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

// Best-effort order reference for idempotency. Returns null if none found.
export function extractOrderRef(payload: Record<string, unknown>): string | null {
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

// Best-effort completion status check. Defaults to true (process it) when no
// status field is present at all, since some payloads only fire on success.
export function isCompletedOrder(payload: Record<string, unknown>): boolean {
  const candidates = [
    payload.status,
    payload.payment_status,
    (payload.data as Record<string, unknown> | undefined)?.status,
    (payload.data as Record<string, unknown> | undefined)?.payment_status,
  ];
  const found = candidates.find((c) => typeof c === "string");
  if (typeof found !== "string") return true;
  const normalized = found.toLowerCase();
  return ["completed", "success", "successful", "paid", "complete"].includes(normalized);
}

export type FulfillResult =
  | { ok: true; duplicate: true }
  | { ok: true; duplicate: false; code: string; emailed: boolean }
  | { ok: false; error: string };

// Generates a code, writes it, and emails it. Skips silently if this
// order_ref already has a code (handles retried webhooks / repeated polls).
export async function fulfillOrder(
  supabase: SupabaseClient,
  email: string,
  orderRef: string | null,
  resendApiKey: string | undefined,
): Promise<FulfillResult> {
  if (orderRef) {
    const { data: existing } = await supabase
      .from("volume1_access")
      .select("code")
      .eq("order_ref", orderRef)
      .maybeSingle();

    if (existing) {
      return { ok: true, duplicate: true };
    }
  }

  const code = generateCode();
  const { error: insertError } = await supabase.from("volume1_access").insert({
    code,
    buyer_email: email,
    order_ref: orderRef,
  });

  if (insertError) {
    // Unique violation on order_ref — another concurrent call already
    // fulfilled this order. Treat as a duplicate, not a failure.
    if (insertError.code === "23505") {
      return { ok: true, duplicate: true };
    }
    console.error("[volume1-fulfillment] insert failed", insertError);
    return { ok: false, error: "insert_failed" };
  }

  if (!resendApiKey) {
    console.error("[volume1-fulfillment] RESEND_API_KEY not set — code created but not emailed:", code);
    return { ok: true, duplicate: false, code, emailed: false };
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
      "[volume1-fulfillment] resend failed — code created but not emailed:",
      code,
      await emailRes.text(),
    );
    return { ok: true, duplicate: false, code, emailed: false };
  }

  return { ok: true, duplicate: false, code, emailed: true };
}
