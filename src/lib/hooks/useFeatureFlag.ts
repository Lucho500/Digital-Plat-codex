import { useEffect, useState } from 'react';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { value: boolean; timestamp: number }>();

export function useFeatureFlag(flagId: string) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const now = Date.now();
        const cached = cache.get(flagId);
        if (cached && now - cached.timestamp < CACHE_DURATION) {
          setEnabled(cached.value);
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from('feature_flags')
          .select('is_enabled')
          .eq('id', flagId)
          .single();
        if (error) throw error;
        const val = !!data?.is_enabled;
        cache.set(flagId, { value: val, timestamp: now });
        if (mounted) setEnabled(val);
        setError(null);
      } catch (err) {
        setError(err as PostgrestError);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [flagId]);

  return { enabled, loading, error };
}
