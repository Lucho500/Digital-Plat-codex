import { vi } from 'vitest';
import { toggleFeature } from '../lib/api/featureFlags';
import { supabase } from '../lib/supabase';

describe('toggleFeature', () => {
  it('calls rpc with flag id', async () => {
    const rpc = vi.spyOn(supabase, 'rpc').mockResolvedValue({} as any);
    await toggleFeature('onboardingQR');
    expect(rpc).toHaveBeenCalledWith('toggle_feature', { flag_id: 'onboardingQR' });
  });
});
