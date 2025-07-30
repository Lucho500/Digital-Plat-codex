import React, { useState } from 'react';
import Button from './Button';
import { Filter, X, ChevronDown } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'date' | 'boolean' | 'text';
  options?: { value: string; label: string }[];
}

interface FilterValue {
  [key: string]: any;
}

interface FilterBarProps {
  filters: FilterOption[];
  onChange: (filters: FilterValue) => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValue>({});

  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = {
      ...activeFilters,
      [filterId]: value
    };
    
    // Remove empty filters
    if (!value) {
      delete newFilters[filterId];
    }
    
    setActiveFilters(newFilters);
    onChange(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onChange({});
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          icon={<Filter size={16} />}
          onClick={() => setIsOpen(!isOpen)}
        >
          Filtres
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>

        {getActiveFilterCount() > 0 && (
          <Button
            variant="text"
            size="sm"
            icon={<X size={16} />}
            onClick={clearFilters}
          >
            Effacer les filtres
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.id}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {filter.label}
                </label>
                
                {filter.type === 'select' && filter.options && (
                  <select
                    className="form-input"
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  >
                    <option value="">Tous</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === 'date' && (
                  <input
                    type="date"
                    className="form-input"
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  />
                )}

                {filter.type === 'boolean' && (
                  <select
                    className="form-input"
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  >
                    <option value="">Tous</option>
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                )}

                {filter.type === 'text' && (
                  <input
                    type="text"
                    className="form-input"
                    value={activeFilters[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    placeholder={`Filtrer par ${filter.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Fermer
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Appliquer
            </Button>
          </div>
        </div>
      )}

      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find(f => f.id === key);
            if (!filter) return null;

            let displayValue = value;
            if (filter.type === 'select') {
              const option = filter.options?.find(o => o.value === value);
              displayValue = option?.label || value;
            } else if (filter.type === 'boolean') {
              displayValue = value === 'true' ? 'Oui' : 'Non';
            }

            return (
              <div
                key={key}
                className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
              >
                <span className="text-gray-600 mr-1">{filter.label}:</span>
                <span className="font-medium">{displayValue}</span>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => handleFilterChange(key, null)}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterBar;