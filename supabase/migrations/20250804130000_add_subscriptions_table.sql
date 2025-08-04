create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  accountId text not null,
  moduleId text not null,
  status text not null check (status in ('trial','active','cancelled')),
  trialStart timestamptz,
  trialEnd timestamptz,
  billingStart timestamptz
);

create unique index if not exists subscriptions_account_module_idx
  on subscriptions(accountId, moduleId)
  where status in ('trial','active');

select cron.schedule('trial_auto_convert', '0 0 * * *', $$
  UPDATE subscriptions
  SET    status = 'active',
         billingStart = now()
  WHERE  status   = 'trial'
    AND  trialEnd < now();
$$);
