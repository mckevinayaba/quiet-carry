// Lightweight local-only storage for waitlist signups and feedback.
// Designed to be swapped for a real backend (Supabase / Resend / Mailchimp)
// without changing the calling code: replace the bodies of saveWaitlistEntry
// and saveFeedbackEntry with a network call.

export type WaitlistSource = "volume" | "account";

export interface WaitlistEntry {
  email: string;
  source: WaitlistSource;
  savedAt: string;
}

export interface FeedbackEntry {
  text: string;
  savedAt: string;
}

const KEYS = {
  waitlist: "tnynyt-waitlist",
  feedback: "tnynyt-feedback",
} as const;

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function readJSON<T>(key: string, fallback: T): T {
  const storage = getStorage();
  if (!storage) return fallback;
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

export function saveWaitlistEntry(email: string, source: WaitlistSource) {
  const trimmed = email.trim();
  if (!trimmed) return null;
  const current = readJSON<WaitlistEntry[]>(KEYS.waitlist, []);
  const entry: WaitlistEntry = {
    email: trimmed,
    source,
    savedAt: new Date().toISOString(),
  };
  writeJSON(KEYS.waitlist, [entry, ...current.filter((e) => e.email !== trimmed || e.source !== source)]);
  // Future backend hook: POST to /api/public/waitlist here.
  return entry;
}

export function saveFeedbackEntry(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const current = readJSON<FeedbackEntry[]>(KEYS.feedback, []);
  const entry: FeedbackEntry = { text: trimmed, savedAt: new Date().toISOString() };
  writeJSON(KEYS.feedback, [entry, ...current]);
  // Future backend hook: POST to /api/public/feedback here.
  return entry;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
