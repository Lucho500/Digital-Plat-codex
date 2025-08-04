import { vi } from 'vitest';
import { supabase } from '../lib/supabase';
import { fetchQrKpi } from '../lib/api/qrKpi';

describe('fetchQrKpi', () => {
  it('calls rpc and returns data', async () => {
    const mock = [{ ttfv_ms: 1000, ttfv_sparkline: [500], drop_off: 0.1, adoption_qr: 10, adoption_classic: 20, parsing_success: 0.9 }];
    const rpc = vi.spyOn(supabase, 'rpc').mockResolvedValue({ data: mock } as any);
    const result = await fetchQrKpi();
    expect(rpc).toHaveBeenCalledWith('get_qr_kpi');
    expect(result).toEqual(mock[0]);
  });
});
