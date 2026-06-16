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

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  console.info("[analytics]", name, payload ?? {});
}
