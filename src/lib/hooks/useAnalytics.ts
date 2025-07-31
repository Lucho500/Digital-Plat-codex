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
  payload: { stepId: number; userId: string | null }
) {
  await supabase.from('analytics_events').insert({
    user_id: payload.userId,
    step_id: payload.stepId,
    event,
    timestamp: new Date().toISOString()
  });
}
