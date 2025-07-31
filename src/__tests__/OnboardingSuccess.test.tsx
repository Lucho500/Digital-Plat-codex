import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import OnboardingSuccess from '../pages/OnboardingSuccess';

vi.mock('../contexts/AuthContext', () => {
  return { useAuthContext: () => ({ user: { id: '1' }, company: null, loading: false }) };
});

vi.mock('../lib/hooks/useFeedback', () => {
  return { useFeedback: () => ({ triggerFeedback: () => {} }) };
});

describe('<OnboardingSuccess />', () => {
  it('renders summary and CTA', () => {
    const state = {
      name: 'ACME',
      modules: ['tax', 'payroll'],
      expert: { name: 'Jane' },
      totalTime: 1000,
      stepsCompleted: 4,
      skippedSteps: 0
    };
    render(
      <MemoryRouter initialEntries={[{ pathname: '/onboarding/success', state }]}> 
        <OnboardingSuccess />
      </MemoryRouter>
    );
    expect(screen.getByText('Bienvenue ACME !')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Accéder au tableau de bord/i })).toBeInTheDocument();
  });
});
