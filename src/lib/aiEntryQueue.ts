import { supabase } from './supabase';

export type AiEntryStatus =
  | 'queued'
  | 'auto_posted'
  | 'needs_review'
  | 'rejected';

export function determineStatus(confidence: number, amount: number): AiEntryStatus {
  if (confidence < 0.75) return 'rejected';
  if (confidence >= 0.9 && amount < 5000) return 'auto_posted';
  return 'needs_review';
}

export async function processQueue(now = new Date()) {
  const { data } = await supabase
    .from('ai_entry_queue')
    .select('id, confidence, amount')
    .eq('status', 'queued');

  for (const item of data || []) {
    const status = determineStatus(item.confidence, item.amount);
    const update: Record<string, any> = { status };
    if (status === 'auto_posted') {
      update.posted_at = now.toISOString();
    }
    await supabase
      .from('ai_entry_queue')
      .update(update)
      .eq('id', item.id);
  }
}
