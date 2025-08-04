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
  event:
    | 'recoServed'
    | 'recoClicked'
    | 'recoActivated'
    | 'recoWidgetViewed'
    | 'recoWidgetClicked',
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

export async function logTrialEvent(
  event:
    | 'trialStarted'
    | 'trialCancelled'
    | 'trialConverted'
    | 'trialReminderEmailOpened',
  payload: { accountId?: string | null; [key: string]: any }
) {
  const { accountId, ...details } = payload;
  await supabase.from('analytics_events').insert({
    account_id: accountId ?? null,
    event,
    timestamp: new Date().toISOString(),
    details
  });
}

export async function logAdvisoryEvent(
  event: 'expertWidgetViewed' | 'expertPlanCallClicked' | 'expertMessageClicked',
  payload: { accountId?: string | null; expertId?: string; [key: string]: any }
) {
  const { accountId, ...details } = payload;
  await supabase.from('analytics_events').insert({
    account_id: accountId ?? null,
    event,
    timestamp: new Date().toISOString(),
    details
  });
}
