import { FastifyPluginAsync } from 'fastify';

interface ForecastPoint {
  month: string;
  forecast: number;
  actual: number;
  balance: number;
}

const forecastRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/cfo/forecast', async (_request, reply) => {
    const data: ForecastPoint[] = Array.from({ length: 12 }, (_, i) => ({
      month: `M${i + 1}`,
      forecast: Math.round(Math.random() * 10000),
      actual: Math.round(Math.random() * 10000),
      balance: Math.round(Math.random() * 10000)
    }));
    reply.send(data);
  });
};

export default forecastRoute;
