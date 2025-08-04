export interface VariantResult {
  variant: string;
  /** Conversion rate as a decimal (e.g. 0.12 for 12%) */
  conversion: number;
  /** Net revenue average relative to baseline, expressed as a decimal */
  revenue: number;
  /** Net Promoter Score between 0 and 100 */
  nps: number;
}

export interface Weights {
  conversion: number;
  revenue: number;
  nps: number;
}

const defaultWeights: Weights = { conversion: 0.5, revenue: 0.3, nps: 0.2 };

/**
 * Compute the weighted score for a variant using normalized metrics.
 * NPS is scaled down to a 0-1 range before weighting.
 */
export function calculateWeightedScore(
  metrics: VariantResult,
  weights: Weights = defaultWeights
) {
  const npsScore = (metrics.nps ?? 0) / 100;
  return (
    metrics.conversion * weights.conversion +
    metrics.revenue * weights.revenue +
    npsScore * weights.nps
  );
}

/**
 * Determine the winning variant based on the highest weighted score.
 * Returns the full metrics object for the winning variant or null if none provided.
 */
export function determineWinner(
  results: VariantResult[],
  weights: Weights = defaultWeights
): VariantResult | null {
  if (results.length === 0) return null;
  return results.reduce((best, current) => {
    const bestScore = calculateWeightedScore(best, weights);
    const currentScore = calculateWeightedScore(current, weights);
    return currentScore > bestScore ? current : best;
  });
}
