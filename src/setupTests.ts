import '@testing-library/jest-dom';

// Polyfill ResizeObserver for recharts components in tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = ResizeObserver;

// Mock scrollIntoView used in MaxAssistant component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).HTMLElement.prototype.scrollIntoView = () => {};
