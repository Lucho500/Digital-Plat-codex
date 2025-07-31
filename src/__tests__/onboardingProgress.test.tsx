import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TaxOnboarding from '../pages/TaxOnboardingV2';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../lib/supabase', () => {
  return {
    supabase: {
      from: () => ({
        select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }),
        upsert: vi.fn().mockResolvedValue({}),
        delete: vi.fn().mockResolvedValue({}),
        insert: vi.fn().mockResolvedValue({})
      })
    }
  };
});

vi.mock('../contexts/AuthContext', () => {
  return { useAuthContext: () => ({ user: { id: '1' }, company: null, loading: false }) };
});

vi.useFakeTimers();

describe('onboarding progress', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('saves progress to localStorage', () => {
    render(
      <MemoryRouter>
        <TaxOnboarding />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByText('Micro-entreprise')[0]);
    fireEvent.click(screen.getByText('Services'));
    fireEvent.click(screen.getByText('Continuer'));

    vi.advanceTimersByTime(600);
    return Promise.resolve().then(() => {
      const data = JSON.parse(localStorage.getItem('taxOnboardingV2') || '{}');
      expect(data.currentStep).toBe(2);
    });
  });

  it('clears progress on completion', async () => {
    localStorage.setItem('taxOnboardingV2', JSON.stringify({ currentStep: 4, formData: {} }));

    render(
      <MemoryRouter>
        <TaxOnboarding />
      </MemoryRouter>
    );

    const yes = await screen.findByText('Oui');
    fireEvent.click(yes);
    fireEvent.click(screen.getByText('Accéder à mon tableau de bord'));

    expect(localStorage.getItem('taxOnboardingV2')).toBeNull();
  });
});
