import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  arrow?: boolean;
  closeOnClickOutside?: boolean;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  offset = 8,
  arrow = true,
  closeOnClickOutside = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        closeOnClickOutside &&
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickOutside]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return `bottom-full mb-${offset}`;
      case 'right':
        return `left-full ml-${offset}`;
      case 'left':
        return `right-full mr-${offset}`;
      default:
        return `top-full mt-${offset}`;
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-6px] border-t-white border-l-transparent border-r-transparent border-b-transparent';
      case 'right':
        return 'left-[-6px] border-r-white border-t-transparent border-b-transparent border-l-transparent';
      case 'left':
        return 'right-[-6px] border-l-white border-t-transparent border-b-transparent border-r-transparent';
      default:
        return 'top-[-6px] border-b-white border-l-transparent border-r-transparent border-t-transparent';
    }
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`
            absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200
            ${getPositionClasses()}
          `}
        >
          {arrow && (
            <div
              className={`
                absolute w-3 h-3 transform rotate-45 border
                ${getArrowClasses()}
              `}
            />
          )}
          <div className="relative bg-white rounded-lg p-4">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
