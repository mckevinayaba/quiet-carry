-- Private Account System — Shelf and Reflect cloud sync.
-- Auth is Supabase Auth magic link (passwordless). No social login, no
-- public profile fields anywhere in this schema.

-- ---------------------------------------------------------------------------
-- user_saved_notes — synced version of the guest "kept notes" Shelf list.
-- Stores only the note_id; note content is resolved client-side from the
-- static note library, same as the guest localStorage version does.
-- ---------------------------------------------------------------------------

CREATE TABLE public.user_saved_notes (
  id        UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id   UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id   TEXT        NOT NULL,
  saved_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, note_id)
);

ALTER TABLE public.user_saved_notes ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.user_saved_notes TO service_role;

CREATE POLICY "Users can view their own saved notes"
  ON public.user_saved_notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save their own notes"
  ON public.user_saved_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own saved notes"
  ON public.user_saved_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- user_reflections — synced version of the /reflect private diary.
-- "prompt" holds the entry's optional title (kept on the brief's requested
-- column name); "response" holds the entry body.
-- ---------------------------------------------------------------------------

CREATE TABLE public.user_reflections (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt      TEXT,
  response    TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_reflections ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.user_reflections TO service_role;

CREATE POLICY "Users can view their own reflections"
  ON public.user_reflections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can write their own reflections"
  ON public.user_reflections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reflections"
  ON public.user_reflections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
