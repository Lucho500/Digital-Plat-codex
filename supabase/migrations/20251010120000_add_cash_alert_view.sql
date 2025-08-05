-- View to detect cash alert candidates and schedule alert job
create or replace view v_cash_alert_candidates as
select accountId,
       min(month)   as month_breach,
       min(balance) as min_cash
from cash_forecast
where balance < (monthlyBurn * 2)
group by accountId;

-- Schedule daily cash alert check at 08:00
select cron.schedule('daily_cash_alerts', '0 8 * * *', $$select enqueue_cash_alerts();$$);
