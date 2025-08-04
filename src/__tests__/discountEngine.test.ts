import { describe, expect, it } from 'vitest';
import { getDiscountPct } from '../bundle/discountEngine';

describe('getDiscountPct', () => {
  it('returns 5 for score greater than 0.8', () => {
    expect(getDiscountPct(0.81)).toBe(5);
    expect(getDiscountPct(0.9)).toBe(5);
  });

  it('returns 10 for score greater than 0.6 and up to 0.8', () => {
    expect(getDiscountPct(0.61)).toBe(10);
    expect(getDiscountPct(0.8)).toBe(10);
  });

  it('returns 15 for score 0.6 or less', () => {
    expect(getDiscountPct(0.6)).toBe(15);
    expect(getDiscountPct(0.3)).toBe(15);
  });
});
