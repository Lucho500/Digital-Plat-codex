import { describe, it, expect } from 'vitest';
import { buildEmailJobs } from '../lib/cron/enqueueEmailJobs';

const today = new Date('2024-01-08T09:00:00.000Z');
const accounts = [
  {
    id: 'a1',
    createdAt: '2024-01-07T09:00:00.000Z'
  },
  {
    id: 'a2',
    createdAt: '2024-01-01T09:00:00.000Z',
    trialStatus: 'trial',
    trialEnd: '2024-01-09T09:00:00.000Z'
  },
  {
    id: 'a3',
    createdAt: '2024-01-01T09:00:00.000Z',
    trialStatus: 'none'
  }
];

describe('email job builder', () => {
  it('selects templates according to context', () => {
    const jobs = buildEmailJobs(accounts as any, today);
    expect(jobs).toHaveLength(3);
    expect(jobs.find((j) => j.accountId === 'a1')?.template).toBe('day1_recap');
    expect(jobs.find((j) => j.accountId === 'a2')?.template).toBe(
      'day7_trial_end'
    );
    expect(jobs.find((j) => j.accountId === 'a3')?.template).toBe(
      'day7_new_suggestions'
    );
  });
});
