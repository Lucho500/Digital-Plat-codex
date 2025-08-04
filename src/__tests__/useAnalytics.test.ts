import { describe, it, expect, vi } from 'vitest';

const insert = vi.fn().mockResolvedValue({});
const from = vi.fn(() => ({ insert }));
vi.mock('../lib/supabase', () => ({ supabase: { from } }));

describe('analytics events', () => {
  it('logs onboarding events', async () => {
    const { logOnboardingEvent } = await import('../lib/hooks/useAnalytics');
    await logOnboardingEvent('stepStarted', { stepId: 1, userId: '1' });
    expect(from).toHaveBeenCalledWith('analytics_events');
    expect(insert).toHaveBeenCalled();
  });

  it('logs recommendation events', async () => {
    insert.mockClear();
    const { logRecoEvent } = await import('../lib/hooks/useAnalytics');
    await logRecoEvent('recoServed', { moduleIds: ['a'], userId: '1' });
    expect(from).toHaveBeenCalledWith('analytics_events');
    expect(insert).toHaveBeenCalled();
  });
});
