import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Database } from '../database.types';
import moduleMapping from '../../config/module-mapping';

export interface CompanyData {
  sector: string;
  size: string;
}

export type Expert = Database['public']['Tables']['experts']['Row'];

export function useModuleRecommendations(companyData: CompanyData) {
  const [expert, setExpert] = useState<Expert | null>(null);

  const modules = moduleMapping[companyData.sector] || [];

  useEffect(() => {
    let cancelled = false;

    async function fetchExpert() {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .contains('sectors', [companyData.sector])
        .gte('rating', 4.5)
        .order('rating', { ascending: false })
        .limit(1);

      if (!cancelled) {
        if (error) {
          console.error('Error fetching experts', error);
        }
        if (data && data.length > 0) {
          setExpert(data[0]);
        } else {
          const { data: generalist } = await supabase
            .from('experts')
            .select('*')
            .eq('name', 'généraliste')
            .limit(1);
          setExpert(generalist && generalist.length > 0 ? generalist[0] : null);
        }
      }
    }

    fetchExpert();
    return () => {
      cancelled = true;
    };
  }, [companyData.sector]);

  return { modules, expert };
}
