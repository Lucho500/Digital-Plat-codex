import React from 'react';

interface KPIGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
}

const KPIGrid: React.FC<KPIGridProps> = ({
  children,
  columns = 4,
  gap = 'md'
}) => {
  const getGapClass = () => {
    switch (gap) {
      case 'sm':
        return 'gap-2';
      case 'lg':
        return 'gap-6';
      default:
        return 'gap-4';
    }
  };

  const getGridClass = () => {
    return `grid-cols-1 md:grid-cols-${columns}`;
  };

  return (
    <div className={`grid ${getGridClass()} ${getGapClass()}`}>
      {children}
    </div>
  );
};

export { KPIGrid };
export default KPIGrid;