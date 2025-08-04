import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';

interface AcceptBody {
  sessionId: string;
  startAt: string;
}

async function generateMeetingLink(sessionId: string) {
  return `https://whereby.com/${sessionId}`;
}

const acceptRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/advisory/accept', async (request, reply) => {
    const { sessionId, startAt } = request.body as AcceptBody;
    const meetingUrl = await generateMeetingLink(sessionId);
    await supabase
      .from('advisory_sessions')
      .update({ status: 'scheduled', start_at: startAt, meeting_url: meetingUrl })
      .eq('id', sessionId);
    reply.send({ meetingUrl });
  });
};

export default acceptRoute;
