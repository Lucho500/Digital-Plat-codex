import { useState } from 'react';
import { supabase } from '../supabase';

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const selectFile = (f: File) => {
    setError(null);
    if (f.size > 10 * 1024 * 1024) {
      setError('Taille max 10 MB');
      return;
    }
    if (
      !['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)
    ) {
      setError('Format non supporté');
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const upload = async (sessionToken: string) => {
    if (!file) return;
    setError(null);
    const endpoint =
      import.meta.env.NEXT_PUBLIC_OCR_ENDPOINT || '/api/ocr/upload';
    const start = Date.now();
    await supabase.from('analytics_events').insert({
      event: 'qrUploadStarted',
      session_id: sessionToken,
      file_type: file.type,
      file_size: file.size,
      timestamp: new Date().toISOString()
    });

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint);
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
      xhr.onload = async () => {
        setProgress(100);
        await supabase.from('analytics_events').insert({
          event: 'qrUploadCompleted',
          duration_ms: Date.now() - start,
          success: true,
          timestamp: new Date().toISOString()
        });
        resolve();
      };
      xhr.onerror = async () => {
        await supabase.from('analytics_events').insert({
          event: 'qrUploadError',
          error_type: 'network',
          timestamp: new Date().toISOString()
        });
        setError('Erreur réseau');
        reject(new Error('upload failed'));
      };
      const formData = new FormData();
      formData.append('sessionToken', sessionToken);
      formData.append('file', file);
      xhr.send(formData);
    });
  };

  return { file, previewUrl, progress, error, selectFile, upload };
}
