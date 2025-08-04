import { describe, it, expect } from 'vitest';
import { getRuleScores } from '../reco/rules';

describe('rules engine', () => {
  it('maps sector and size to modules', () => {
    const scores = getRuleScores('commerce', 'small');
    expect(scores['e-invoice']).toBe(1);
    expect(Object.keys(scores).length).toBeGreaterThanOrEqual(2);
  });
});
