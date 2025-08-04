import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';

const checkoutRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/advisory/checkout', async (request, reply) => {
    const { sessionId, slotId } = request.body as {
      sessionId: string;
      slotId: string;
    };
    const amount = Number(process.env.ADVISORY_PRICE_EUR || 120);
    const checkoutUrl = `https://stripe.example/checkout/${sessionId}`;
    await supabase
      .from('advisor_slots')
      .update({ is_booked: true })
      .eq('id', slotId);
    await supabase
      .from('advisory_sessions')
      .update({ status: 'payment_pending' })
      .eq('id', sessionId);
    reply.send({ checkoutUrl, amount });
  });
};

export default checkoutRoute;
