-- Track who a generated code was emailed to, and the order it came from
-- (so a retried/duplicate Selar webhook call does not generate a second
-- code for the same purchase).

ALTER TABLE public.volume1_access
  ADD COLUMN IF NOT EXISTS buyer_email text,
  ADD COLUMN IF NOT EXISTS order_ref text;

CREATE UNIQUE INDEX IF NOT EXISTS volume1_access_order_ref_key
  ON public.volume1_access (order_ref)
  WHERE order_ref IS NOT NULL;
