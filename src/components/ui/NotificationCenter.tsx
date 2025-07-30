import React, { useState } from 'react';
import { X, Bell, CheckCircle, AlertTriangle, InfoIcon } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Clôture mensuelle',
      message: 'La clôture de Juin est prête à être finalisée.',
      type: 'info',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      title: 'Paiement des salaires',
      message: 'Les salaires ont été virés avec succès.',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: '3',
      title: 'Déclaration TVA',
      message: 'Votre déclaration TVA doit être soumise avant le 15/07.',
      type: 'warning',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ]);

  const getIconLabel = (type: string) => {
    switch (type) {
      case 'info':
        return 'Information notification';
      case 'success':
        return 'Success notification';
      case 'warning':
        return 'Warning notification';
      case 'error':
        return 'Error notification';
      default:
        return 'Information notification';
    }
  };

  const getIcon = (type: string) => {
    let icon;
    switch (type) {
      case 'info':
        icon = <InfoIcon size={18} className="text-primary" />;
        break;
      case 'success':
        icon = <CheckCircle size={18} className="text-success" />;
        break;
      case 'warning':
        icon = <AlertTriangle size={18} className="text-warning" />;
        break;
      case 'error':
        icon = <AlertTriangle size={18} className="text-error" />;
        break;
      default:
        icon = <InfoIcon size={18} className="text-primary" />;
    }
    return <span role="img" aria-label={getIconLabel(type)}>{icon}</span>;
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffMins < 1440) {
      return `${Math.round(diffMins / 60)}h`;
    } else {
      return `${Math.round(diffMins / 1440)}j`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      <div 
        className={`fixed top-16 right-0 w-80 sm:w-96 bg-white shadow-lg border-l border-gray-200 h-[calc(100vh-4rem)] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-medium text-lg">Notifications</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary-light"
            >
              Tout marquer comme lu
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close notifications"
            >
              <span className="sr-only">Close</span>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-full pb-16">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bell size={48} className="mb-3 opacity-20" aria-hidden="true" />
              <p>Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        <div className="flex items-center ml-2">
                          <span className="text-xs text-gray-500">
                            {formatTime(notification.timestamp)}
                          </span>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="ml-2 text-gray-400 hover:text-gray-600"
                            aria-label="Delete notification"
                          >
                            <span className="sr-only">Delete</span>
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 pr-6">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {!isOpen && unreadCount > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-6 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary-light transition-colors z-30"
          aria-label="Open notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs text-white">
            {unreadCount}
          </span>
        </button>
      )}
    </>
  );
};

export default NotificationCenter;