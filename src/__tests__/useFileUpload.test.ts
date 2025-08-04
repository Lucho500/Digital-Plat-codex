import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useFileUpload } from '../lib/hooks/useFileUpload';

const insert = vi.fn();
vi.mock('../lib/supabase', () => ({
  supabase: { from: () => ({ insert }) }
}));

(global as any).URL.createObjectURL = vi.fn(() => 'preview');

class MockXHR {
  upload = { onprogress: (_: any) => {} } as any;
  open = vi.fn();
  send = vi.fn(() => {
    const total = 100;
    setTimeout(() => {
      this.upload.onprogress({ lengthComputable: true, loaded: 50, total });
      setTimeout(() => {
        this.upload.onprogress({ lengthComputable: true, loaded: 100, total });
        this.onload();
      }, 0);
    }, 0);
  });
  setRequestHeader = vi.fn();
  onload: any = () => {};
  onerror: any = () => {};
}

vi.stubGlobal('XMLHttpRequest', MockXHR as any);

describe('useFileUpload', () => {
  it('uploads file and tracks progress', async () => {
    const file = new File(['hello'], 'test.pdf', { type: 'application/pdf' });
    const { result } = renderHook(() => useFileUpload());
    act(() => result.current.selectFile(file));
    await act(async () => {
      await result.current.upload('session');
    });
    await waitFor(() => expect(result.current.progress).toBe(100));
    expect(insert).toHaveBeenCalled();
  });
});
