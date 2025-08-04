import { supabase } from '../supabase';

export async function convertExpiredTrials(now = new Date()) {
  return await supabase
    .from('subscriptions')
    .update({ status: 'active', billingStart: now.toISOString() })
    .lt('trialEnd', now.toISOString())
    .eq('status', 'trial');
}
