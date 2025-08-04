-- RPC to aggregate QR onboarding KPIs
create or replace function get_qr_kpi()
returns table (
  ttfv_ms numeric,
  ttfv_sparkline numeric[],
  drop_off numeric,
  adoption_qr integer,
  adoption_classic integer,
  parsing_success numeric
)
language sql
stable
as $$
with ttfv as (
  select
    coalesce(avg(duration_ms),0) as avg_ms,
    coalesce(array_agg(duration_ms order by timestamp)
             filter (where timestamp > now() - interval '24 hour'),
             array[]::numeric[]) as sparkline
  from analytics_events
  where event = 'qrUploadCompleted'
), counts as (
  select
    count(*) filter (where event = 'qrUploadStarted') as started,
    count(*) filter (where event = 'onboardingCompleted') as completed,
    count(*) filter (where event = 'onboardingQR') as adoption_qr,
    count(*) filter (where event = 'onboardingClassic') as adoption_classic,
    count(*) filter (where event = 'ocrParseSucceeded') as parse_ok,
    count(*) filter (where event in ('ocrParseSucceeded','ocrParseFailed')) as parse_total
  from analytics_events
)
select
  ttfv.avg_ms as ttfv_ms,
  ttfv.sparkline as ttfv_sparkline,
  case when counts.started = 0 then 0
       else 1 - counts.completed::numeric / counts.started end as drop_off,
  counts.adoption_qr,
  counts.adoption_classic,
  case when counts.parse_total = 0 then 0
       else counts.parse_ok::numeric / counts.parse_total end as parsing_success
from ttfv, counts;
$$;
