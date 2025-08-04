import { readFileSync } from 'fs';
import { resolve } from 'path';
import mjml2html from '@mjml/core';

export type TemplateName =
  | 'day1_recap'
  | 'day7_trial_end'
  | 'day7_new_suggestions';

export function renderEmail(
  template: TemplateName,
  variables: Record<string, string>
) {
  const file = resolve('emails/templates', `${template}.mjml`);
  let mjml = readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(variables)) {
    mjml = mjml.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  const { html } = mjml2html(mjml);
  return html;
}
