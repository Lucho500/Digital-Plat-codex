```typescript
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
  submenu?: MenuItem[];
}

interface MenuProps {
  items: MenuItem[];
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ items, className = '' }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderMenuItem = (item: MenuItem, index: number) => (
    <div
      key={index}
      className={`
        relative
        ${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      onMouseEnter={() => !item.disabled && setActiveSubmenu(index)}
    >
      <div
        className={`
          flex items-center px-4 py-2 text-sm
          ${item.disabled ? '' : 'hover:bg-gray-50'}
          ${item.danger ? 'text-error' : 'text-gray-700'}
        `}
        onClick={() => !item.disabled && item.onClick?.()}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {item.submenu && <ChevronRight size={16} className="ml-2" />}
      </div>

      {item.submenu && activeSubmenu === index && (
        <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {item.submenu.map((subitem, subindex) => renderMenuItem(subitem, `${index}-${subindex}`))}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={menuRef}
      className={`
        bg-white border border-gray-200 rounded-md shadow-lg py-1
        ${className}
      `}
    >
      {items.map((item, index) => renderMenuItem(item, index))}
    </div>
  );
};

export default Menu;
```