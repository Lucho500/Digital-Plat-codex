import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const getVariantClasses = (isActive: boolean) => {
    switch (variant) {
      case 'pills':
        return isActive
          ? 'bg-primary text-white'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100';
      case 'underline':
        return isActive
          ? 'border-b-2 border-primary text-primary'
          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
      default:
        return isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <div 
      className={`
        ${variant === 'default' ? 'border-b border-gray-200' : ''}
        ${className}
      `}
    >
      <nav 
        className={`
          flex space-x-2
          ${variant === 'default' ? '-mb-px' : ''}
          ${fullWidth ? 'w-full' : ''}
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={`
              ${getSizeClasses()}
              ${getVariantClasses(activeTab === tab.id)}
              ${variant === 'pills' ? 'rounded-md px-3 py-2' : 'px-4 py-2'}
              ${variant === 'default' ? 'border-b-2' : ''}
              ${fullWidth ? 'flex-1' : ''}
              font-medium
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/50
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;