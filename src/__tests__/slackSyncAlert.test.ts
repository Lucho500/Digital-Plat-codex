import { describe, it, expect, vi } from 'vitest';
import { slackSyncAlert } from '../lib/slackSyncAlert';

describe('slackSyncAlert', () => {
  it('sends message to slack webhook', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true })) as any;
    vi.stubGlobal('fetch', fetchMock);
    process.env.SLACK_SYNC_WEBHOOK = 'https://example.com';

    await slackSyncAlert('test message');

    expect(fetchMock).toHaveBeenCalledWith('https://example.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'test message' })
    });
  });
});
