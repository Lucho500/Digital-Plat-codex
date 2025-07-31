import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TaxOnboarding from '../pages/TaxOnboarding';

vi.mock('../contexts/AuthContext', () => {
  return { useAuthContext: () => ({ user: { id: 'test-user' }, company: null, loading: false }) };
});

describe('TaxOnboarding accessibility', () => {
  it('associates SIREN label with its input', () => {
    const { container } = render(
      <MemoryRouter>
        <TaxOnboarding />
      </MemoryRouter>
    );
    const label = screen.getByText('SIREN');
    expect(label).toHaveAttribute('for', 'siren');
    expect(container.querySelector('#siren')).not.toBeNull();
  });
});
