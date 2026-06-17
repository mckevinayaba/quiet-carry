// Analytics adapter.
//
// In development:  events are logged to console.info — no external calls.
// In production:   events are sent to Plausible if both env vars are set.
//                  If vars are missing or Plausible has not loaded yet, the
//                  call is silently dropped. The app never crashes over analytics.
//
// To enable Plausible, set in your deployment environment:
//   VITE_PLAUSIBLE_DOMAIN=thenoteyouneededtoday.com
//   VITE_ENABLE_PLAUSIBLE=true

// ---------------------------------------------------------------------------
// Global type for the Plausible snippet
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> },
    ) => void;
  }
}

// ---------------------------------------------------------------------------
// Event types — do not rename without updating all call sites
// ---------------------------------------------------------------------------

export type AnalyticsEventName =
  | "note_opened"
  | "category_selected"
  | "note_kept"
  | "note_sent"
  | "reflection_started"
  | "reflection_saved"
  | "collection_clicked"
  | "account_prompt_shown"
  | "waitlist_opened"
  | "waitlist_submitted"
  | "volume_waitlist_clicked"
  | "account_waitlist_clicked"
  | "feedback_opened"
  | "feedback_submitted";

// ---------------------------------------------------------------------------
// Payload sanitisation
//
// Only metadata keys that cannot contain private user content are forwarded.
// Any key not in this list is silently dropped before the payload leaves the
// browser. Never add: reflection text, feedback text, email, note body text,
// sendable message content, or anything a user writes privately.
// ---------------------------------------------------------------------------

const SAFE_PAYLOAD_KEYS = new Set([
  "noteId",
  "category",
  "categorySlug",
  "collectionId",
  "source",
  "context",
  "route",
  "actionCount",
  "from",
]);

function sanitizePayload(
  payload?: Record<string, unknown>,
): Record<string, string | number | boolean> | undefined {
  if (!payload) return undefined;
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!SAFE_PAYLOAD_KEYS.has(key)) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      safe[key] = value;
    }
  }
  return Object.keys(safe).length > 0 ? safe : undefined;
}

// ---------------------------------------------------------------------------
// Plausible feature flag — evaluated once at module load (build-time constant)
// ---------------------------------------------------------------------------

const PLAUSIBLE_ENABLED =
  import.meta.env.PROD &&
  import.meta.env.VITE_ENABLE_PLAUSIBLE === "true" &&
  Boolean(import.meta.env.VITE_PLAUSIBLE_DOMAIN);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (import.meta.env.DEV) {
    console.info("[analytics]", name, payload ?? {});
  }

  if (PLAUSIBLE_ENABLED) {
    try {
      const props = sanitizePayload(payload);
      window.plausible?.(name, props ? { props } : undefined);
    } catch {
      // never crash the app over analytics
    }
  }
}
