import { describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import trialRoute from '../../api/subscription/trial';

const records: any[] = [];

vi.mock('../../src/lib/supabase', () => {
  const from = () => ({
    select: () => {
      const filters: any = {};
      const api: any = {
        eq(field: string, value: any) {
          filters[field] = value;
          return api;
        },
        in(field: string, values: any[]) {
          filters[field] = values;
          return api;
        },
        async maybeSingle() {
          const found = records.find(
            (r) =>
              r.accountId === filters.accountId &&
              r.moduleId === filters.moduleId &&
              (!filters.status || filters.status.includes(r.status))
          );
          return { data: found || null, error: null };
        }
      };
      return api;
    },
    insert: async (record: any) => {
      records.push(record);
      return { data: record, error: null };
    },
    update: (values: any) => {
      const filters: any = {};
      const api: any = {
        eq(field: string, value: any) {
          filters[field] = value;
          return api;
        },
        async then(resolve: any) {
          const rec = records.find((r) =>
            Object.entries(filters).every(([k, v]) => r[k] === v)
          );
          if (rec) Object.assign(rec, values);
          return resolve({ data: rec ? [rec] : [], error: null });
        }
      };
      return api;
    }
  });
  return { supabase: { from } };
});

vi.mock('../../src/lib/hooks/useAnalytics', () => ({
  logTrialEvent: vi.fn()
}));

vi.mock('../../src/lib/hooks/useEmail', () => ({
  sendTrialStartedEmail: vi.fn()
}));

describe('trial API', () => {
  it('starts trial', async () => {
    records.length = 0;
    const app = Fastify();
    await app.register(trialRoute);
    const res = await app.inject({
      method: 'POST',
      url: '/api/subscription/trial-start',
      payload: { accountId: 'a1', moduleId: 'm1' }
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.status).toBe('trial');
    expect(records).toHaveLength(1);
    await app.close();
  });

  it('returns 409 if already active', async () => {
    records.length = 0;
    records.push({ accountId: 'a1', moduleId: 'm1', status: 'trial' });
    const app = Fastify();
    await app.register(trialRoute);
    const res = await app.inject({
      method: 'POST',
      url: '/api/subscription/trial-start',
      payload: { accountId: 'a1', moduleId: 'm1' }
    });
    expect(res.statusCode).toBe(409);
    await app.close();
  });
});
