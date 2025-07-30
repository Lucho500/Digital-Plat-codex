import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Employee = Database['public']['Tables']['employees']['Row'];

export function useEmployees(companyId: string | undefined) {
  return useSupabaseQuery<Employee[]>(
    () => supabase
      .from('employees')
      .select('*')
      .eq('company_id', companyId)
      .order('last_name'),
    [companyId]
  );
}