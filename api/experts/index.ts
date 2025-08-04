import { FastifyPluginAsync } from 'fastify';

interface ExpertResponse {
  id: string;
  name: string;
  speciality: string;
  avatarUrl: string;
  online: boolean;
  npsScore: number;
}

const expertsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/api/experts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const expert: ExpertResponse = {
      id,
      name: 'Julie Bernard',
      speciality: 'Fiscalité PME',
      avatarUrl: 'https://placekitten.com/200/200',
      online: true,
      npsScore: 87
    };
    reply.send(expert);
  });
};

export default expertsRoute;
