import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'success':
        return 'bg-success/10 text-success';
      case 'warning':
        return 'bg-warning/10 text-warning';
      case 'error':
        return 'bg-error/10 text-error';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSizeClasses = () => {
    return size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-0.5';
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${getVariantClasses()}
      ${getSizeClasses()}
    `}>
      {dot && (
        <span className={`
          w-1.5 h-1.5 rounded-full mr-1.5
          ${variant === 'default' ? 'bg-gray-400' : `bg-${variant}`}
        `}></span>
      )}
      {children}
    </span>
  );
};

export default Badge;