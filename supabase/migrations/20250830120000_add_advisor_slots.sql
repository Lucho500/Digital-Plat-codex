-- Table for advisor available slots
CREATE TABLE IF NOT EXISTS advisor_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advisor_id uuid REFERENCES experts(id) NOT NULL,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  is_booked boolean NOT NULL DEFAULT false
);

ALTER TABLE advisor_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Advisor slots are public" ON advisor_slots
  FOR SELECT USING (true);
