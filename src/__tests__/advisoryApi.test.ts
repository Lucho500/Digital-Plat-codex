import { describe, it, expect, beforeEach, vi } from 'vitest';
import Fastify from 'fastify';
import referralRoute from '../../api/advisory/referral';
import acceptRoute from '../../api/advisory/accept';
import slotsRoute from '../../api/advisory/slots';
import checkoutRoute from '../../api/advisory/checkout';

const specialists: any[] = [];
const sessions: any[] = [];
const slots: any[] = [];

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
      if (table === 'advisor_slots') {
        return {
          select() {
            const query: any = {
              data: slots,
              eq(field: string, value: any) {
                this.data = this.data.filter((s: any) => s[field] === value);
                return this;
              },
              gte(field: string, value: any) {
                this.data = this.data.filter((s: any) => s[field] >= value);
                return this;
              },
              lt(field: string, value: any) {
                this.data = this.data.filter((s: any) => s[field] < value);
                return this;
              },
              order() {
                this.data.sort((a: any, b: any) => a.start_at.localeCompare(b.start_at));
                return Promise.resolve({ data: this.data });
              }
            };
            return query;
          },
          update(values: any) {
            return {
              eq(field: string, value: any) {
                const rec = slots.find((s) => s[field] === value);
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
    slots.length = 0;
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

  it('returns available slots', async () => {
    const now = new Date();
    slots.push(
      { id: 'slot1', advisor_id: 'adv1', start_at: new Date(now.getTime() + 3600000).toISOString(), end_at: new Date(now.getTime() + 5400000).toISOString(), is_booked: false },
      { id: 'slot2', advisor_id: 'adv1', start_at: new Date(now.getTime() + 7200000).toISOString(), end_at: new Date(now.getTime() + 9000000).toISOString(), is_booked: true }
    );
    const app = Fastify();
    await app.register(slotsRoute);
    const res = await app.inject({
      method: 'GET',
      url: `/api/advisory/slots?advisorId=adv1&days=1`
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.slots).toHaveLength(1);
    expect(body.slots[0].id).toBe('slot1');
    await app.close();
  });

  it('creates checkout and reserves slot', async () => {
    slots.push({ id: 'slot1', advisor_id: 'adv1', start_at: '', end_at: '', is_booked: false });
    sessions.push({ id: 'sess1', account_id: 'a1', expert_id: 'e1', specialist_id: 's1', status: 'pending', created_at: '' });
    const app = Fastify();
    await app.register(checkoutRoute);
    const res = await app.inject({
      method: 'POST',
      url: '/api/advisory/checkout',
      payload: { sessionId: 'sess1', slotId: 'slot1' }
    });
    expect(res.statusCode).toBe(200);
    expect(slots[0].is_booked).toBe(true);
    expect(sessions[0].status).toBe('payment_pending');
    await app.close();
  });
});
