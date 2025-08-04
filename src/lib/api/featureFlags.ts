import { supabase } from '../supabase';

export async function toggleFeature(flagId: string) {
  return supabase.rpc('toggle_feature', { flag_id: flagId });
}
