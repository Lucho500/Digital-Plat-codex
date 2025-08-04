import { describe, expect, it } from 'vitest';
import { determineWinner } from '../bundle/winner';

describe('determineWinner', () => {
  it('selects variant with highest weighted score', () => {
    const results = [
      { variant: 'A', conversion: 0.05, revenue: 0.1, nps: 70 },
      { variant: 'B', conversion: 0.06, revenue: 0.05, nps: 60 },
      { variant: 'C', conversion: 0.04, revenue: 0.12, nps: 80 },
    ];
    const winner = determineWinner(results);
    expect(winner?.variant).toBe('C');
  });

  it('returns null for empty results', () => {
    expect(determineWinner([])).toBeNull();
  });
});
