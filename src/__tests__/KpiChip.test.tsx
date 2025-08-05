import { render, screen } from '@testing-library/react';
import KpiChip from '../components/KpiChip';

describe('KpiChip', () => {
  it('renders label and value', () => {
    render(<KpiChip label="Test KPI" value="42" />);
    expect(screen.getByText('Test KPI')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
