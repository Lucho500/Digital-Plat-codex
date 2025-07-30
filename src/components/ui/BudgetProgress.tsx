import React from 'react';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface BudgetProgressProps {
  category: string;
  budget: number;
  spent: number;
  color?: string;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  category,
  budget,
  spent,
  color = '#0F3460'
}) => {
  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;
  const isOverBudget = spent > budget;

  const getStatusIcon = () => {
    if (isOverBudget) {
      return {
        icon: <AlertTriangle size={16} className="text-error mr-1" />,
        label: 'Over budget',
      };
    }
    if (percentage >= 90) {
      return {
        icon: <TrendingUp size={16} className="text-warning mr-1" />,
        label: 'Nearing budget limit',
      };
    }
    return {
      icon: <CheckCircle size={16} className="text-success mr-1" />,
      label: 'Within budget',
    };
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{category}</h4>
        <span className={`text-sm ${
          isOverBudget ? 'text-error' : 'text-success'
        }`}>
          {remaining.toLocaleString()} € restants
        </span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block text-gray-600">
              {spent.toLocaleString()} € / {budget.toLocaleString()} €
            </span>
          </div>
          <div className="flex items-center">
            {(() => {
              const { icon, label } = getStatusIcon();
              return <span role="img" aria-label={label}>{icon}</span>;
            })()}
            <span className={`text-xs font-semibold inline-block ${
              isOverBudget ? 'text-error' :
              percentage >= 90 ? 'text-warning' :
              'text-success'
            }`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: isOverBudget ? '#D22E2E' : 
                             percentage >= 90 ? '#E39D34' : 
                             color
            }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;