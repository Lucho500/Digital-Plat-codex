create or replace view v_trial_balance_month as
select
  accountId,
  date_trunc('month', date) as period,
  glAccount,
  sum(amount) as balance
from journal_entries
group by accountId, period, glAccount;
