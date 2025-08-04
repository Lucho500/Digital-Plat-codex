-- Bucket for temporary OCR uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('ocr-temp', 'ocr-temp', false)
ON CONFLICT (id) DO NOTHING;

-- Restrict objects to 30 minute lifetime
CREATE POLICY "Temp OCR access" ON storage.objects
  FOR ALL USING (bucket_id = 'ocr-temp' AND now() - created_at < interval '30 minutes')
  WITH CHECK (bucket_id = 'ocr-temp');
