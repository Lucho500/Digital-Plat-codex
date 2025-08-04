export interface OcrParsedData {
  name: string;
  siren: string;
  address: string;
  sector: string;
}

const OCR_SERVICE_URL = process.env.OCR_SERVICE_URL || 'http://ocr-service:3000/parse';

export const ocrService = {
  async parse(fileUrl: string): Promise<OcrParsedData> {
    const res = await fetch(OCR_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl })
    });
    if (!res.ok) {
      throw new Error('OCR service error');
    }
    const json = await res.json();
    return json as OcrParsedData;
  }
};
