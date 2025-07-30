import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-light focus:ring-primary/50';
      case 'secondary':
        return 'bg-white text-primary border border-primary hover:bg-gray-50 focus:ring-primary/30';
      case 'accent':
        return 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50';
      case 'success':
        return 'bg-success text-white hover:bg-success/90 focus:ring-success/50';
      case 'warning':
        return 'bg-warning text-white hover:bg-warning/90 focus:ring-warning/50';
      case 'error':
        return 'bg-error text-white hover:bg-error/90 focus:ring-error/50';
      case 'text':
        return 'bg-transparent text-primary hover:bg-gray-100 focus:ring-primary/30';
      default:
        return 'bg-primary text-white hover:bg-primary-light focus:ring-primary/50';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;