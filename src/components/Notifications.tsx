import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { useNotifications } from '../lib/hooks/useNotifications';

interface Props {
  accountId: string;
}

const Notifications: React.FC<Props> = ({ accountId }) => {
  const notifications = useNotifications(accountId);
  const [isOpen, setOpen] = useState(false);
  const current = notifications[0];

  return (
    <>
      <button
        aria-label="Notifications"
        className="relative"
        onClick={() => setOpen(true)}
      >
        <Bell />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
            {notifications.length}
          </span>
        )}
      </button>
      {current && (
        <Modal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          title="Notification"
          footer={
            current.payload?.cta ? (
              <Button asChild>
                <a
                  href={current.payload.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ouvrir
                </a>
              </Button>
            ) : null
          }
        >
          <p>{current.payload?.message || ''}</p>
        </Modal>
      )}
    </>
  );
};

export default Notifications;
