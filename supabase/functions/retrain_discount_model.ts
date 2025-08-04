import { createClient } from '@supabase/supabase-js';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, serviceKey);

Deno.serve(async () => {
  const since = new Date();
  since.setDate(since.getDate() - 60);
  const { data, error } = await supabase
    .from('bundle_metrics')
    .select('*')
    .gte('created_at', since.toISOString());
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  const rows = data || [];
  if (rows.length) {
    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];
    for (const row of rows) {
      csvLines.push(headers.map(h => JSON.stringify((row as any)[h] ?? '')).join(','));
    }
    await Deno.writeTextFile('/tmp/data.csv', csvLines.join('\n'));
  }

  const cmd = new Deno.Command('docker', {
    args: ['run', '--rm', '-v', '/tmp:/tmp', 'ml-discount-trainer']
  });
  const { code, stderr } = await cmd.output();
  if (code !== 0) {
    return new Response(new TextDecoder().decode(stderr), { status: 500 });
  }

  const today = new Date().toISOString().split('T')[0];
  const folder = `discount/${today}`;
  const model = await Deno.readFile('/tmp/model.pkl');
  await supabase.storage
    .from('ml-models')
    .upload(`${folder}/model.pkl`, model, { contentType: 'application/octet-stream', upsert: true });
  const metricsText = await Deno.readTextFile('/tmp/metrics.json');
  await supabase.storage
    .from('ml-models')
    .upload(`${folder}/metrics.json`, new TextEncoder().encode(metricsText), { contentType: 'application/json', upsert: true });

  const metrics = JSON.parse(metricsText);
  await supabase.from('model_versions').insert({
    path: `${folder}/model.pkl`,
    auc: metrics.auc,
    rev_sim: metrics.revSim
  });

  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
