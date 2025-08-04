import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useFeatureFlag } from '../lib/hooks/useFeatureFlag';
import { supabase } from '../lib/supabase';

describe('useFeatureFlag', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns enabled flag', async () => {
    const single = vi.fn().mockResolvedValue({ data: { is_enabled: true } });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: () => ({ eq: () => ({ single }) }) } as any);
    const { result } = renderHook(() => useFeatureFlag('flag-enabled'));
    await waitFor(() => expect(result.current.enabled).toBe(true));
  });

  it('returns disabled flag', async () => {
    const single = vi.fn().mockResolvedValue({ data: { is_enabled: false } });
    vi.spyOn(supabase, 'from').mockReturnValue({ select: () => ({ eq: () => ({ single }) }) } as any);
    const { result } = renderHook(() => useFeatureFlag('flag-disabled'));
    await waitFor(() => expect(result.current.enabled).toBe(false));
  });

  it('handles error', async () => {
    const single = vi.fn().mockRejectedValue(new Error('fail'));
    vi.spyOn(supabase, 'from').mockReturnValue({ select: () => ({ eq: () => ({ single }) }) } as any);
    const { result } = renderHook(() => useFeatureFlag('flag-error'));
    await waitFor(() => expect(result.current.error).toBeTruthy());
  });
});
