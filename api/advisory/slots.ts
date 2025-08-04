import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';

const slotsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/advisory/slots', async (request, reply) => {
    const { advisorId, days = '7' } = request.query as {
      advisorId?: string;
      days?: string;
    };
    if (!advisorId) {
      reply.code(400).send({ error: 'advisorId required' });
      return;
    }
    const daysNum = parseInt(days, 10);
    const now = new Date();
    const end = new Date(now.getTime() + daysNum * 24 * 60 * 60 * 1000);
    const { data, error } = await supabase
      .from('advisor_slots')
      .select('*')
      .eq('advisor_id', advisorId)
      .eq('is_booked', false)
      .gte('start_at', now.toISOString())
      .lt('start_at', end.toISOString())
      .order('start_at', { ascending: true });
    if (error) {
      reply.code(500).send({ error: error.message });
      return;
    }
    reply.send({ slots: data || [] });
  });
};

export default slotsRoute;
