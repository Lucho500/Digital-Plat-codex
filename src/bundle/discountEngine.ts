export function getDiscountPct(score: number) {
  if (score > 0.8) return 5;
  if (score > 0.6) return 10;
  return 15;
}
