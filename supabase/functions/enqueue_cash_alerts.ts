import { createClient } from '@supabase/supabase-js';
import { buildCashAlertJobs } from '../../src/lib/cron/cashAlert.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, serviceKey);

Deno.serve(async () => {
  const { data } = await supabase
    .from('v_cash_alert_candidates')
    .select('accountId, month_breach, min_cash');
  const candidates = data || [];
  const jobs = buildCashAlertJobs(candidates as any);
  for (const job of jobs) {
    await supabase.from('email_jobs').insert({
      account_id: job.accountId,
      template: job.template,
      payload: job.payload
    });
  }
  return new Response(
    JSON.stringify({ inserted: jobs.length }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
