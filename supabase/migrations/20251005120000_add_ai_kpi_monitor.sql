-- AI KPI monitoring and rollback

-- Ensure feature flag for autoPostIA exists
insert into feature_flags(id, is_enabled)
values ('autoPostIA', true)
on conflict (id) do nothing;

-- View for 6h AI KPIs
CREATE OR REPLACE VIEW v_ai_kpi_6h AS
SELECT
  now()                                             AS ts,
  SUM(CASE WHEN status='accepted' THEN 1 END)
    *1.0 / NULLIF(COUNT(*),0)                      AS precision,
  SUM(CASE WHEN status='modified' THEN 1 END)
    *1.0 / NULLIF(COUNT(*),0)                      AS rework_rate,
  (SELECT AVG(days_late)
     FROM  invoices
     WHERE status='paid'
       AND paidAt > now()-interval '6 hours')      AS dso
FROM ai_entry_queue
WHERE postedAt > now()-interval '6 hours';

-- Function to monitor KPIs and rollback features
create or replace function ai_kpi_monitor_job()
returns void
language plpgsql
as $$
declare
  kpi record;
  webhook text := current_setting('app.slack_webhook', true);
begin
  select * into kpi from v_ai_kpi_6h;

  if kpi.precision is not null and kpi.precision < 0.82 then
    update feature_flags
      set is_enabled = false,
          updated_at = now()
      where id = 'autoPostIA';
  end if;

  if kpi.rework_rate is not null and kpi.rework_rate > 0.07 then
    update feature_flags
      set is_enabled = false,
          updated_at = now()
      where id = 'autoPostIA';
    if webhook is not null then
      perform net.http_post(
        url := webhook,
        body := json_build_object('text', 'Rework spike')::text
      );
    end if;
  end if;

  if kpi.dso is null or kpi.dso > 1 then
    perform cron.unschedule('sendInvoiceReminders');
  end if;
end;
$$;

-- Schedule monitor every 5 minutes
select cron.schedule('ai_kpi_monitor', '*/5 * * * *', $$select ai_kpi_monitor_job();$$);
