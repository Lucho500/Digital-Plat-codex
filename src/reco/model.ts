import { weights } from './weights';

export interface ModelFeatures {
  sector: string;
  size: string;
  invoiceVolume: number;
  sessions7d: number;
}

export const MODEL_WEIGHT = 0.6;

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export function predict(features: ModelFeatures) {
  const results: Record<string, number> = {};
  for (const [moduleId, w] of Object.entries(weights)) {
    const x =
      w.bias +
      (w.sector[features.sector] || 0) +
      (w.size[features.size] || 0) +
      w.invoiceVolume * features.invoiceVolume +
      w.sessions7d * features.sessions7d;
    results[moduleId] = sigmoid(x);
  }
  return results;
}
