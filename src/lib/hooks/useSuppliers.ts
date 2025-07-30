import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Supplier = Database['public']['Tables']['suppliers']['Row'];

export function useSuppliers(companyId: string | undefined) {
  return useSupabaseQuery<Supplier[]>(
    () => supabase
      .from('suppliers')
      .select('*')
      .eq('company_id', companyId)
      .order('name'),
    [companyId]
  );
}