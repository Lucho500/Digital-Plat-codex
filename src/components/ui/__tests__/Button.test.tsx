import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '../Button';
import { describe, it, expect } from 'vitest';

describe('Button component', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
