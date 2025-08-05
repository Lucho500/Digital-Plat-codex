create or replace view v_closing_kpi_month as
select
  c.account_id,
  c.period,
  date_trunc('day', min(c.created_at)) as start_at,
  date_trunc('day', (
    select signed_at
    from closing_signatures
    where account_id = c.account_id
      and period     = c.period
      and status     = 'completed'
    limit 1
  )) as end_at,
  extract('day' from (end_at - start_at)) as days_elapsed,
  round(100.0 * sum(case when ct.status = 'done' then 1 end)
        / nullif(count(*), 0), 1) as checklist_pct,
  sum(case when d.type is null then 0 else 1 end) as unresolved_gaps
from closing_tasks ct
join closing_tasks c using(account_id, period)
left join discrepancies d using(account_id, period)
group by c.account_id, c.period;
