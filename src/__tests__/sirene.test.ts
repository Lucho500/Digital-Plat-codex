import { vi, describe, it, expect } from 'vitest';
import { fetchSirene } from '../lib/api/sirene';

describe('fetchSirene', () => {
  it('calls the SIRENE API and returns parsed data', async () => {
    const mockResponse = {
      etablissement: {
        unite_legale: { denomination: 'Test SA' },
        geo_adresse: '1 rue de la Paix',
        code_postal: '75000',
        libelle_commune: 'Paris'
      }
    };

    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => mockResponse
    })) as any);

    const result = await fetchSirene('123456789');
    expect(result).toEqual({
      legalName: 'Test SA',
      address: '1 rue de la Paix',
      postalCode: '75000',
      city: 'Paris'
    });
  });
});
