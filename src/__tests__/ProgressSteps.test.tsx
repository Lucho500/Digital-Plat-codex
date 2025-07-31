import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ProgressSteps from '../components/ui/ProgressSteps';

describe('<ProgressSteps />', () => {
  it('calls onChange with correct step id when a step button is clicked', () => {
    const steps = [
      { id: 1, label: 'Step 1', completed: true },
      { id: 2, label: 'Step 2', completed: false },
      { id: 3, label: 'Step 3', completed: false }
    ];
    const handleChange = vi.fn();
    render(
      <ProgressSteps steps={steps} currentStep={1} onChange={handleChange} />
    );

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('displays the Check icon for completed steps', () => {
    const steps = [
      { id: 1, label: 'Step 1', completed: true },
      { id: 2, label: 'Step 2', completed: true },
      { id: 3, label: 'Step 3', completed: false }
    ];
    const { container } = render(
      <ProgressSteps steps={steps} currentStep={2} onChange={() => {}} />
    );

    const checkIcons = container.querySelectorAll('svg.lucide.lucide-check');
    expect(checkIcons.length).toBe(2);
  });
});
