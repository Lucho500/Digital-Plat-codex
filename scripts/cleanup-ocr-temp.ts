import { supabase } from '../src/lib/supabase';

async function cleanup() {
  const { data } = await supabase.storage.from('ocr-temp').list();
  const now = Date.now();
  const toRemove: string[] = [];
  (data || []).forEach((item) => {
    const created = item.created_at ? new Date(item.created_at).getTime() : 0;
    if (now - created > 30 * 60 * 1000) {
      toRemove.push(item.name);
    }
  });
  if (toRemove.length) {
    await supabase.storage.from('ocr-temp').remove(toRemove);
  }
}

cleanup();
