
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('volume','account','landing')),
  context TEXT,
  user_agent TEXT,
  page_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX waitlist_email_source_idx ON public.waitlist (lower(email), source);

GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT ALL ON public.waitlist TO service_role;

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can join the waitlist"
  ON public.waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  source TEXT NOT NULL DEFAULT 'app',
  user_agent TEXT,
  page_path TEXT,
  event_context JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.feedback TO anon, authenticated;
GRANT ALL ON public.feedback TO service_role;

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can leave feedback"
  ON public.feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (char_length(message) BETWEEN 1 AND 4000);
