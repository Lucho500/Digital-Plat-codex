import React, { useEffect, useState, useCallback } from 'react';
import Button from '../ui/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Buffer } from 'buffer';

const QR_DURATION = 10 * 60 * 1000; // 10 minutes
const QR_API = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=';

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60).toString().padStart(2, '0');
  const seconds = (total % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const QRScanStep: React.FC = () => {
  const { user } = useAuthContext();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QR_DURATION);

  const generateSession = useCallback(async () => {
    const id = crypto.randomUUID();
    const now = Date.now();
    const exp = now + QR_DURATION;
    setSessionId(id);
    setExpiresAt(exp);
    setTimeLeft(QR_DURATION);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ocrSessionId', id);
    }
    const createdAt = new Date(now).toISOString();
    const expiresAtStr = new Date(exp).toISOString();
    await supabase.from('ocr_sessions').insert({
      session_id: id,
      user_id: user?.id ?? '',
      created_at: createdAt,
      expires_at: expiresAtStr
    });
  }, [user]);

  useEffect(() => {
    generateSession();
  }, [generateSession]);

  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      setTimeLeft(expiresAt - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!sessionId) return null;
  const base = typeof window !== 'undefined' && window.btoa ? window.btoa(sessionId) : Buffer.from(sessionId).toString('base64');
  const encoded = base.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const scanUrl = `https://short.url/${encoded}`;
  const qrSrc = `${QR_API}${encodeURIComponent(scanUrl)}`;
  const expired = timeLeft <= 0;

  return (
    <div className="text-center">
      {!expired && (
        <>
          <img src={qrSrc} alt="QR Code" className="mx-auto" />
          <p className="mt-4 text-sm text-gray-600">
            Ce QR code expire dans {formatTime(timeLeft)}
          </p>
        </>
      )}
      {expired && (
        <>
          <p className="text-sm text-red-600 mb-2">QR code expiré</p>
          <Button variant="primary" onClick={generateSession}>
            Régénérer
          </Button>
        </>
      )}
    </div>
  );
};

export default QRScanStep;
