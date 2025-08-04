import { describe, it, expect, vi } from 'vitest';
import { convertExpiredTrials } from '../lib/cron/trialAutoConvert';

const records: any[] = [
  {
    accountId: 'a1',
    moduleId: 'm1',
    status: 'trial',
    trialEnd: '2020-01-01T00:00:00.000Z'
  },
  {
    accountId: 'a2',
    moduleId: 'm2',
    status: 'trial',
    trialEnd: '2999-01-01T00:00:00.000Z'
  }
];

vi.mock('../lib/supabase', () => {
  const from = () => ({
    update: (values: any) => {
      const filters: any = {};
      const api: any = {
        lt(field: string, value: string) {
          filters[field] = { op: 'lt', value };
          return api;
        },
        eq(field: string, value: string) {
          filters[field] = { op: 'eq', value };
          return api;
        },
        async then(resolve: any) {
          for (const rec of records) {
            const endCond =
              filters.trialEnd &&
              filters.trialEnd.op === 'lt' &&
              new Date(rec.trialEnd) < new Date(filters.trialEnd.value);
            const statusCond =
              filters.status &&
              filters.status.op === 'eq' &&
              rec.status === filters.status.value;
            if (endCond && statusCond) {
              Object.assign(rec, values);
            }
          }
          return resolve({ data: records, error: null });
        }
      };
      return api;
    }
  });
  return { supabase: { from } };
});

describe('trial auto convert', () => {
  it('converts expired trials', async () => {
    const now = new Date('2020-01-08T00:00:00.000Z');
    await convertExpiredTrials(now);
    const rec1 = records.find((r) => r.accountId === 'a1');
    const rec2 = records.find((r) => r.accountId === 'a2');
    expect(rec1?.status).toBe('active');
    expect(rec1?.billingStart).toBe(now.toISOString());
    expect(rec2?.status).toBe('trial');
  });
});
