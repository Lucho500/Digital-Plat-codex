-- Closing task templates and tasks tables
create type closing_task_freq as enum ('monthly','annual');
create type closing_task_status as enum ('todo','in_progress','done','blocked');

create table if not exists closing_task_templates (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  label text not null,
  section text not null,
  freq closing_task_freq not null,
  legal_ref text,
  default_due int not null
);

create table if not exists closing_tasks (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id),
  template_id uuid not null references closing_task_templates(id),
  period date not null,
  responsible_id uuid,
  due_date date not null,
  status closing_task_status default 'todo',
  attachment_url text,
  updated_at timestamptz default now()
);

alter table closing_task_templates enable row level security;
create policy "Allow read access to closing task templates" on closing_task_templates
  for select using (true);

alter table closing_tasks enable row level security;
create policy "Users manage own closing tasks" on closing_tasks
  for all using (account_id = auth.uid());
