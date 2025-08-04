import React from 'react';
import Button from '../../components/ui/Button';

export interface ValidationField {
  key: string;
  label: string;
  value: string;
  confirmed: boolean;
}

interface Props {
  fields: ValidationField[];
  onConfirm: (key: string) => void;
  onEdit: (key: string) => void;
}

const OcrValidationDrawer: React.FC<Props> = ({ fields, onConfirm, onEdit }) => {
  if (fields.length === 0) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-4 overflow-y-auto z-50">
      <h3 className="text-lg font-medium mb-4">Validation rapide</h3>
      <ul className="space-y-4">
        {fields.map((f) => (
          <li key={f.key} className="flex items-start justify-between">
            <div className="flex-1 mr-2">
              <p className="text-sm font-medium text-gray-700">{f.label}</p>
              <p className="text-sm text-gray-500 truncate" title={f.value}>{f.value}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className="text-xl" aria-label={f.confirmed ? 'Confirmé' : 'À vérifier'}>
                {f.confirmed ? '✅' : '⚠️'}
              </span>
              {f.confirmed ? (
                <Button size="sm" variant="secondary" onClick={() => onEdit(f.key)}>
                  Modifier
                </Button>
              ) : (
                <Button size="sm" variant="primary" onClick={() => onConfirm(f.key)}>
                  Confirmer
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OcrValidationDrawer;
