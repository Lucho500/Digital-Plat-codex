import { describe, it, expect, vi } from 'vitest';

describe('ocrService.parse', () => {
  it('returns structured data', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({
      ok: true,
      json: async () => ({ name: 'A', siren: '1', address: 'B', sector: 'C' })
    })) as any);
    const { ocrService } = await import('../../api/ocr/ocrService');
    const res = await ocrService.parse('file');
    expect(res).toEqual({ name: 'A', siren: '1', address: 'B', sector: 'C' });
  });

  it('throws on failure', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })) as any);
    const { ocrService } = await import('../../api/ocr/ocrService');
    await expect(ocrService.parse('file')).rejects.toThrow();
  });
});
