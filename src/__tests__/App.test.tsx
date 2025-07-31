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
    const div = document.createElement('div');
    div.style.width = '1024px';
    div.style.height = '768px';
    Object.defineProperty(div, 'offsetWidth', { configurable: true, value: 1024 });
    Object.defineProperty(div, 'offsetHeight', { configurable: true, value: 768 });

    const { container } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
      { container: div }
    );
    document.body.appendChild(container);
  });
});
