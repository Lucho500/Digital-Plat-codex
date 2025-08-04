import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export interface OcrParsed {
  name: string;
  siren: string;
  address: string;
  sector: string;
}

export function useOcrUpdates(sessionId: string | null) {
  const [data, setData] = useState<OcrParsed | null>(null);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const channel = supabase.channel(`ocr_updates:${sessionId}`);
    channel
      .on('broadcast', { event: 'ocrParsed' }, (payload) => {
        setData(payload as OcrParsed);
        setHighlight(true);
        setTimeout(() => setHighlight(false), 2000);
      })
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [sessionId]);

  return { data, highlight };
}
