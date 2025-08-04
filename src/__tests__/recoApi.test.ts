import { describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import recoRoute from '../../api/reco/modules';

vi.mock('../lib/hooks/useAnalytics', () => ({
  logRecoEvent: vi.fn()
}));

describe('reco API', () => {
  it('returns module scores', async () => {
    const app = Fastify();
    await app.register(recoRoute);
    const token = Buffer.from(JSON.stringify({ role: 'user' })).toString('base64');
    const res = await app.inject({
      method: 'GET',
      url: '/api/reco/modules?sector=commerce&size=small&invoiceVolume=100&sessions7d=10',
      headers: { authorization: `Bearer ${token}` }
    });
    await app.close();
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.payload);
    expect(body.length).toBeGreaterThanOrEqual(2);
    for (const item of body) {
      expect(item.score).toBeGreaterThan(0.6);
    }
  });
});
