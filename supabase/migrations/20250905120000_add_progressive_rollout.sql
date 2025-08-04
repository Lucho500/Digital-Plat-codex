-- Add percentage column to feature_flags for progressive rollout
alter table feature_flags
  add column if not exists percentage int default 0;

-- Initialize advisory rollout flags at 20%
insert into feature_flags(id, is_enabled, percentage)
values ('advisoryV1', true, 20),
       ('advisoryPaymentsV1', true, 20)
on conflict (id)
  do update set is_enabled = excluded.is_enabled,
                percentage = excluded.percentage,
                updated_at = now();

-- RPC to update flag rollout percentage
create or replace function rollout_flag(flag_id text, pct int)
returns feature_flags
language plpgsql
security definer
as $$
declare
  admin_id uuid := auth.uid();
  new_flag feature_flags;
begin
  update feature_flags
    set percentage = pct,
        updated_at = now(),
        updated_by = admin_id
    where id = flag_id
    returning * into new_flag;
  if not found then
    raise exception 'Feature flag % not found', flag_id;
  end if;
  return new_flag;
end;
$$;

-- Function to move to phase B or alert Slack if KPIs are bad
create or replace function adv_rollout_phaseB_job()
returns void
language plpgsql
as $$
declare
  kpi record;
  webhook text := current_setting('app.slack_webhook', true);
begin
  select * into kpi from v_advisory_kpi_daily;
  if kpi.nps_avg is not null and kpi.sla_hours is not null and kpi.revenue_eur is not null
     and kpi.nps_avg >= 70 and kpi.sla_hours <= 24 and kpi.revenue_eur >= 500 then
    perform rollout_flag('advisoryV1', 100);
    perform rollout_flag('advisoryPaymentsV1', 100);
  elsif webhook is not null then
    perform net.http_post(
      url := webhook,
      body := json_build_object(
        'text', format('Advisory KPIs below thresholds: nps_avg=%.2f, sla_hours=%.2f, revenue_eur=%.2f', kpi.nps_avg, kpi.sla_hours, kpi.revenue_eur)
      )::text
    );
  end if;
end;
$$;

-- Schedule phase B rollout check at 04:00 daily
select cron.schedule('adv_rollout_phaseB', '0 4 * * *', $$select adv_rollout_phaseB_job();$$);
