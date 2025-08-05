import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export interface PnlPoint {
  month: string;
  revenue: number;
  costs: number;
  ebitda: number;
}

interface Props {
  data: PnlPoint[];
}

const PnlChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" aspect={4 / 3}>
    <ComposedChart data={data} aria-label="P&L chart">
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="revenue" fill="#4f46e5" name="CA" />
      <Bar dataKey="costs" fill="#f87171" name="Coûts" />
      <Line type="monotone" dataKey="ebitda" stroke="#10b981" name="EBITDA" />
    </ComposedChart>
  </ResponsiveContainer>
);

export default PnlChart;
