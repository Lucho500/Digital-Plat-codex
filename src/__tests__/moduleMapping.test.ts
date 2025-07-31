import { describe, it, expect } from 'vitest';
import mapping from '../config/module-mapping';

describe('module mapping', () => {
  it('returns modules for sector', () => {
    expect(mapping['commerce']).toEqual(['e-invoice', 'inventory']);
    expect(mapping['services']).toEqual(['project-tracking', 'time-billing']);
    expect(mapping['industrie']).toEqual(['asset-management', 'production']);
  });
});
