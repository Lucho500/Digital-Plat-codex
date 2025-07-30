import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className = '',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 text-sm';
      case 'lg':
        return 'py-3 text-lg';
      default:
        return 'py-2';
    }
  };

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className={`
          w-full px-4 ${getSizeClasses()}
          bg-white border rounded-md text-left
          focus:outline-none focus:ring-2 focus:ring-primary/50
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-error' : 'border-gray-300'}
          ${disabled ? '' : 'hover:border-primary'}
          ${className}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <span className={!selectedOption ? 'text-gray-400' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`
                    w-full px-4 py-2 text-left flex items-center
                    ${option.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-gray-50'
                    }
                    ${option.value === value ? 'bg-primary/5 text-primary' : ''}
                  `}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange?.(option.value);
                      setIsOpen(false);
                    }
                  }}
                  disabled={option.disabled}
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>
                  {option.value === value && (
                    <Check size={16} className="text-primary" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Select;