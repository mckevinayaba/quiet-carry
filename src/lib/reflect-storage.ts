// Private reflection space — localStorage only, by design, for this sprint.
// When account sync ships, these entries migrate to Supabase under the user's account.

export interface ReflectEntry {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

const STORAGE_KEY = "reflect_entries";

function getStorage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function getReflectEntries(): ReflectEntry[] {
  const storage = getStorage();
  if (!storage) return [];
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as ReflectEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReflectEntry(title: string, body: string): ReflectEntry {
  const entry: ReflectEntry = {
    id: crypto.randomUUID(),
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };
  const entries = getReflectEntries();
  entries.unshift(entry);
  getStorage()?.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entry;
}

export function deleteReflectEntry(id: string) {
  const entries = getReflectEntries().filter((entry) => entry.id !== id);
  getStorage()?.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function getReflectEntry(id: string): ReflectEntry | undefined {
  return getReflectEntries().find((entry) => entry.id === id);
}
