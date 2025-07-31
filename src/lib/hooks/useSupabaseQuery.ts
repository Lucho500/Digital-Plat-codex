import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { PostgrestError } from '@supabase/supabase-js';
import { useToast } from '../../contexts/ToastContext';

export function useSupabaseQuery<T>(
  query: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  deps: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data, error } = await query();
        if (error) throw error;
        setData(data);
        setError(null);
        addToast('Données chargées', 'success');
      } catch (err) {
        setError(err as PostgrestError);
        setData(null);
        addToast('Erreur lors du chargement des données', 'warning');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, deps);

  return {
    data,
    error,
    loading,
  };
}