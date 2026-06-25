
-- ============================================================
-- daily_subscribers
-- ============================================================
CREATE TABLE public.daily_subscribers (
  id              UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT        NOT NULL UNIQUE,
  time_preference TEXT,
  active          BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.daily_subscribers TO anon, authenticated;
GRANT ALL ON public.daily_subscribers TO service_role;

ALTER TABLE public.daily_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to the daily letter"
  ON public.daily_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ============================================================
-- user_saved_notes
-- ============================================================
CREATE TABLE public.user_saved_notes (
  id        UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id   UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id   TEXT        NOT NULL,
  saved_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, note_id)
);

GRANT SELECT, INSERT, DELETE ON public.user_saved_notes TO authenticated;
GRANT ALL ON public.user_saved_notes TO service_role;

ALTER TABLE public.user_saved_notes ENABLE ROW LEVEL SECURITY;

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

-- ============================================================
-- user_reflections
-- ============================================================
CREATE TABLE public.user_reflections (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt      TEXT,
  response    TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.user_reflections TO authenticated;
GRANT ALL ON public.user_reflections TO service_role;

ALTER TABLE public.user_reflections ENABLE ROW LEVEL SECURITY;

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
