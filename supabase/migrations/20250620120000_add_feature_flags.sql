-- Feature flags and logging tables
create table if not exists feature_flags (
  id text primary key,
  is_enabled boolean default false,
  updated_at timestamptz default now(),
  updated_by uuid
);

create table if not exists feature_flag_logs (
  id bigserial primary key,
  flag_id text references feature_flags(id),
  old_value boolean,
  new_value boolean,
  user_id uuid,
  created_at timestamptz default now()
);

create or replace function toggle_feature(flag_id text)
returns feature_flags
language plpgsql
security definer
as $$
declare
  old_val boolean;
  new_flag feature_flags;
  admin_id uuid := auth.uid();
  change_count int;
begin
  if admin_id is null then
    raise exception 'not authenticated';
  end if;

  select is_enabled into old_val from feature_flags where id = flag_id for update;
  if not found then
    raise exception 'Feature flag % not found', flag_id;
  end if;

  select count(*) into change_count
  from feature_flag_logs
  where user_id = admin_id and created_at > now() - interval '1 hour';
  if change_count >= 10 then
    raise exception 'Rate limit exceeded';
  end if;

  update feature_flags
    set is_enabled = not old_val,
        updated_at = now(),
        updated_by = admin_id
    where id = flag_id
    returning * into new_flag;

  insert into feature_flag_logs(flag_id, old_value, new_value, user_id)
  values (flag_id, old_val, new_flag.is_enabled, admin_id);

  return new_flag;
end;
$$;
