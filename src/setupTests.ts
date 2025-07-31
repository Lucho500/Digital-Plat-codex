import '@testing-library/jest-dom';

// Polyfill ResizeObserver for recharts components in tests
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).ResizeObserver = ResizeObserver;

// Mock scrollIntoView used in MaxAssistant component
(window as any).HTMLElement.prototype.scrollIntoView = () => {};
