-- Harden RLS policies for waitlist and feedback tables.
--
-- Context:
--   RLS is already enabled on both tables (see previous migration).
--   When RLS is enabled, any operation without a matching POLICY is denied
--   by default. These explicit DENY policies make that intent auditable,
--   visible in the Supabase dashboard, and resistant to accidental future
--   GRANT statements opening up reads.
--
--   Admin reads are handled exclusively through the Supabase dashboard
--   using the service_role key, which bypasses RLS. No SELECT/UPDATE/DELETE
--   access is needed from the public-facing client application.

-- ---------------------------------------------------------------------------
-- waitlist: explicit deny for SELECT, UPDATE, DELETE
-- ---------------------------------------------------------------------------

CREATE POLICY "deny public select on waitlist"
  ON public.waitlist FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny public update on waitlist"
  ON public.waitlist FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny public delete on waitlist"
  ON public.waitlist FOR DELETE
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- feedback: explicit deny for SELECT, UPDATE, DELETE
-- ---------------------------------------------------------------------------

CREATE POLICY "deny public select on feedback"
  ON public.feedback FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny public update on feedback"
  ON public.feedback FOR UPDATE
  TO anon, authenticated
  USING (false);

CREATE POLICY "deny public delete on feedback"
  ON public.feedback FOR DELETE
  TO anon, authenticated
  USING (false);

-- ---------------------------------------------------------------------------
-- Tighten feedback message length constraint to match client-side 1000-char
-- limit. Uses NOT VALID to avoid a full table scan on existing rows.
-- Run `ALTER TABLE public.feedback VALIDATE CONSTRAINT feedback_message_max_1000`
-- once from the Supabase SQL editor to backfill the constraint on old rows.
-- ---------------------------------------------------------------------------

ALTER TABLE public.feedback
  ADD CONSTRAINT feedback_message_max_1000
  CHECK (char_length(message) <= 1000) NOT VALID;
