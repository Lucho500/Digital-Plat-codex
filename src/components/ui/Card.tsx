import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle, 
  children, 
  footer, 
  icon, 
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`card ${className} ${onClick ? 'cursor-pointer hover:shadow transition-shadow' : ''}`}
      onClick={onClick}
    >
      {(title || icon) && (
        <div className="flex items-start mb-4">
          {icon && <div className="mr-3 text-primary">{icon}</div>}
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
      )}
      
      <div className={`${title || icon ? '' : ''}`}>
        {children}
      </div>
      
      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  );
};

export { Card };
export default Card;