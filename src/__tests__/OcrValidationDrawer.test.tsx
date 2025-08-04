import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import OcrValidationDrawer, { ValidationField } from '../flows/onboarding/OcrValidationDrawer';

describe('OcrValidationDrawer', () => {
  it('calls onEdit when clicking Modifier', () => {
    const fields: ValidationField[] = [
      { key: 'siren', label: 'SIREN', value: '123', confirmed: true }
    ];
    const onEdit = vi.fn();
    render(
      <OcrValidationDrawer fields={fields} onConfirm={vi.fn()} onEdit={onEdit} />
    );
    fireEvent.click(screen.getByText('Modifier'));
    expect(onEdit).toHaveBeenCalledWith('siren');
  });
});
