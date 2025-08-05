import { describe, it, expect, vi } from 'vitest';

vi.mock('../lib/openai', () => ({
  openai: { chat: { completions: { create: vi.fn() } } },
}));
vi.mock('../lib/supabase', () => ({ supabase: {} }));

import { buildFollowupPrompt, abTestTone } from '../lib/aiInvoiceFollowup';

describe('invoice follow-up AI helper', () => {
  it('builds prompt with invoice data and tone', () => {
    const messages = buildFollowupPrompt(
      { id: 'inv1', amount: 200, daysLate: 5, historyScore: 95 },
      'courtois'
    );
    const content = messages[1].content;
    expect(content).toContain('"id":"inv1"');
    expect(content).toContain('courtois');
  });

  it('supports A/B tone testing', () => {
    expect(abTestTone('courtois', 'ferme', 0.3)).toBe('courtois');
    expect(abTestTone('courtois', 'ferme', 0.7)).toBe('ferme');
  });
});
