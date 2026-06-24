-- Quiet Daily Delivery — subscriber table.
-- Insert-only for anon/authenticated via the subscribe-daily-letter edge
-- function. No public read, update, or delete. The send-daily-note edge
-- function reads this table using the service role key, bypassing RLS.

CREATE TABLE public.daily_subscribers (
  id              UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT        NOT NULL UNIQUE,
  time_preference TEXT,
  active          BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.daily_subscribers ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.daily_subscribers TO service_role;

CREATE POLICY "Anyone can subscribe to the daily letter"
  ON public.daily_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies — reads are admin-only via the dashboard
-- or the service role used inside the send-daily-note edge function.
