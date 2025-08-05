export async function slackSyncAlert(message: string) {
  await fetch(process.env.SLACK_SYNC_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
  });
}
