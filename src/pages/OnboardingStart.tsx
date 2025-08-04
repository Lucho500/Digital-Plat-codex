import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import QRScanStep from '../components/onboarding/QRScanStep';
import { useNavigate } from 'react-router-dom';

const OnboardingStart: React.FC = () => {
  const navigate = useNavigate();
  const showQR = import.meta.env.VITE_ONBOARDING_QR === 'true';

  return (
    <div className="flex justify-center mt-10">
      <Card className="text-center max-w-md">
        {showQR && (
          <>
            <p className="mb-4">
              Scannez ce QR code avec votre mobile pour envoyer automatiquement vos documents
            </p>
            <QRScanStep />
          </>
        )}
        <div className="mt-4">
          <Button variant="secondary" onClick={() => navigate('/documents')}>
            Télécharger manuellement mes documents
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingStart;
