import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';
import { logTrialEvent } from '../../src/lib/hooks/useAnalytics';
import { sendTrialStartedEmail } from '../../src/lib/hooks/useEmail';

interface TrialBody {
  accountId: string;
  moduleId: string;
}

const TRIAL_DAYS = Number(process.env.TRIAL_DAYS || 7);

const trialRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/subscription/trial-start', async (request, reply) => {
    const { accountId, moduleId } = request.body as TrialBody;
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id,status')
      .eq('accountId', accountId)
      .eq('moduleId', moduleId)
      .in('status', ['trial', 'active'])
      .maybeSingle();
    if (existing) {
      reply.code(409).send({ error: 'Module already active' });
      return;
    }
    const trialStart = new Date();
    const trialEnd = new Date(trialStart.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
    await supabase.from('subscriptions').insert({
      accountId,
      moduleId,
      status: 'trial',
      trialStart: trialStart.toISOString(),
      trialEnd: trialEnd.toISOString()
    });
    await logTrialEvent('trialStarted', { accountId, moduleId });
    await sendTrialStartedEmail(accountId, moduleId);
    reply.send({ status: 'trial', trialEnd: trialEnd.toISOString() });
  });

  fastify.post('/api/subscription/cancel-trial', async (request, reply) => {
    const { accountId, moduleId } = request.body as TrialBody;
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('accountId', accountId)
      .eq('moduleId', moduleId)
      .eq('status', 'trial');
    await logTrialEvent('trialCancelled', { accountId, moduleId });
    reply.send({ status: 'cancelled' });
  });
};

export default trialRoute;
