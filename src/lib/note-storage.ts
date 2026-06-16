import { getFirstLine, type NoteEntry } from "@/lib/note-data";

export interface SavedShelfNote {
  noteId: string;
  categorySlug: string;
  title: string;
  firstLine: string;
  savedAt: string;
}

export interface SavedReflection {
  id: string;
  noteId: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  text: string;
  savedAt: string;
}

interface GuestMeta {
  actionCount: number;
}

const STORAGE_KEYS = {
  kept: "tnynyt-kept-notes",
  sent: "tnynyt-sent-notes",
  reflections: "tnynyt-reflections",
  guestMeta: "tnynyt-guest-meta",
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

function buildShelfNote(note: NoteEntry): SavedShelfNote {
  return {
    noteId: note.id,
    categorySlug: note.categorySlug,
    title: note.title,
    firstLine: getFirstLine(note.mainText),
    savedAt: new Date().toISOString(),
  };
}

export function getKeptNotes() {
  return readJSON<SavedShelfNote[]>(STORAGE_KEYS.kept, []);
}

export function getSentNotes() {
  return readJSON<SavedShelfNote[]>(STORAGE_KEYS.sent, []);
}

export function getReflections() {
  return readJSON<SavedReflection[]>(STORAGE_KEYS.reflections, []);
}

export function keepNote(note: NoteEntry) {
  const current = getKeptNotes();
  const exists = current.some((entry) => entry.noteId === note.id);
  if (exists) return current;

  const next = [buildShelfNote(note), ...current];
  writeJSON(STORAGE_KEYS.kept, next);
  return next;
}

export function logSentNote(note: NoteEntry) {
  const current = getSentNotes();
  const next = [buildShelfNote(note), ...current.filter((entry) => entry.noteId !== note.id)];
  writeJSON(STORAGE_KEYS.sent, next);
  return next;
}

export function saveReflection(note: NoteEntry, text: string) {
  const current = getReflections();
  const entry: SavedReflection = {
    id: `${note.id}-${Date.now()}`,
    noteId: note.id,
    categorySlug: note.categorySlug,
    title: note.title,
    excerpt: getFirstLine(note.mainText),
    text,
    savedAt: new Date().toISOString(),
  };

  const next = [entry, ...current];
  writeJSON(STORAGE_KEYS.reflections, next);
  return entry;
}

export function getGuestActionCount() {
  return readJSON<GuestMeta>(STORAGE_KEYS.guestMeta, { actionCount: 0 }).actionCount;
}

export function incrementGuestActionCount() {
  const next = getGuestActionCount() + 1;
  writeJSON(STORAGE_KEYS.guestMeta, { actionCount: next });
  return next;
}

export function shouldShowAccountPrompt(actionCount = getGuestActionCount()) {
  return actionCount >= 3;
}

type PromptListener = (count: number) => void;
const promptListeners = new Set<PromptListener>();

export function onMeaningfulGuestAction(listener: PromptListener) {
  promptListeners.add(listener);
  return () => promptListeners.delete(listener);
}

/**
 * Record a meaningful guest action (Keep / Send / Save Reflection).
 * Notifies any listeners so a global account prompt can render immediately,
 * regardless of which page the action happened on.
 */
export function registerMeaningfulGuestAction() {
  const count = incrementGuestActionCount();
  promptListeners.forEach((listener) => listener(count));
  return count;
}
