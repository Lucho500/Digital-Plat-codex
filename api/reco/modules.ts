import { FastifyPluginAsync } from 'fastify';
import { getRuleScores, RULE_WEIGHT } from '../../src/reco/rules';
import { predict, MODEL_WEIGHT } from '../../src/reco/model';
import { logRecoEvent } from '../../src/lib/hooks/useAnalytics';

interface Query {
  accountId?: string;
  sector: string;
  size: string;
  invoiceVolume?: number;
  sessions7d?: number;
}

function decodeToken(auth?: string) {
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    const payload = JSON.parse(Buffer.from(auth.slice(7), 'base64').toString());
    return payload;
  } catch {
    return null;
  }
}

const recoRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/reco/modules', async (request, reply) => {
    const user = decodeToken(request.headers.authorization as string);
    if (!user || !['user', 'admin'].includes(user.role)) {
      reply.code(401).send({ error: 'Unauthorized' });
      return;
    }

    const query = request.query as Query;
    const ruleScores = getRuleScores(query.sector, query.size);
    const mlScores = predict({
      sector: query.sector,
      size: query.size,
      invoiceVolume: Number(query.invoiceVolume || 0),
      sessions7d: Number(query.sessions7d || 0)
    });

    const modules = new Set([
      ...Object.keys(ruleScores),
      ...Object.keys(mlScores)
    ]);

    const results = Array.from(modules)
      .map((moduleId) => {
        const ruleScore = ruleScores[moduleId] ? 1 : 0;
        const mlScore = mlScores[moduleId] ?? 1;
        return {
          moduleId,
          score: RULE_WEIGHT * ruleScore + MODEL_WEIGHT * mlScore
        };
      })
      .filter((r) => r.score > 0.6)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    await logRecoEvent('recoServed', {
      moduleIds: results.map((r) => r.moduleId),
      accountId: query.accountId || null
    });

    reply.send(results);
  });
};

export default recoRoute;
