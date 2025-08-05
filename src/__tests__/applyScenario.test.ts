import { describe, it, expect } from 'vitest';
import { applyScenario, ForecastMonth } from '../lib/whatif';

describe('applyScenario', () => {
  const base: ForecastMonth[] = Array.from({ length: 12 }, (_, i) => ({
    month: `2024-${i + 1}`,
    revenue: 100,
    marginPct: 0.4,
    salaries: 20,
    opex: 10,
    startingCash: i === 0 ? 0 : undefined,
  }));

  it('computes KPI variation', () => {
    const res = applyScenario(base, { deltaCApct: 10, deltaMarginPct: 0, deltaSalary: 0, deltaOpex: 0 });
    expect(res.forecast).toHaveLength(12);
    expect(res.kpiDiff.cash_min).toBeCloseTo(4);
    expect(res.kpiDiff.solde_fin_annee).toBeCloseTo(48);
    expect(res.kpiDiff.EBITDA).toBeCloseTo(48);
  });
});
