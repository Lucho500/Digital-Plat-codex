import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let OpenAI: any;
try {
  OpenAI = require('openai').default;
} catch {
  OpenAI = class {
    chat = { completions: { create: async () => { throw new Error('OpenAI SDK not installed'); } } };
  };
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
