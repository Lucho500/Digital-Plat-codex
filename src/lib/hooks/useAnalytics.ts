import { supabase } from '../supabase';

export async function logOnboardingEvent(
  event:
    | 'stepStarted'
    | 'stepCompleted'
    | 'onboardingCompleted'
    | 'modulesSuggested'
    | 'expertSuggested'
    | 'modulesSkipped'
    | 'progressSaved'
    | 'progressResumed'
    | 'progressDiscarded',
  payload: { stepId?: number; userId?: string | null; [key: string]: any }
) {
  const { stepId, userId, ...rest } = payload;
  await supabase.from('analytics_events').insert({
    user_id: userId ?? null,
    step_id: stepId ?? null,
    event,
    timestamp: new Date().toISOString(),
    details: rest
  });
}

export async function logRecoEvent(
  event: 'recoServed' | 'recoClicked' | 'recoActivated',
  payload: { userId?: string | null; [key: string]: any }
) {
  const { userId, ...details } = payload;
  await supabase.from('analytics_events').insert({
    user_id: userId ?? null,
    event,
    timestamp: new Date().toISOString(),
    details
  });
}
