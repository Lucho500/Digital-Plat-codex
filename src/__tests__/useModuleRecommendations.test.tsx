import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useModuleRecommendations } from '../lib/hooks/useModuleRecommendations';

vi.mock('../lib/supabase', () => {
  return {
    supabase: {
      from: () => ({
        select: () => ({
          contains: () => ({
            gte: () => ({
              order: () => ({
                limit: async () => ({ data: [{ id: 'exp1', name: 'Expert', sectors: ['commerce'], rating: 4.6 }], error: null })
              })
            })
          })
        })
      })
    }
  };
});

describe('useModuleRecommendations', () => {
  it('returns modules and expert', async () => {
    const { result } = renderHook(() =>
      useModuleRecommendations({ sector: 'commerce', size: 'small' })
    );

    await waitFor(() => {
      expect(result.current.expert).not.toBeNull();
    });

    expect(result.current.modules).toEqual(['e-invoice', 'inventory']);
    expect(result.current.expert?.id).toBe('exp1');
  });
});
