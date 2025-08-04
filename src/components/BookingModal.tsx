import React from 'react';
import Modal from './ui/Modal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, expertName }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={expertName}>
    <p>{/** i18n key: advisor.bookingModal.placeholder */} Fonctionnalité à venir</p>
  </Modal>
);

export default BookingModal;
