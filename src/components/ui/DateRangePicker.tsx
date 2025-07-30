import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (dates: { start: Date; end: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: startDate,
    end: endDate
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDateClick = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: date });
    } else {
      const newRange = {
        start: selectedRange.start,
        end: date
      };
      setSelectedRange(newRange);
      onChange(newRange);
      setIsOpen(false);
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateHovered = (date: Date) => {
    if (!selectedRange.start || selectedRange.end) return false;
    if (!hoveredDate) return false;
    return date >= selectedRange.start && date <= hoveredDate;
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        icon={<Calendar size={16} />}
        onClick={() => setIsOpen(!isOpen)}
      >
        {formatDate(selectedRange.start)} - {formatDate(selectedRange.end)}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Calendar grid would go here */}
            {/* This is a simplified version - you'd want to add full calendar functionality */}
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onChange(selectedRange);
                setIsOpen(false);
              }}
            >
              Appliquer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;