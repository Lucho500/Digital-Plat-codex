import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string[];
  multiple?: boolean;
  variant?: 'default' | 'bordered';
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpanded = [],
  multiple = false,
  variant = 'default'
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (itemId: string) => {
    if (multiple) {
      setExpandedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  return (
    <div className={`divide-y ${variant === 'bordered' ? 'border rounded-lg' : ''}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${variant === 'bordered' ? 'p-4' : ''}`}
        >
          <button
            className={`
              flex items-center justify-between w-full py-4 text-left
              ${variant === 'default' ? 'px-4' : ''}
              ${item.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-50'}
            `}
            onClick={() => !item.disabled && toggleItem(item.id)}
            disabled={item.disabled}
            aria-expanded={isExpanded(item.id)}
          >
            <div className="font-medium text-gray-900">{item.title}</div>
            <ChevronDown
              size={20}
              className={`text-gray-500 transition-transform duration-200 ${
                isExpanded(item.id) ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <div
            className={`
              overflow-hidden transition-all duration-200
              ${isExpanded(item.id) ? 'max-h-96' : 'max-h-0'}
            `}
          >
            <div className={`py-4 ${variant === 'default' ? 'px-4' : ''}`}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;