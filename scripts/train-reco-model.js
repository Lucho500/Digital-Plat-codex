// Simplified training script for the recommendation model.
// In a real scenario this would load anonymized usage_stats from the database
// and fit a logistic regression for each module. Here we simply write
// precomputed weights to the expected location.

import fs from 'fs';

const weights = {
  'e-invoice': {
    bias: -1,
    sector: { commerce: 0.8, services: 0.4, industrie: 0.3 },
    size: { small: 0.2, medium: 0.3, large: 0.4 },
    invoiceVolume: 0.01,
    sessions7d: 0.05
  },
  inventory: {
    bias: -1.2,
    sector: { commerce: 0.7, services: 0.2, industrie: 0.2 },
    size: { small: 0.3, medium: 0.3, large: 0.3 },
    invoiceVolume: 0.015,
    sessions7d: 0.04
  },
  'project-tracking': {
    bias: -1.1,
    sector: { commerce: 0.2, services: 0.8, industrie: 0.3 },
    size: { small: 0.2, medium: 0.4, large: 0.5 },
    invoiceVolume: 0.008,
    sessions7d: 0.03
  },
  'time-billing': {
    bias: -1.3,
    sector: { commerce: 0.1, services: 0.7, industrie: 0.2 },
    size: { small: 0.2, medium: 0.3, large: 0.4 },
    invoiceVolume: 0.005,
    sessions7d: 0.04
  },
  'asset-management': {
    bias: -1.2,
    sector: { commerce: 0.2, services: 0.3, industrie: 0.8 },
    size: { small: 0.3, medium: 0.4, large: 0.5 },
    invoiceVolume: 0.012,
    sessions7d: 0.03
  },
  production: {
    bias: -1.4,
    sector: { commerce: 0.1, services: 0.2, industrie: 0.9 },
    size: { small: 0.2, medium: 0.4, large: 0.5 },
    invoiceVolume: 0.01,
    sessions7d: 0.02
  }
};

fs.writeFileSync(
  'src/reco/weights.ts',
  'export const weights = ' + JSON.stringify(weights, null, 2) + ';\n'
);

console.log('Weights written to src/reco/weights.ts');
