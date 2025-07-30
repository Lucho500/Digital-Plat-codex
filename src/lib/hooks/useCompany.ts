import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Company = Database['public']['Tables']['companies']['Row'];

export function useCompany(userId: string | undefined) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchCompany() {
      try {
        // First get the user's company_id
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('company_id')
          .eq('id', userId)
          .single();

        if (userError) throw userError;
        if (!userData?.company_id) {
          setCompany(null);
          setLoading(false);
          return;
        }

        // Then fetch the company details
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', userData.company_id)
          .single();

        if (companyError) throw companyError;
        setCompany(companyData);
      } catch (error) {
        console.error('Error fetching company:', error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCompany();
  }, [userId]);

  return {
    company,
    loading,
  };
}