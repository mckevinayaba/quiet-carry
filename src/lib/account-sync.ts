// Cloud sync for Shelf (saved notes) and Reflect (private reflections),
// active only when a user is signed in. Guests keep using localStorage —
// see note-storage.ts and reflect-storage.ts.

import { supabase as typedSupabase } from "@/integrations/supabase/client";
import { getKeptNotes } from "@/lib/note-storage";
import { getReflectEntries } from "@/lib/reflect-storage";

// user_saved_notes and user_reflections live in the DB (see
// 20260625120000_private_accounts.sql) but the generated types snapshot in
// src/integrations/supabase/types.ts hasn't been refreshed yet. Cast through
// `any` for these two tables only — schema is enforced by Postgres + RLS.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const supabase = typedSupabase as any;

const MIGRATION_FLAG_PREFIX = "tnynyt-migrated-";

// ---------------------------------------------------------------------------
// Saved notes
// ---------------------------------------------------------------------------

export async function getSavedNoteIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("user_saved_notes")
    .select("note_id")
    .eq("user_id", userId)
    .order("saved_at", { ascending: false });

  if (error) {
    if (import.meta.env.DEV) console.error("[account-sync] getSavedNoteIds failed", error);
    return [];
  }
  return (data ?? []).map((row: { note_id: string }) => row.note_id);
}

export async function saveNoteForUser(userId: string, noteId: string) {
  const { error } = await supabase
    .from("user_saved_notes")
    .insert({ user_id: userId, note_id: noteId });

  // 23505 = already saved — treat as success.
  if (error && error.code !== "23505") {
    if (import.meta.env.DEV) console.error("[account-sync] saveNoteForUser failed", error);
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Reflections
// ---------------------------------------------------------------------------

export interface CloudReflection {
  id: string;
  prompt: string | null;
  response: string;
  createdAt: string;
}

export async function getUserReflections(userId: string): Promise<CloudReflection[]> {
  const { data, error } = await supabase
    .from("user_reflections")
    .select("id, prompt, response, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    if (import.meta.env.DEV) console.error("[account-sync] getUserReflections failed", error);
    return [];
  }
  return (data ?? []).map((row: { id: string; prompt: string | null; response: string; created_at: string }) => ({
    id: row.id,
    prompt: row.prompt,
    response: row.response,
    createdAt: row.created_at,
  }));
}

export async function saveUserReflection(userId: string, prompt: string, response: string) {
  const { error } = await supabase
    .from("user_reflections")
    .insert({ user_id: userId, prompt: prompt || null, response });

  if (error) {
    if (import.meta.env.DEV) console.error("[account-sync] saveUserReflection failed", error);
    return false;
  }
  return true;
}

export async function deleteUserReflection(userId: string, id: string) {
  const { error } = await supabase
    .from("user_reflections")
    .delete()
    .eq("user_id", userId)
    .eq("id", id);

  if (error) {
    if (import.meta.env.DEV) console.error("[account-sync] deleteUserReflection failed", error);
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Guest -> account migration. Runs once per user, guarded by a localStorage
// flag so re-logging-in on the same device never double-inserts.
// ---------------------------------------------------------------------------

export async function migrateGuestDataToAccount(userId: string) {
  const flagKey = `${MIGRATION_FLAG_PREFIX}${userId}`;
  if (typeof window === "undefined" || localStorage.getItem(flagKey) === "true") return;

  const keptNotes = getKeptNotes();
  for (const note of keptNotes) {
    await saveNoteForUser(userId, note.noteId);
  }

  const reflections = getReflectEntries();
  for (const entry of reflections) {
    await saveUserReflection(userId, entry.title, entry.body);
  }

  localStorage.setItem(flagKey, "true");
}
