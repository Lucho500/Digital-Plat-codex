import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Rechercher...',
  value: externalValue,
  onChange,
  onSearch,
  className = '',
  autoFocus = false,
  size = 'md',
  disabled = false
}) => {
  const [value, setValue] = useState(externalValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  const handleClear = () => {
    setValue('');
    onChange?.('');
    onSearch?.('');
    inputRef.current?.focus();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 text-sm pl-8 pr-8';
      case 'lg':
        return 'h-12 text-lg pl-12 pr-12';
      default:
        return 'h-10 text-base pl-10 pr-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        className={`
          w-full rounded-md border border-gray-300 bg-white
          focus:border-primary focus:ring-1 focus:ring-primary
          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
          ${getSizeClasses()}
        `}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={placeholder}
      />
      
      <Search 
        size={getIconSize()} 
        className={`
          absolute text-gray-400 top-1/2 transform -translate-y-1/2
          ${size === 'sm' ? 'left-2' : size === 'lg' ? 'left-4' : 'left-3'}
          ${disabled ? 'text-gray-300' : ''}
        `}
      />
      
      {value && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={`
            absolute top-1/2 transform -translate-y-1/2
            text-gray-400 hover:text-gray-600 transition-colors
            ${size === 'sm' ? 'right-2' : size === 'lg' ? 'right-4' : 'right-3'}
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
          `}
          aria-label="Effacer la recherche"
        >
          <X size={getIconSize()} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;