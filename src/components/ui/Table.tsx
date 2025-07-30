import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void;
  sortField?: keyof T;
  sortDirection?: 'asc' | 'desc';
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
}

function Table<T extends { id?: string | number }>({
  columns,
  data,
  onSort,
  sortField,
  sortDirection,
  onRowClick,
  isLoading,
  emptyState
}: TableProps<T>) {
  const renderCell = (column: Column<T>, row: T) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return row[column.accessor];
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || typeof column.accessor === 'function' || !onSort) return;

    const newDirection = 
      sortField === column.accessor && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.accessor, newDirection);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`
                  px-6 py-3 text-xs font-medium tracking-wider
                  ${column.align === 'right' ? 'text-right' : 
                    column.align === 'center' ? 'text-center' : 'text-left'}
                  ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                `}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp 
                        size={12}
                        className={sortField === column.accessor && sortDirection === 'asc' 
                          ? 'text-primary' 
                          : 'text-gray-400'
                        }
                      />
                      <ChevronDown
                        size={12}
                        className={sortField === column.accessor && sortDirection === 'desc'
                          ? 'text-primary'
                          : 'text-gray-400'
                        }
                      />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`
                    px-6 py-4 whitespace-nowrap text-sm
                    ${column.align === 'right' ? 'text-right' : 
                      column.align === 'center' ? 'text-center' : 'text-left'}
                  `}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;