import { supabase } from './supabase';

export interface CashHistory {
  account_id: string;
  date: string;
  inflow: number;
  outflow: number;
  balance: number;
}

export async function getCashSeries(accountId: string, months: number): Promise<CashHistory[]> {
  const { data, error } = await supabase
    .from<CashHistory>('cash_history' as any)
    .select('*')
    .eq('account_id', accountId)
    .order('date', { ascending: true })
    .limit(months);

  if (error) {
    throw error;
  }
  return data ?? [];
}

export const db = { getCashSeries };
