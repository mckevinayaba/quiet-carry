ALTER TABLE public.volume1_access
  ADD COLUMN IF NOT EXISTS buyer_email text,
  ADD COLUMN IF NOT EXISTS order_ref text;

CREATE UNIQUE INDEX IF NOT EXISTS volume1_access_order_ref_key
  ON public.volume1_access (order_ref)
  WHERE order_ref IS NOT NULL;