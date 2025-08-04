import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';

const webhookRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/stripe/webhook', async (request, reply) => {
    const event = request.body as any;
    const session = event?.data?.object;
    const sessionId = session?.metadata?.sessionId;
    const slotId = session?.metadata?.slotId;
    if (event.type === 'checkout.session.completed') {
      await supabase
        .from('advisory_sessions')
        .update({ status: 'confirmed' })
        .eq('id', sessionId);
    } else if (event.type === 'checkout.session.expired') {
      await supabase
        .from('advisory_sessions')
        .update({ status: 'cancelled' })
        .eq('id', sessionId);
      if (slotId) {
        await supabase
          .from('advisor_slots')
          .update({ is_booked: false })
          .eq('id', slotId);
      }
    }
    reply.send({ received: true });
  });
};

export default webhookRoute;
