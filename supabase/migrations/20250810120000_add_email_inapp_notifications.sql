-- Email jobs queue
create table if not exists email_jobs (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id),
  template text not null,
  payload jsonb,
  created_at timestamptz default now()
);

-- In-app notifications table
create table if not exists inapp_notifications (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id),
  type text not null,
  payload jsonb,
  seen_at timestamptz
);

alter table email_jobs enable row level security;
alter table inapp_notifications enable row level security;

create policy "Users select own email jobs" on email_jobs
  for select using (account_id = auth.uid());

create policy "Users manage own notifications" on inapp_notifications
  for all using (account_id = auth.uid());

-- Cron job to enqueue emails at 09:00 CET daily
select cron.schedule('daily_email_job', '0 9 * * *', $$select enqueue_email_jobs();$$);
