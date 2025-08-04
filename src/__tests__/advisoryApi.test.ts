import { describe, it, expect, beforeEach, vi } from 'vitest';
import Fastify from 'fastify';
import referralRoute from '../../api/advisory/referral';
import acceptRoute from '../../api/advisory/accept';

const specialists: any[] = [];
const sessions: any[] = [];

vi.mock('../../src/lib/supabase', () => ({
  supabase: {
    from(table: string) {
      if (table === 'specialists') {
        return {
          select: async () => ({ data: specialists }),
          update(values: any) {
            return {
              eq(field: string, value: any) {
                const rec = specialists.find((s) => s[field] === value);
                if (rec) Object.assign(rec, values);
                return Promise.resolve({ data: rec ? [rec] : [] });
              }
            };
          }
        };
      }
      if (table === 'advisory_sessions') {
        return {
          insert: async (record: any) => {
            sessions.push(record);
            return { data: record };
          },
          update(values: any) {
            return {
              eq(field: string, value: any) {
                const rec = sessions.find((s) => s[field] === value);
                if (rec) Object.assign(rec, values);
                return Promise.resolve({ data: rec ? [rec] : [] });
              }
            };
          }
        };
      }
      return {} as any;
    }
  }
}));

describe('advisory API', () => {
  beforeEach(() => {
    specialists.length = 0;
    sessions.length = 0;
  });

  it('refers a client to a specialist', async () => {
    specialists.push(
      { id: 's1', name: 'Spec1', sectors: ['tax'], languages: ['fr'], rating: 5, max_load: 2, current_load: 0 },
      { id: 's2', name: 'Spec2', sectors: ['tax'], languages: ['fr'], rating: 4, max_load: 2, current_load: 1 }
    );
    const app = Fastify();
    await app.register(referralRoute);
    const token = Buffer.from(JSON.stringify({ id: 'e1', role: 'expert', accountId: 'a1' })).toString('base64');
    const res = await app.inject({
      method: 'POST',
      url: '/api/advisory/referral',
      headers: { authorization: `Bearer ${token}` },
      payload: { accountId: 'a1', topic: 'tax', preferredTimeSlots: [] }
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.specialistId).toBe('s1');
    expect(sessions).toHaveLength(1);
    expect(specialists[0].current_load).toBe(1);
    await app.close();
  });

  it('accepts a session', async () => {
    sessions.push({ id: 'sess1', account_id: 'a1', expert_id: 'e1', specialist_id: 's1', status: 'pending', created_at: '' });
    const app = Fastify();
    await app.register(acceptRoute);
    const res = await app.inject({
      method: 'POST',
      url: '/api/advisory/accept',
      payload: { sessionId: 'sess1', startAt: '2024-01-01T10:00:00Z' }
    });
    expect(res.statusCode).toBe(200);
    expect(sessions[0].status).toBe('scheduled');
    expect(sessions[0].meeting_url).toMatch(/https:\/\/whereby.com\/sess1/);
    await app.close();
  });
});
