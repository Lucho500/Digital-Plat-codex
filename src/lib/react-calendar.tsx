import React from 'react';

const Calendar: React.FC<{ onChange: (date: Date) => void; value: Date | null }> = ({ onChange, value }) => {
  return (
    <input
      type="date"
      value={value ? value.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(new Date(e.target.value))}
      className="border p-2"
    />
  );
};

export default Calendar;
