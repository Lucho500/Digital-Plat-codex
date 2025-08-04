import { createClient } from '@supabase/supabase-js';
import { buildEmailJobs } from '../../src/lib/cron/enqueueEmailJobs.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, serviceKey);

Deno.serve(async () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { data } = await supabase
    .from('accounts')
    .select('id, created_at, trial_status, trial_end')
    .eq('status', 'active')
    .gte('created_at', sevenDaysAgo.toISOString());
  const accounts = (data || []).map((d: any) => ({
    id: d.id,
    createdAt: d.created_at,
    trialStatus: d.trial_status,
    trialEnd: d.trial_end
  }));
  const jobs = buildEmailJobs(accounts, today);
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
