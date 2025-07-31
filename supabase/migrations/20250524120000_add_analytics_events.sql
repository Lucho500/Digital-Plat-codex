-- Analytics events table for onboarding tracking
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  step_id integer,
  event text,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own analytics" ON analytics_events
  FOR ALL USING (user_id = auth.uid());
