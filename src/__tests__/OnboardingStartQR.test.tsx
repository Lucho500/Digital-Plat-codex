import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import OnboardingStart from '../pages/OnboardingStart';

vi.mock('../lib/hooks/useFeatureFlag', () => ({
  useFeatureFlag: () => ({ enabled: false, loading: false, error: null }),
}));

vi.mock('../components/onboarding/QRScanStep', () => ({
  default: () => <div data-testid="qr-scan" />,
}));

describe('OnboardingStart', () => {
  it('does not render QR when flag disabled', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <OnboardingStart />
      </MemoryRouter>
    );
    expect(queryByTestId('qr-scan')).toBeNull();
  });
});
