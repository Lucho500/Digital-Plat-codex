import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Invoice = Database['public']['Tables']['invoices']['Row'];

export function useInvoices(companyId: string | undefined) {
  return useSupabaseQuery<Invoice[]>(
    () => supabase
      .from('invoices')
      .select('*')
      .eq('company_id', companyId)
      .order('date', { ascending: false }),
    [companyId]
  );
}