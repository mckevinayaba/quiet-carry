export type AnalyticsEventName =
  | "note_opened"
  | "category_selected"
  | "note_kept"
  | "note_sent"
  | "reflection_started"
  | "reflection_saved"
  | "collection_clicked"
  | "account_prompt_shown";

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  console.info("[analytics]", name, payload ?? {});
}
