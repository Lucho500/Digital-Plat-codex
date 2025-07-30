import React from 'react';
import { Card } from './Card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  description
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-4 h-4" />;
      case 'down':
        return <ArrowDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTrendLabel = () => {
    switch (trend) {
      case 'up':
        return 'Increasing';
      case 'down':
        return 'Decreasing';
      default:
        return '';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change !== undefined && (
          <p className={`ml-2 flex items-center text-sm ${getTrendColor()}`}>
            {getTrendIcon() && (
              <span role="img" aria-label={getTrendLabel()}>{getTrendIcon()}</span>
            )}
            <span className="ml-1">{Math.abs(change)}%</span>
          </p>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </Card>
  );
};

export default KPICard;