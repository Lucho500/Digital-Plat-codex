import { describe, it, expect } from 'vitest';
import { determineStatus } from '../lib/aiEntryQueue';

describe('AI entry status', () => {
  it('auto-posts with high confidence and low amount', () => {
    expect(determineStatus(0.95, 1000)).toBe('auto_posted');
  });

  it('requires review for mid confidence', () => {
    expect(determineStatus(0.8, 1000)).toBe('needs_review');
  });

  it('requires review for high amount even with high confidence', () => {
    expect(determineStatus(0.95, 5000)).toBe('needs_review');
  });

  it('rejects when confidence is low', () => {
    expect(determineStatus(0.7, 1000)).toBe('rejected');
  });
});
