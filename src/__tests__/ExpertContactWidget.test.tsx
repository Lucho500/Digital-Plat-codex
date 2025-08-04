import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import ExpertContactWidget from '../components/widgets/ExpertContactWidget';
import { useExpertDetails } from '../lib/hooks/useExpertDetails';
import { useFeatureFlag } from '../lib/hooks/useFeatureFlag';
import { logAdvisoryEvent } from '../lib/hooks/useAnalytics';

vi.mock('../lib/hooks/useExpertDetails');
vi.mock('../lib/hooks/useFeatureFlag');
vi.mock('../lib/hooks/useAnalytics');

describe('<ExpertContactWidget />', () => {
  it('renders expert info and logs view', () => {
    (useFeatureFlag as unknown as vi.Mock).mockReturnValue({ enabled: true });
    (useExpertDetails as unknown as vi.Mock).mockReturnValue({
      expert: {
        id: 'exp1',
        name: 'Jean Martin',
        speciality: 'Fiscalité PME',
        avatarUrl: '',
        online: true,
        npsScore: 90
      },
      isLoading: false
    });

    render(<ExpertContactWidget accountId="acc1" />);

    expect(screen.getByText('Jean Martin')).toBeInTheDocument();
    expect(screen.getByText('Fiscalité PME')).toBeInTheDocument();
    expect(logAdvisoryEvent).toHaveBeenCalledWith('expertWidgetViewed', {
      accountId: 'acc1',
      expertId: 'exp1'
    });
  });
});
