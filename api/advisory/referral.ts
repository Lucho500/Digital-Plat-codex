import { FastifyPluginAsync } from 'fastify';
import { randomUUID } from 'crypto';
import { supabase } from '../../src/lib/supabase';

interface ReferralBody {
  accountId: string;
  topic: string;
  preferredTimeSlots: string[];
}

function decodeToken(auth?: string) {
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return JSON.parse(Buffer.from(auth.slice(7), 'base64').toString());
  } catch {
    return null;
  }
}

const referralRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/advisory/referral', async (request, reply) => {
    const user = decodeToken(request.headers.authorization as string);
    const { accountId, topic } = request.body as ReferralBody;
    if (!user || user.role !== 'expert' || user.accountId !== accountId) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const { data: allSpecs } = await supabase.from('specialists').select('*');
    const specialist = (allSpecs || [])
      .filter((s: any) => s.sectors.includes(topic))
      .filter((s: any) => s.current_load < s.max_load)
      .sort((a: any, b: any) => a.current_load - b.current_load)[0];

    if (!specialist) {
      reply.code(404).send({ error: 'No specialist available' });
      return;
    }

    const session = {
      id: randomUUID(),
      account_id: accountId,
      expert_id: user.id,
      specialist_id: specialist.id,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    await supabase.from('advisory_sessions').insert(session);
    await supabase
      .from('specialists')
      .update({ current_load: specialist.current_load + 1 })
      .eq('id', specialist.id);

    reply.send({ sessionId: session.id, specialistId: specialist.id });
  });
};

export default referralRoute;
