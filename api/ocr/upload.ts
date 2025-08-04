import { FastifyPluginAsync } from 'fastify';
import multipart from '@fastify/multipart';
import { supabase } from '../../src/lib/supabase';

const uploadRoute: FastifyPluginAsync = async (fastify) => {
  fastify.register(multipart);
  fastify.post('/api/ocr/upload', async (request, reply) => {
    reply.header('Content-Security-Policy', "default-src 'none';");
    const data = await request.file();
    const token = (request.body as any)?.sessionToken || (request.query as any)?.sessionToken;
    if (!data || !token) {
      reply.code(400).send({ error: 'Missing data' });
      return;
    }
    const buffer = await data.toBuffer();
    await supabase.storage
      .from('ocr-temp')
      .upload(`${token}/${data.filename}`, buffer, {
        contentType: data.mimetype,
        upsert: true
      });
    reply.send({ ok: true });
  });
};

export default uploadRoute;
