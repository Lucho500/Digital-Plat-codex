CREATE OR REPLACE VIEW v_upsell_kpi_daily AS
SELECT
    current_date AS day,
    COUNT(DISTINCT account_id) FILTER (WHERE modules_added > 0)
        * 1.0 / COUNT(DISTINCT account_id)                     AS upsell_rate,
    SUM(mrr)::float / COUNT(DISTINCT account_id)               AS mrr_avg,
    SUM(reco_activated)::float / NULLIF(SUM(reco_served), 0)   AS activation_rate,
    SUM(churn_upsell)::float / NULLIF(COUNT(DISTINCT account_id), 0) AS churn_upsell
FROM metrics_daily
WHERE day = current_date;
