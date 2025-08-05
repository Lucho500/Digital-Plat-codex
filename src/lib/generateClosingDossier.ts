/**
 * Service generating a closing dossier PDF and uploading it for archiving.
 *
 * The implementation follows the sprint P4 specification:
 * 1. Render the Nunjucks templates to HTML.
 * 2. Convert the HTML to PDF using WeasyPrint (Docker).
 * 3. Merge annexes into the main PDF using pdf-lib.
 * 4. Upload the document to S3 under `closing-docs/{accountId}/{period}/`.
 * 5. Trigger the e-signature workflow (Skribble).
 *
 * The heavy lifting (template rendering, PDF generation, merging, uploading
 * and signature requests) is left as TODOs so the code base can compile until
 * the corresponding services are wired.
 */

export async function generateClosingDossier(accountId: string, period: string) {
  // 1. Collect templates (Nunjucks ➜ HTML)
  const html = await renderTemplate('closing_dossier.njk', { accountId, period });
  // 2. Convert HTML ➜ PDF
  const pdfBuffer = await generatePdf(html); // WeasyPrint via Docker
  // 3. Merge annexes (pdf-lib)
  const merged = await mergeWithAnnexes(pdfBuffer, accountId, period);
  // 4. Upload to S3 `closing-docs/{accountId}/{period}/dossier.pdf`
  const url = await uploadPdf(merged, accountId, period);
  // 5. Request e-signature via Skribble
  const signedUrl = await requestSignature(url, accountId, period);
  return signedUrl;
}

async function renderTemplate(
  template: string,
  context: Record<string, unknown>
): Promise<string> {
  // TODO: use Nunjucks to render the HTML template
  return '';
}

async function generatePdf(html: string): Promise<Buffer> {
  // TODO: launch WeasyPrint in Docker to convert HTML to PDF
  return Buffer.from('');
}

async function mergeWithAnnexes(
  pdfBuffer: Buffer,
  accountId: string,
  period: string
): Promise<Buffer> {
  // TODO: merge the generated PDF with annex files using pdf-lib
  return pdfBuffer;
}

async function uploadPdf(
  buffer: Buffer,
  accountId: string,
  period: string
): Promise<string> {
  // TODO: upload the PDF to S3 and return the file URL
  return `closing-docs/${accountId}/${period}/dossier.pdf`;
}

async function requestSignature(
  url: string,
  accountId: string,
  period: string
): Promise<string> {
  // TODO: integrate with Skribble to request e-signatures
  return url;
}

