import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Payroll = Database['public']['Tables']['payrolls']['Row'];

export function usePayrolls(companyId: string | undefined) {
  return useSupabaseQuery<Payroll[]>(
    () => supabase
      .from('payrolls')
      .select(`
        *,
        employee:employees (
          first_name,
          last_name
        )
      `)
      .eq('company_id', companyId)
      .order('period_end', { ascending: false }),
    [companyId]
  );
}