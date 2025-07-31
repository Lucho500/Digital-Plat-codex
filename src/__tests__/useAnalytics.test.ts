import { describe, it, expect, vi } from 'vitest';

describe('logOnboardingEvent', () => {
  it('inserts event in supabase', async () => {
    const insert = vi.fn().mockResolvedValue({});
    const from = vi.fn(() => ({ insert }));
    vi.doMock('../lib/supabase', () => ({ supabase: { from } }));

    const { logOnboardingEvent } = await import('../lib/hooks/useAnalytics');
    await logOnboardingEvent('stepStarted', { stepId: 1, userId: '1' });
    expect(from).toHaveBeenCalledWith('analytics_events');
    expect(insert).toHaveBeenCalled();
  });
});
