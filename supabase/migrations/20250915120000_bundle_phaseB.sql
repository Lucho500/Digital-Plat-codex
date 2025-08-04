-- Progressive rollout for advisory bundle
alter table feature_flags
  add column if not exists percentage int default 0;

-- Initialize advisory bundle rollout flag at 20%
insert into feature_flags (id, is_enabled, percentage)
values ('advisoryBundleV1', true, 20)
on conflict (id) do update
  set is_enabled = excluded.is_enabled,
      percentage = excluded.percentage,
      updated_at = now();

-- RPC to update bundle rollout percentage
create or replace function rollout_bundle(pct int)
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
    where id = 'advisoryBundleV1'
    returning * into new_flag;
  if not found then
    raise exception 'Feature flag advisoryBundleV1 not found';
  end if;
  return new_flag;
end;
$$;

-- Function to move bundle rollout to phase B
create or replace function bundle_phaseB_job()
returns void
language plpgsql
as $$
declare
  metrics record;
begin
  select conv, revDelta, nps into metrics
  from v_bundle_results
  limit 1;

  if metrics.conv is not null and metrics.revDelta is not null and metrics.nps is not null
     and metrics.conv >= 0.05 and metrics.revDelta >= 0.10 and metrics.nps >= 70 then
    perform rollout_bundle(100);
  end if;
end;
$$;

-- Schedule phase B bundle check at 04:00 seven days from now
select cron.schedule(
  'bundle_phaseB',
  date_trunc('day', now()) + interval '7 days' + interval '4 hours',
  $$select bundle_phaseB_job();$$
);
