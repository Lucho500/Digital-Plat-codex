-- Relance profiles table for invoice follow-up tone adaptation
create type relance_tone as enum ('courtois', 'ferme', 'humoristique');

create table if not exists relance_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tone relance_tone not null,
  min_days_late int not null,
  max_days_late int not null,
  payment_score_min int not null
);

alter table relance_profiles enable row level security;

create policy "Allow read access to relance profiles" on relance_profiles
  for select using (true);
