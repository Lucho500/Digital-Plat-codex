-- Add capacity tracking columns to experts
ALTER TABLE experts
  ADD COLUMN IF NOT EXISTS max_load integer NOT NULL DEFAULT 200,
  ADD COLUMN IF NOT EXISTS current_load integer NOT NULL DEFAULT 0;

-- Add expert reference to accounts
ALTER TABLE accounts
  ADD COLUMN IF NOT EXISTS expert_id uuid REFERENCES experts(id);

-- View exposing experts with available capacity
CREATE OR REPLACE VIEW v_available_experts AS
SELECT id, sectors, current_load
FROM experts
WHERE current_load < max_load;

-- Function to automatically assign an expert to new accounts
CREATE OR REPLACE FUNCTION assign_expert_to_account()
RETURNS trigger AS $$
DECLARE
  v_expert_id uuid;
BEGIN
  SELECT id INTO v_expert_id
  FROM v_available_experts
  WHERE sectors @> ARRAY[NEW.sector]
  ORDER BY current_load
  LIMIT 1;

  IF v_expert_id IS NOT NULL THEN
    NEW.expert_id := v_expert_id;
    UPDATE experts SET current_load = current_load + 1 WHERE id = v_expert_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run the assignment on account creation
DROP TRIGGER IF EXISTS trg_assign_expert ON accounts;
CREATE TRIGGER trg_assign_expert
BEFORE INSERT ON accounts
FOR EACH ROW EXECUTE FUNCTION assign_expert_to_account();
