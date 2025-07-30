import { useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../supabase';
import type { Database } from '../database.types';

type SupplierInvoice = Database['public']['Tables']['supplier_invoices']['Row'];

export function useSupplierInvoices(companyId: string | undefined) {
  return useSupabaseQuery<SupplierInvoice[]>(
    () => supabase
      .from('supplier_invoices')
      .select(`
        *,
        supplier:suppliers (
          name,
          legal_name,
          email
        )
      `)
      .eq('company_id', companyId)
      .order('date', { ascending: false }),
    [companyId]
  );
}