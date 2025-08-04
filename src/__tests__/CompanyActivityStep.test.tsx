import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import CompanyActivityStep from '../flows/onboarding/CompanyActivityStep';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../lib/hooks/useOcrUpdates', () => ({
  useOcrUpdates: () => ({
    data: { name: 'ACME', siren: '123456789', address: '1 rue', sector: 'retail' }
  })
}));

const sizes = [
  { id: 'micro', label: 'Micro-entreprise', description: '', icon: <div /> },
  { id: 'pme', label: 'PME', description: '', icon: <div /> }
];

const sectors = [
  { id: 'retail', label: 'Retail' },
  { id: 'services', label: 'Services' }
];

describe('<CompanyActivityStep />', () => {
  it('updates company size on click', () => {
    const setCompanySize = vi.fn();
    render(
      <CompanyActivityStep
        companySize=""
        setCompanySize={setCompanySize}
        sector=""
        setSector={vi.fn()}
        legalName=""
        setLegalName={vi.fn()}
        siren=""
        setSiren={vi.fn()}
        address=""
        setAddress={vi.fn()}
        postalCode=""
        setPostalCode={vi.fn()}
        city=""
        setCity={vi.fn()}
        activityDesc=""
        setActivityDesc={vi.fn()}
        taxRegime="is"
        setTaxRegime={vi.fn()}
        onAutoFill={vi.fn()}
        activitySectors={sectors}
        companySizes={sizes}
        sessionId={null}
        onAllConfirmedChange={vi.fn()}
      />
    );
    fireEvent.click(screen.getAllByText('Micro-entreprise')[0]);
    expect(setCompanySize).toHaveBeenCalledWith('micro');
  });

  it('triggers auto-fill', () => {
    const onAutoFill = vi.fn();
    render(
      <CompanyActivityStep
        companySize="micro"
        setCompanySize={vi.fn()}
        sector="retail"
        setSector={vi.fn()}
        legalName=""
        setLegalName={vi.fn()}
        siren="123"
        setSiren={vi.fn()}
        address=""
        setAddress={vi.fn()}
        postalCode=""
        setPostalCode={vi.fn()}
        city=""
        setCity={vi.fn()}
        activityDesc=""
        setActivityDesc={vi.fn()}
        taxRegime="is"
        setTaxRegime={vi.fn()}
        onAutoFill={onAutoFill}
        activitySectors={sectors}
        companySizes={sizes}
        sessionId={null}
        onAllConfirmedChange={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Auto-remplir/i }));
    expect(onAutoFill).toHaveBeenCalled();
  });

  it('injects OCR data into fields', () => {
    const setLegalName = vi.fn();
    const setSiren = vi.fn();
    const setAddress = vi.fn();
    const setSector = vi.fn();
    render(
      <CompanyActivityStep
        companySize="micro"
        setCompanySize={vi.fn()}
        sector=""
        setSector={setSector}
        legalName=""
        setLegalName={setLegalName}
        siren=""
        setSiren={setSiren}
        address=""
        setAddress={setAddress}
        postalCode=""
        setPostalCode={vi.fn()}
        city=""
        setCity={vi.fn()}
        activityDesc=""
        setActivityDesc={vi.fn()}
        taxRegime="is"
        setTaxRegime={vi.fn()}
        onAutoFill={vi.fn()}
        activitySectors={sectors}
        companySizes={sizes}
        sessionId="abc"
        onAllConfirmedChange={vi.fn()}
      />
    );
    expect(setLegalName).toHaveBeenCalledWith('ACME');
    expect(setSiren).toHaveBeenCalledWith('123456789');
    expect(setAddress).toHaveBeenCalledWith('1 rue');
    expect(setSector).toHaveBeenCalledWith('retail');
  });
});
