-- Add wished_sentence column to feedback table.
-- Stores the optional response to "What is a sentence you wish someone had written for you?"
-- Nullable because existing rows and users who skip the field should not be affected.

ALTER TABLE public.feedback
  ADD COLUMN IF NOT EXISTS wished_sentence TEXT
    CHECK (wished_sentence IS NULL OR char_length(wished_sentence) BETWEEN 1 AND 400);
