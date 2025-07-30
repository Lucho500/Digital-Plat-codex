import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  description
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-4';
      case 'lg':
        return 'w-14 h-7';
      default:
        return 'w-11 h-6';
    }
  };

  const getThumbSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'lg':
        return 'h-6 w-6';
      default:
        return 'h-5 w-5';
    }
  };

  const getTranslateClass = () => {
    switch (size) {
      case 'sm':
        return 'translate-x-4';
      case 'lg':
        return 'translate-x-7';
      default:
        return 'translate-x-5';
    }
  };

  return (
    <label className={`inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`
            ${getSizeClasses()}
            ${checked ? 'bg-primary' : 'bg-gray-200'}
            ${disabled ? 'opacity-50' : ''}
            relative rounded-full transition-colors duration-200 ease-in-out
          `}
        >
          <div
            className={`
              ${getThumbSizeClasses()}
              ${checked ? getTranslateClass() : 'translate-x-0.5'}
              absolute top-0.5 left-0 bg-white rounded-full transition-transform duration-200 ease-in-out
              ${disabled ? '' : 'shadow-sm'}
            `}
          />
        </div>
      </div>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <div className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
              {label}
            </div>
          )}
          {description && (
            <div className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
};

export default Switch;