import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export interface CashFlowPoint {
  month: string;
  forecast: number;
  actual: number;
  balance: number;
}

interface Props {
  data: CashFlowPoint[];
}

const CashFlowChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" aspect={4 / 3}>
    <AreaChart data={data} aria-label="Cash flow chart">
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="forecast" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="actual" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      <Line type="monotone" dataKey="balance" stroke="#000" dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

export default CashFlowChart;
