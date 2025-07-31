-- Table for onboarding expert matching
CREATE TABLE IF NOT EXISTS experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sectors text[] NOT NULL,
  rating numeric NOT NULL DEFAULT 0
);

ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Experts are public" ON experts
  FOR SELECT USING (true);
