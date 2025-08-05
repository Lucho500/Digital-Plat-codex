import React from 'react';
import Alert from '../ui/Alert';

export interface AlertItem {
  id: string | number;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

interface Props {
  alerts: AlertItem[];
}

const AlertsPanel: React.FC<Props> = ({ alerts }) => (
  <div className="space-y-2 overflow-y-auto max-h-64" aria-label="Alerts list">
    {alerts.length === 0 ? (
      <p className="text-sm text-gray-500">Aucune alerte</p>
    ) : (
      alerts.map((a) => (
        <Alert key={a.id} variant={a.variant}>{a.message}</Alert>
      ))
    )}
  </div>
);

export default AlertsPanel;
