CREATE OR REPLACE VIEW v_advisory_kpi_daily AS
SELECT
    current_date                                                  AS day,
    COUNT(*) FILTER (WHERE status='confirmed')                    AS sessions_planned,
    COUNT(*) FILTER (WHERE status='completed')                    AS sessions_done,
    SUM(price_cents)/100.0                                        AS revenue_eur,
    AVG(nps_score)                                                AS nps_avg,
    AVG(EXTRACT(EPOCH FROM (start_at - created_at))/3600)         AS sla_hours
FROM advisory_sessions
WHERE created_at::date = current_date;
