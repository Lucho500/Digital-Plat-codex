import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';

// Mock AuthProvider to avoid Supabase calls
vi.mock('../contexts/AuthContext', () => {
  const React = require('react');
  return { AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</> };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
