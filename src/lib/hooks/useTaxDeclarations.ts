import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type TaxDeclaration = Database['public']['Tables']['tax_declarations']['Row'];

export function useTaxDeclarations(companyId: string | undefined) {
  return useSupabaseQuery<TaxDeclaration[]>(
    () => supabase
      .from('tax_declarations')
      .select('*')
      .eq('company_id', companyId)
      .order('due_date', { ascending: false }),
    [companyId]
  );
}