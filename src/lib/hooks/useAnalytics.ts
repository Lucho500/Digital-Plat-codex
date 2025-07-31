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
  await supabase.from('analytics_events').insert({
    user_id: payload.userId ?? null,
    step_id: payload.stepId ?? null,
    event,
    timestamp: new Date().toISOString(),
    ...payload
  });
}
