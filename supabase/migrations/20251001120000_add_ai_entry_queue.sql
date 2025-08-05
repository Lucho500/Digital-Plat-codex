create table if not exists ai_entry_queue (
  id uuid primary key default gen_random_uuid(),
  suggestion jsonb not null,
  confidence numeric not null,
  amount numeric not null,
  status text not null default 'queued' check (status in ('queued','auto_posted','needs_review','rejected')),
  posted_at timestamptz,
  reviewed_by uuid,
  reviewed_at timestamptz
);
