import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useSessionValidation } from '../lib/hooks/useSessionValidation';
import { supabase } from '../lib/supabase';

describe('useSessionValidation', () => {
  it('returns valid for non expired token', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { expires_at: new Date(Date.now() + 60000).toISOString() }
    });
    vi.spyOn(supabase, 'from').mockReturnValue({
      select: () => ({ eq: () => ({ single }) })
    } as any);
    const { result } = renderHook(() => useSessionValidation('token'));
    await waitFor(() => expect(result.current).toBe('valid'));
  });

  it('returns invalid for expired token', async () => {
    const single = vi.fn().mockResolvedValue({
      data: { expires_at: new Date(Date.now() - 60000).toISOString() }
    });
    vi.spyOn(supabase, 'from').mockReturnValue({
      select: () => ({ eq: () => ({ single }) })
    } as any);
    const { result } = renderHook(() => useSessionValidation('token'));
    await waitFor(() => expect(result.current).toBe('invalid'));
  });
});
