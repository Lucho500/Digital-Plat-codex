import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SuggestedModulesWidget from '../components/widgets/SuggestedModulesWidget';

vi.mock('../lib/hooks/useFeatureFlag', () => ({
  useFeatureFlag: () => ({ enabled: true, loading: false, error: null })
}));

vi.mock('../lib/hooks/useAnalytics', () => ({
  logRecoEvent: vi.fn()
}));

describe('SuggestedModulesWidget', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { moduleId: 'e-invoice' },
            { moduleId: 'inventory' },
            { moduleId: 'project-tracking' }
          ])
      }) as any
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('affiche les cartes modules', async () => {
    render(<SuggestedModulesWidget accountId="1" />);
    await waitFor(() => {
      expect(screen.getByText('Facturation')).toBeInTheDocument();
    });
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
