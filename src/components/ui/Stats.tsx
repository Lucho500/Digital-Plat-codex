import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

const Stats: React.FC<StatProps> = ({
  title,
  value,
  change,
  icon,
  variant = 'default'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-br from-primary to-primary-light text-white';
      case 'success':
        return 'bg-gradient-to-br from-success to-success/80 text-white';
      case 'warning':
        return 'bg-gradient-to-br from-warning to-warning/80 text-white';
      case 'error':
        return 'bg-gradient-to-br from-error to-error/80 text-white';
      default:
        return 'bg-white';
    }
  };

  const getChangeColor = () => {
    if (variant !== 'default') return 'text-white/90';
    return change?.type === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className={`rounded-lg p-6 ${getVariantClasses()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === 'default' ? 'text-gray-500' : 'text-white/80'}`}>
            {title}
          </p>
          <h3 className={`text-2xl font-semibold mt-1 ${variant === 'default' ? 'text-gray-900' : 'text-white'}`}>
            {value}
          </h3>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${getChangeColor()}`}>
              {change.type === 'increase' ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>
                {change.value}%
                {change.period && ` vs ${change.period}`}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-full ${
            variant === 'default' 
              ? 'bg-primary/10 text-primary' 
              : 'bg-white/10 text-white'
          } flex items-center justify-center`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;