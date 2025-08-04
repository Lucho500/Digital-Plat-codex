import { supabase } from '../supabase';

export interface QrKpiResponse {
  ttfv_ms: number;
  ttfv_sparkline: number[];
  drop_off: number;
  adoption_qr: number;
  adoption_classic: number;
  parsing_success: number;
}

export async function fetchQrKpi() {
  const { data, error } = await supabase.rpc('get_qr_kpi');
  if (error) throw error;
  return (data as QrKpiResponse[])[0];
}
