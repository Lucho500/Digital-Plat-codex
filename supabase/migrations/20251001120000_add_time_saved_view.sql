-- Tables for time tracking and AI activation
create table if not exists time_tracking_logs (
  id uuid primary key default gen_random_uuid(),
  accountId text not null,
  task text not null check (task in ('entry','reminder')),
  durationSec integer not null,
  createdAt timestamptz not null default now()
);

create table if not exists ai_activation (
  accountId text primary key,
  activatedAt timestamptz not null
);

-- Monthly time saved view
create or replace view v_time_saved_monthly as
select
  baseline.accountId,
  date_trunc('month', now()) as month,
  baseline.baseline_sec,
  current.current_sec,
  (baseline.baseline_sec - current.current_sec)        as saved_sec,
  round((baseline.baseline_sec - current.current_sec)::numeric
        / nullif(baseline.baseline_sec, 0) * 100, 1)   as saved_pct
from (
  select accountId,
         avg(month_sec) as baseline_sec
  from (
    select accountId,
           date_trunc('month', createdAt) as m,
           sum(durationSec)               as month_sec
    from   time_tracking_logs
    where  createdAt < (select activatedAt from ai_activation where accountId = time_tracking_logs.accountId)
    group  by accountId, m
  ) t
  group by accountId
) baseline
join (
  select accountId,
         sum(durationSec) as current_sec
  from   time_tracking_logs
  where  date_trunc('month', createdAt) = date_trunc('month', now())
  group  by accountId
) current using(accountId);
