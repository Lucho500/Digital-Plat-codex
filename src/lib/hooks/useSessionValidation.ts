import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export function useSessionValidation(sessionToken: string) {
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');

  useEffect(() => {
    let active = true;
    async function validate() {
      const { data } = await supabase
        .from('ocr_sessions')
        .select('expires_at')
        .eq('token', sessionToken)
        .single();

      if (!active) return;
      if (!data || new Date(data.expires_at) < new Date()) {
        setStatus('invalid');
      } else {
        setStatus('valid');
      }
    }
    validate();
    return () => {
      active = false;
    };
  }, [sessionToken]);

  return status;
}
