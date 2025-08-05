import { describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import whatIfRoute from '../../api/cfo/whatif';
import { ForecastMonth } from '../lib/whatif';

const base: ForecastMonth[] = Array.from({ length: 12 }, (_, i) => ({
  month: `2024-${i + 1}`,
  revenue: 100,
  marginPct: 0.4,
  salaries: 20,
  opex: 10,
  startingCash: i === 0 ? 0 : undefined,
}));

vi.mock('../../src/lib/cashPredictor', () => ({
  predictCash: vi.fn(() => new Promise((resolve) => setTimeout(() => resolve(base), 3000)))
}));

describe('what-if API', () => {
  it(
    'caches scenario results to stay under 2s',
    async () => {
      vi.useFakeTimers();
      const app = Fastify();
      await app.register(whatIfRoute);
      const payload = { accountId: 'a1', deltaCApct: 10, deltaMarginPct: 0, deltaSalary: 0, deltaOpex: 0 };

      const start = Date.now();
      const req1 = app.inject({ method: 'POST', url: '/api/cfo/whatif', payload });
      await vi.advanceTimersByTimeAsync(3000);
      await vi.runAllTimersAsync();
      const res1 = await req1;
      const duration1 = Date.now() - start;
      expect(res1.statusCode).toBe(200);
      expect(duration1).toBeGreaterThanOrEqual(3000);

      const start2 = Date.now();
      const res2Promise = app.inject({ method: 'POST', url: '/api/cfo/whatif', payload });
      await vi.runAllTimersAsync();
      const res2 = await res2Promise;
      const duration2 = Date.now() - start2;
      expect(duration2).toBeLessThan(2000);

      const body1 = JSON.parse(res1.payload);
      const body2 = JSON.parse(res2.payload);
      expect(body2).toEqual(body1);

      const { predictCash } = await import('../../src/lib/cashPredictor');
      expect((predictCash as any).mock.calls.length).toBe(1);

      await app.close();
      vi.useRealTimers();
    },
    10000
  );
});
