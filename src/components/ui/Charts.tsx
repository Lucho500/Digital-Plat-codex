import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

interface ChartProps {
  type: 'area' | 'bar' | 'line';
  data: any[];
  /** Width of the chart container. Defaults to 400 */
  width?: number;
  /** Height of the chart container. Defaults to 300 */
  height?: number;
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  stacked?: boolean;
}

const Charts: React.FC<ChartProps> = ({
  type,
  data,
  width = 400,
  height = 300,
  xKey,
  yKeys,
  stacked = false
}) => {
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-500 mr-4">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.value.toLocaleString()} €
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      width,
      height,
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              {yKeys.map((key) => (
                <linearGradient key={key.key} id={`gradient-${key.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={key.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={key.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={xKey} 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value.toLocaleString()} €`}
            />
            <Tooltip content={renderTooltip} />
            {yKeys.map((key) => (
              <Area
                key={key.key}
                type="monotone"
                dataKey={key.key}
                name={key.name}
                stroke={key.color}
                fill={`url(#gradient-${key.key})`}
                strokeWidth={2}
                stackId={stacked ? "1" : undefined}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={xKey} 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value.toLocaleString()} €`}
            />
            <Tooltip content={renderTooltip} />
            {yKeys.map((key) => (
              <Bar
                key={key.key}
                dataKey={key.key}
                name={key.name}
                fill={key.color}
                radius={[4, 4, 0, 0]}
                stackId={stacked ? "1" : undefined}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={xKey} 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value.toLocaleString()} €`}
            />
            <Tooltip content={renderTooltip} />
            {yKeys.map((key) => (
              <Line
                key={key.key}
                type="monotone"
                dataKey={key.key}
                name={key.name}
                stroke={key.color}
                strokeWidth={2}
                dot={{ r: 4, fill: key.color }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      default:
        return null;
    }
  };

  return renderChart();
};

export default Charts;