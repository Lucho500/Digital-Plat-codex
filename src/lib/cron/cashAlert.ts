import { supabase } from '../supabase';

export interface CashAlertCandidate {
  accountId: string;
  month_breach: string;
  min_cash: number;
}

export interface EmailJob {
  accountId: string;
  template: string;
  payload: Record<string, any>;
}

export function buildCashAlertJobs(candidates: CashAlertCandidate[]): EmailJob[] {
  return candidates.map((c) => ({
    accountId: c.accountId,
    template: 'cash_alert',
    payload: {
      month: c.month_breach,
      minCash: c.min_cash,
      suggestions: ['factoring', 'prêt court terme', 'relance clients']
    }
  }));
}

export async function enqueueCashAlerts() {
  const { data } = await supabase
    .from<CashAlertCandidate>('v_cash_alert_candidates' as any)
    .select('accountId, month_breach, min_cash');
  const candidates = data || [];
  const jobs = buildCashAlertJobs(candidates);
  for (const job of jobs) {
    await supabase.from('email_jobs').insert({
      account_id: job.accountId,
      template: job.template,
      payload: job.payload
    });
  }
  return jobs.length;
}
