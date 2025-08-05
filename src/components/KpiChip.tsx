import React from 'react';

interface KpiChipProps {
  label: string;
  value: React.ReactNode;
}

const KpiChip: React.FC<KpiChipProps> = ({ label, value }) => (
  <div className="px-3 py-2 bg-white rounded shadow text-center" role="status" aria-label={label}>
    <div className="text-xs text-gray-500">{label}</div>
    <div className="font-bold">{value}</div>
  </div>
);

export default KpiChip;
