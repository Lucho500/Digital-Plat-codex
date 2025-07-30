import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  align?: 'left' | 'right';
  width?: 'auto' | 'full';
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  value,
  onChange,
  align = 'left',
  width = 'auto'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (itemValue: string) => {
    onChange?.(itemValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`
            absolute z-10 mt-2 bg-white rounded-md shadow-lg border border-gray-100
            ${align === 'right' ? 'right-0' : 'left-0'}
            ${width === 'full' ? 'w-full min-w-[200px]' : 'min-w-[200px]'}
          `}
        >
          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.value}
                className={`
                  w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center
                  ${value === item.value ? 'text-primary bg-primary/5' : 'text-gray-700'}
                `}
                onClick={() => handleSelect(item.value)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;