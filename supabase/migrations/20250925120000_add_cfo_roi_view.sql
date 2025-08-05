CREATE OR REPLACE VIEW v_cfo_roi_monthly AS
SELECT
    account_id,
    date_trunc('month', now()) AS month,
    SUM(interests) + SUM(costs_avoided) AS roi_eur
FROM roi_events
WHERE created_at >= date_trunc('month', now())
GROUP BY account_id;
