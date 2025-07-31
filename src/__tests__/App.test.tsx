import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { ThemeProvider } from '../contexts/ThemeContext';

// Mock AuthProvider to avoid Supabase calls
import ReactImport from 'react';

vi.mock('../contexts/AuthContext', () => {
  return { AuthProvider: ({ children }: { children: ReactImport.ReactNode }) => <>{children}</> };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
  });
});
