import { FastifyPluginAsync } from 'fastify';
import { supabase } from '../../src/lib/supabase';
import { ocrService } from './ocrService';

const parseRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/api/ocr/parse', async (request, reply) => {
    const { sessionId, fileUrl } = request.body as any;
    if (!sessionId || !fileUrl) {
      reply.code(400).send({ error: 'Missing data' });
      return;
    }

    const start = Date.now();
    const fileType = fileUrl.split('.').pop();
    await supabase.from('analytics_events').insert({
      event: 'ocrParseStarted',
      session_id: sessionId,
      file_type: fileType,
      timestamp: new Date().toISOString()
    });

    try {
      const parsed = await ocrService.parse(fileUrl);
      await supabase
        .from('ocr_sessions')
        .update({
          parsed_data: parsed,
          parsed_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      await supabase.from('analytics_events').insert({
        event: 'ocrParseSucceeded',
        duration_ms: Date.now() - start,
        parsed_fields_count: Object.values(parsed).filter(Boolean).length,
        timestamp: new Date().toISOString()
      });

      const channel = supabase.channel(`ocr_updates:${sessionId}`);
      await channel.subscribe();
      await channel.send({
        type: 'broadcast',
        event: 'ocrParsed',
        payload: parsed
      });
      await channel.unsubscribe();

      // remove file from storage
      await supabase.storage.from('ocr-temp').remove([fileUrl]);

      reply.send({ ok: true });
    } catch (err: any) {
      await supabase.from('analytics_events').insert({
        event: 'ocrParseFailed',
        error_type: err.message,
        timestamp: new Date().toISOString()
      });
      await supabase.storage.from('ocr-temp').remove([fileUrl]);
      reply.code(500).send({ error: 'OCR parse failed' });
    }
  });
};

export default parseRoute;
