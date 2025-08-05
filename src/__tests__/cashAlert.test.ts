import { describe, it, expect } from 'vitest';
import { buildCashAlertJobs } from '../lib/cron/cashAlert';

describe('cash alert job builder', () => {
  it('builds alert email jobs from candidates', () => {
    const candidates = [
      { accountId: 'a1', month_breach: '2024-05-01', min_cash: 1000 }
    ];
    const jobs = buildCashAlertJobs(candidates);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].template).toBe('cash_alert');
    expect(jobs[0].payload.suggestions).toContain('factoring');
  });
});
