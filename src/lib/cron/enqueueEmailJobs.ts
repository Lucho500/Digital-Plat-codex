import { supabase } from '../supabase';

export interface Account {
  id: string;
  createdAt: string;
  trialStatus?: string | null;
  trialEnd?: string | null;
}

export interface EmailJob {
  accountId: string;
  template: string;
  payload: Record<string, any>;
}

function isTomorrow(dateStr: string | null | undefined, today: Date) {
  if (!dateStr) return false;
  const diff = new Date(dateStr).getTime() - today.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
}

export function buildEmailJobs(accounts: Account[], today: Date): EmailJob[] {
  const jobs: EmailJob[] = [];
  for (const acc of accounts) {
    const created = new Date(acc.createdAt);
    const days = Math.floor(
      (today.getTime() - created.getTime()) / (24 * 60 * 60 * 1000)
    );
    if (days === 1) {
      jobs.push({
        accountId: acc.id,
        template: 'day1_recap',
        payload: { utm: 'upsell_day1' }
      });
    } else if (days === 7) {
      if (acc.trialStatus === 'trial' && isTomorrow(acc.trialEnd, today)) {
        jobs.push({
          accountId: acc.id,
          template: 'day7_trial_end',
          payload: { utm: 'upsell_day7' }
        });
      } else {
        jobs.push({
          accountId: acc.id,
          template: 'day7_new_suggestions',
          payload: { utm: 'upsell_day7' }
        });
      }
    }
  }
  return jobs;
}

export async function enqueueEmailJobs(today = new Date()) {
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const { data } = await supabase
    .from('accounts')
    .select('id, created_at, trial_status, trial_end')
    .eq('status', 'active')
    .gte('created_at', sevenDaysAgo.toISOString());
  const accounts: Account[] = (data || []).map((d: any) => ({
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
  return jobs.length;
}
