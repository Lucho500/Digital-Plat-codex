import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export interface InappNotification {
  id: string;
  account_id: string;
  type: string;
  payload: Record<string, any>;
  seen_at: string | null;
}

export function useNotifications(accountId: string | null) {
  const [notifications, setNotifications] = useState<InappNotification[]>([]);

  useEffect(() => {
    if (!accountId) return;
    supabase
      .from('inapp_notifications')
      .select('*')
      .eq('account_id', accountId)
      .is('seen_at', null)
      .then(({ data }) => {
        setNotifications((data as InappNotification[]) || []);
      });
  }, [accountId]);

  return notifications;
}
