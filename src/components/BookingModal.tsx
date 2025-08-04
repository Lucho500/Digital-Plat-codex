import React, { useState } from 'react';
import Calendar from '../lib/react-calendar';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName: string;
}

const price = Number(import.meta.env.VITE_ADVISORY_PRICE_EUR || 120);

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, expertName }) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={expertName}>
      {step === 1 && (
        <div className="space-y-4">
          <Calendar onChange={(val: any) => setDate(val as Date)} value={date} />
          <Button onClick={() => date && setStep(2)} disabled={!date} variant="primary">
            Continuer
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <p>Créneau sélectionné : {date?.toLocaleString()}</p>
          <Button variant="primary">Payer {price} € HT</Button>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;
