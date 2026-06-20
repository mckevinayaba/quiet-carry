-- Volume 1 access codes table.
-- Buyers receive a unique NOTE-XXXX-XXXX code via Selar delivery email.
-- The frontend calls the redeem_volume1_code() RPC to verify and claim a code.
-- Claimed codes are marked with redeemed_at. The table itself is not readable
-- by anon clients — all access is through the SECURITY DEFINER function below.

CREATE TABLE public.volume1_access (
  id          UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code        TEXT        NOT NULL UNIQUE,
  redeemed_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.volume1_access ENABLE ROW LEVEL SECURITY;

-- No public SELECT/INSERT/UPDATE/DELETE policies.
-- The table is only accessible via the RPC function below, which runs as
-- SECURITY DEFINER and therefore bypasses RLS.

GRANT ALL ON public.volume1_access TO service_role;

-- ---------------------------------------------------------------------------
-- RPC: redeem_volume1_code
-- Called by the /volume-1/unlock page.
-- Returns { ok: true } on success, { ok: false, reason: "not_found" | "already_used" }
-- on failure. Marks the code redeemed in the same call to prevent race conditions.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.redeem_volume1_code(input_code TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record public.volume1_access%ROWTYPE;
BEGIN
  SELECT * INTO v_record
  FROM public.volume1_access
  WHERE code = upper(trim(input_code));

  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'reason', 'not_found');
  END IF;

  IF v_record.redeemed_at IS NOT NULL THEN
    RETURN json_build_object('ok', false, 'reason', 'already_used');
  END IF;

  UPDATE public.volume1_access
  SET redeemed_at = now()
  WHERE id = v_record.id;

  RETURN json_build_object('ok', true);
END;
$$;

-- Allow anon and authenticated callers to invoke the RPC.
GRANT EXECUTE ON FUNCTION public.redeem_volume1_code(TEXT) TO anon, authenticated;
