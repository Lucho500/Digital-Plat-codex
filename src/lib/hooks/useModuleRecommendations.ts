import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Database } from '../database.types';
import moduleMapping from '../../config/module-mapping';
import { useFeatureFlag } from './useFeatureFlag';

export interface CompanyData {
  sector: string;
  size: string;
}

export type Expert = Database['public']['Tables']['experts']['Row'];

interface Options {
  accountId?: string;
  invoiceVolume?: number;
  sessions7d?: number;
}

export function useModuleRecommendations(
  companyData: CompanyData,
  opts: Options = {}
) {
  const { enabled } = useFeatureFlag('upsellRecoV1');
  const [expert, setExpert] = useState<Expert | null>(null);
  const [modules, setModules] = useState<string[]>(
    moduleMapping[companyData.sector] || []
  );

  useEffect(() => {
    let cancelled = false;

    if (enabled) {
      const params = new URLSearchParams({
        accountId: opts.accountId || '',
        sector: companyData.sector,
        size: companyData.size,
        invoiceVolume: String(opts.invoiceVolume ?? 0),
        sessions7d: String(opts.sessions7d ?? 0)
      });

      fetch(`/api/reco/modules?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${btoa(JSON.stringify({ role: 'user' }))}`
        }
      })
        .then((r) => r.json())
        .then((data) => {
          if (!cancelled) {
            setModules(data.map((d: any) => d.moduleId));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setModules(moduleMapping[companyData.sector] || []);
          }
        });
    } else {
      setModules(moduleMapping[companyData.sector] || []);
    }

    return () => {
      cancelled = true;
    };
  }, [
    companyData.sector,
    companyData.size,
    enabled,
    opts.accountId,
    opts.invoiceVolume,
    opts.sessions7d
  ]);

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
