import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchAbacusEntries } from '../sync/fetchAbacusEntries';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('fetchAbacusEntries', () => {
  it('maps Abacus response', async () => {
    const mockResponse = { data: [{ GLAccount: '7000', amount: 5 }] };
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => mockResponse
    })) as any);

    const data = await fetchAbacusEntries('acc1', '2024-05-01', '2024-05-02');
    expect(data[0]).toHaveProperty('glAccount', '7000');
  });
});
