import React from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface TrialModalProps {
  isOpen: boolean;
  moduleName: string;
  benefit: string;
  price: string;
  onActivate: () => void;
  onClose: () => void;
}

const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  moduleName,
  benefit,
  price,
  onActivate,
  onClose
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Essai gratuit 7 j"
    footer={
      <>
        <Button variant="primary" onClick={onActivate} className="mr-2">
          Activer l'essai gratuit
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
      </>
    }
  >
    <p className="font-medium mb-2">{moduleName}</p>
    <p className="mb-2">{benefit}</p>
    <p className="mb-2 text-sm text-gray-600">{price} / mois</p>
    <p className="text-xs text-gray-500">Annulable à tout moment</p>
  </Modal>
);

export default TrialModal;
