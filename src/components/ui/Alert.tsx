import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  icon
}) => {
  const getIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getStyles = () => {
    const baseStyles = 'rounded-lg p-4 flex items-start';
    switch (variant) {
      case 'success':
        return `${baseStyles} bg-success/5 border-l-4 border-success text-success`;
      case 'warning':
        return `${baseStyles} bg-warning/5 border-l-4 border-warning text-warning`;
      case 'error':
        return `${baseStyles} bg-error/5 border-l-4 border-error text-error`;
      default:
        return `${baseStyles} bg-primary/5 border-l-4 border-primary text-primary`;
    }
  };

  return (
    <div className={getStyles()}>
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium mb-1">{title}</h4>
        )}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-3 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
          <span className="sr-only">Dismiss</span>
        </button>
      )}
    </div>
  );
};

export default Alert;