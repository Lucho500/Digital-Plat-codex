import { FastifyPluginAsync } from 'fastify';
import { predictCash } from '../../src/lib/cashPredictor';
import { applyScenario, ScenarioParams, ForecastMonth } from '../../src/lib/whatif';

interface WhatIfBody extends ScenarioParams {
  accountId: string;
}

const cache = new Map<string, any>();

const whatIfRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/cfo/whatif', async (request, reply) => {
    const body = request.body as WhatIfBody;
    const key = JSON.stringify(body);
    if (cache.has(key)) {
      const cached = cache.get(key);
      // refresh LRU order
      cache.delete(key);
      cache.set(key, cached);
      reply.send(cached);
      return;
    }

    const baseForecast = (await predictCash(body.accountId)) as ForecastMonth[];
    const result = applyScenario(baseForecast, body);

    cache.set(key, result);
    if (cache.size > 10) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    reply.send(result);
  });
};

export default whatIfRoute;
