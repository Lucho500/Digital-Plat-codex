import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { openai } from '@/lib/openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, '../../prompts/journal_entry_prompt.txt');
const template = readFileSync(templatePath, 'utf-8');

export function buildPrompt(payload: {
  invoice: unknown;
  rules: unknown;
  examples?: unknown;
}) {
  const content = template
    .replace('{{invoice}}', JSON.stringify(payload.invoice))
    .replace('{{rules}}', JSON.stringify(payload.rules))
    .replace('{{examples}}', JSON.stringify(payload.examples ?? []));

  return [
    {
      role: 'system',
      content: 'You are an expert accounting assistant generating journal entries.',
    },
    {
      role: 'user',
      content,
    },
  ];
}

export async function generateEntry(payload: {
  invoice: unknown;
  rules: unknown;
  examples?: unknown;
}) {
  const { choices } = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    messages: buildPrompt(payload),
  });
  return JSON.parse(choices[0].message.content);
}
