-- Add parsed data fields to ocr_sessions
ALTER TABLE ocr_sessions
  ADD COLUMN IF NOT EXISTS parsed_data jsonb,
  ADD COLUMN IF NOT EXISTS parsed_at timestamptz;
