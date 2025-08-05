import { FastifyPluginAsync } from 'fastify';

interface PnlMonth {
  month: string;
  revenue: number;
  costs: number;
  ebitda: number;
}

const cache = new Map<string, { data: PnlMonth[]; expires: number }>();

const pnlRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/cfo/pnl', async (request, reply) => {
    const months = Number((request.query as any).months) || 12;
    const key = String(months);
    const now = Date.now();
    const cached = cache.get(key);
    if (cached && cached.expires > now) {
      return reply.send(cached.data);
    }

    const data: PnlMonth[] = Array.from({ length: months }, (_, i) => ({
      month: `M${i + 1}`,
      revenue: Math.round(Math.random() * 10000 + 20000),
      costs: Math.round(Math.random() * 8000 + 10000),
      ebitda: Math.round(Math.random() * 5000)
    }));
    cache.set(key, { data, expires: now + 5 * 60 * 1000 });
    reply.send(data);
  });
};

export default pnlRoute;
