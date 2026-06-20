
CREATE TABLE IF NOT EXISTS public.volume1_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  redeemed_at timestamptz,
  redeemed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.volume1_access TO service_role;

ALTER TABLE public.volume1_access ENABLE ROW LEVEL SECURITY;

-- No direct client access; redemption happens through the SECURITY DEFINER function below.

CREATE OR REPLACE FUNCTION public.redeem_volume1_code(input_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_row public.volume1_access%ROWTYPE;
BEGIN
  SELECT * INTO v_row FROM public.volume1_access WHERE code = input_code FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'not_found');
  END IF;

  IF v_row.redeemed_at IS NOT NULL THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'already_redeemed');
  END IF;

  UPDATE public.volume1_access
  SET redeemed_at = now(), redeemed_by = auth.uid()
  WHERE id = v_row.id;

  RETURN jsonb_build_object('ok', true);
END;
$$;

REVOKE ALL ON FUNCTION public.redeem_volume1_code(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.redeem_volume1_code(text) TO anon, authenticated;
