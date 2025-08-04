-- Create table to track discount model versions and rollout
create table if not exists model_versions (
  id bigint generated always as identity primary key,
  path text not null,
  auc float not null,
  rev_sim float not null,
  is_prod boolean default false,
  traffic_pct int default 0,
  created_at timestamptz default now()
);

-- Approve the latest trained model if metrics meet thresholds
create or replace function approve_new_model()
returns void
language plpgsql
as $$
declare
  prod_auc float;
  new_auc float;
  rev_delta float;
  new_id bigint;
begin
  select auc into prod_auc
  from model_versions
  where is_prod = true
  order by created_at desc
  limit 1;

  select id, auc, rev_sim into new_id, new_auc, rev_delta
  from model_versions
  where is_prod = false
  order by created_at desc
  limit 1;

  if new_id is null then
    return;
  end if;

  if new_auc >= prod_auc - 0.01 and rev_delta >= 0.02 then
    update model_versions set is_prod = false, traffic_pct = 0 where is_prod = true;
    update model_versions set is_prod = true, traffic_pct = 10 where id = new_id;
  end if;
end;
$$;

-- Rollout checker: after 48h move to 100% or rollback
create or replace function finalize_model_rollout()
returns void
language plpgsql
as $$
declare
  current_prod model_versions;
  previous_prod model_versions;
begin
  select * into current_prod
  from model_versions
  where is_prod = true
  order by created_at desc
  limit 1;

  if current_prod.traffic_pct = 10 and current_prod.created_at <= now() - interval '48 hours' then
    -- simplistic KPI check using rev_sim
    if current_prod.rev_sim >= 0.02 then
      update model_versions set traffic_pct = 100 where id = current_prod.id;
    else
      select * into previous_prod
      from model_versions
      where id <> current_prod.id and traffic_pct = 100
      order by created_at desc
      limit 1;
      if previous_prod.id is not null then
        update model_versions set is_prod = true, traffic_pct = 100 where id = previous_prod.id;
      end if;
      update model_versions set is_prod = false, traffic_pct = 0 where id = current_prod.id;
    end if;
  end if;
end;
$$;

-- Schedule rollout check hourly
select cron.schedule('discount_model_rollout', '0 * * * *', $$select finalize_model_rollout();$$);
