import React, { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSessionValidation } from '../lib/hooks/useSessionValidation';
import { useFileUpload } from '../lib/hooks/useFileUpload';
import { useFeatureFlag } from '../lib/hooks/useFeatureFlag';

const QrUploadPage: React.FC = () => {
  const { sessionToken = '' } = useParams();
  const status = useSessionValidation(sessionToken);
  const { file, previewUrl, progress, error, selectFile, upload } = useFileUpload();
  const inputRef = useRef<HTMLInputElement>(null);
  const { enabled, loading } = useFeatureFlag('onboardingQR');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) selectFile(f);
  };

  if (loading) return <p className="p-4">Chargement...</p>;
  if (!enabled) return <Navigate to="/onboarding/tax" />;
  if (status === 'loading') return <p className="p-4">Validation...</p>;
  if (status === 'invalid')
    return <p className="p-4">QR expiré, régénérez depuis votre ordinateur</p>;

  return (
    <div className="max-w-sm mx-auto p-4">
      <p className="mb-4 text-sm">
        Vos documents ne sont conservés que le temps de l’analyse (max 30 min).
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.png,.pdf"
        className="mb-4"
        onChange={handleFileChange}
      />
      {previewUrl && (
        file?.type === 'application/pdf' ? (
          <div className="mb-4">
            <span className="text-sm">{file.name}</span>
          </div>
        ) : (
          <img
            src={previewUrl}
            alt="preview"
            className="h-32 mb-4 object-cover"
          />
        )
      )}
      {progress > 0 && (
        <div className="w-full bg-gray-200 h-2 rounded mb-4">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={() => upload(sessionToken)} disabled={!file}>
        Envoyer
      </Button>
      <Button
        variant="secondary"
        className="ml-2"
        onClick={() => inputRef.current?.click()}
      >
        Choisir un fichier existant
      </Button>
    </div>
  );
};

export default QrUploadPage;
