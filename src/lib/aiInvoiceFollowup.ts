import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from './supabase';
import { openai } from './openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, '../../prompts/invoice_followup_prompt.txt');
const template = readFileSync(templatePath, 'utf-8');

export type Tone = 'courtois' | 'ferme' | 'humoristique';

export interface InvoiceInfo {
  id: string;
  amount: number;
  daysLate: number;
  historyScore: number;
}

export interface RelanceProfile {
  id: string;
  name: string;
  tone: Tone;
  min_days_late: number;
  max_days_late: number;
  payment_score_min: number;
}

export function buildFollowupPrompt(invoice: InvoiceInfo, tone: Tone) {
  const content = template
    .replace('{{invoice}}', JSON.stringify(invoice))
    .replace('{{tone}}', tone);

  return [
    {
      role: 'system',
      content: 'You are an assistant generating invoice follow-up messages.',
    },
    {
      role: 'user',
      content,
    },
  ];
}

export async function generateFollowup(invoice: InvoiceInfo, tone: Tone) {
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.7,
    messages: buildFollowupPrompt(invoice, tone),
  });
  return choices[0].message.content;
}

export function abTestTone(base: Tone, variant?: Tone, seed = Math.random()): Tone {
  if (!variant) return base;
  return seed < 0.5 ? base : variant;
}

export async function generateFollowupWithProfile(
  invoice: InvoiceInfo,
  options: { testTone?: Tone } = {}
) {
  const { data } = await supabase
    .from('relance_profiles')
    .select('tone')
    .lte('min_days_late', invoice.daysLate)
    .gte('max_days_late', invoice.daysLate)
    .lte('payment_score_min', invoice.historyScore)
    .order('min_days_late', { ascending: false })
    .limit(1);

  const profileTone = (data?.[0]?.tone as Tone) || 'courtois';
  const tone = abTestTone(profileTone, options.testTone);
  return generateFollowup(invoice, tone);
}
