import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useOcrUpdates } from '../lib/hooks/useOcrUpdates';

const channel = {
  on: vi.fn().mockImplementation(function () {
    return this;
  }),
  subscribe: vi.fn(),
  unsubscribe: vi.fn()
};
vi.mock('../lib/supabase', () => ({
  supabase: {
    channel: vi.fn(() => channel)
  }
}));

describe('useOcrUpdates', () => {
  it('updates data on ocrParsed event', () => {
    const { result } = renderHook(() => useOcrUpdates('abc'));
    const handler = channel.on.mock.calls[0][2] as any;
    act(() => handler({ name: 'ACME', siren: '1', address: 'rue', sector: 'tech' }));
    expect(result.current.data).toEqual({
      name: 'ACME',
      siren: '1',
      address: 'rue',
      sector: 'tech'
    });
    expect(result.current.highlight).toBe(true);
  });
});
