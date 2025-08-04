import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import QRScanStep from '../components/onboarding/QRScanStep';

vi.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => ({ user: { id: 'user-1' } })
}));

const insert = vi.fn();
vi.mock('../lib/supabase', () => ({
  supabase: { from: () => ({ insert }) }
}));

describe('QRScanStep', () => {
  it('stores session with 10 minute expiration', async () => {
    const { unmount } = render(<QRScanStep />);
    await waitFor(() => expect(insert).toHaveBeenCalled());
    const payload = insert.mock.calls[0][0];
    const created = new Date(payload.created_at).getTime();
    const expires = new Date(payload.expires_at).getTime();
    expect(expires - created).toBe(10 * 60 * 1000);
    unmount();
  });
});
