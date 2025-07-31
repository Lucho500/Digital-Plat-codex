import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from 'recharts';

interface BudgetChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  /** Width of the chart container. Defaults to 400 */
  width?: number;
  /** Height of the chart container. Defaults to 300 */
  height?: number;
}

const BudgetChart: React.FC<BudgetChartProps> = ({
  data,
  width = 400,
  height = 300
}) => {
  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{item.name}</p>
          <p className="text-sm text-gray-500 mt-1">
            {item.value.toLocaleString()} € ({Math.round(item.percentage)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: (item.value / total) * 100
  }));

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={dataWithPercentage}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {dataWithPercentage.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip content={renderTooltip} />
      <Legend
        verticalAlign="middle"
        align="right"
        layout="vertical"
        formatter={(value: string) => (
          <span className="text-sm text-gray-700">{value}</span>
        )}
      />
    </PieChart>
  );
};

export default BudgetChart;