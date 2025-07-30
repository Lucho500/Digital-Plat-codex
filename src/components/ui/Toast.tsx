import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
    }
  };

  const getStyles = () => {
    const baseStyles = 'flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow';
    switch (type) {
      case 'success':
        return `${baseStyles} text-green-500 bg-green-50`;
      case 'error':
        return `${baseStyles} text-red-500 bg-red-50`;
      case 'warning':
        return `${baseStyles} text-yellow-500 bg-yellow-50`;
      case 'info':
        return `${baseStyles} text-blue-500 bg-blue-50`;
    }
  };

  return (
    <div className={getStyles()} role="alert">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8">
        {getIcon()}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 hover:bg-gray-100"
        onClick={() => onClose(id)}
      >
        <span className="sr-only">Close</span>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;