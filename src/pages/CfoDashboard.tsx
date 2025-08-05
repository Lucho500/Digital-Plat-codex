import React, { lazy, Suspense, useEffect, useState } from 'react';
import KpiChip from '../components/KpiChip';
import { CashFlowPoint } from '../components/cfo/CashFlowChart';
import { PnlPoint } from '../components/cfo/PnlChart';
import { AlertItem } from '../components/cfo/AlertsPanel';

const CashFlowChart = lazy(() => import('../components/cfo/CashFlowChart'));
const PnlChart = lazy(() => import('../components/cfo/PnlChart'));
const AlertsPanel = lazy(() => import('../components/cfo/AlertsPanel'));
const WhatIfPanel = lazy(() => import('../components/WhatIfPanel'));

const CfoDashboard: React.FC = () => {
  const [cashData, setCashData] = useState<CashFlowPoint[]>([]);
  const [pnlData, setPnlData] = useState<PnlPoint[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  useEffect(() => {
    fetch('/api/cfo/forecast')
      .then((r) => r.json())
      .then(setCashData)
      .catch(() => {});
    fetch('/api/cfo/pnl?months=12')
      .then((r) => r.json())
      .then(setPnlData)
      .catch(() => {});
    // placeholder alerts
    setAlerts([]);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <header className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <KpiChip label="Cash min" value="--" />
        <KpiChip label="Burn" value="--" />
        <KpiChip label="EBITDA %" value="--" />
        <KpiChip label="DSO" value="--" />
      </header>
      <div className="grid md:grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <CashFlowChart data={cashData} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PnlChart data={pnlData} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {showWhatIf ? (
            <WhatIfPanel accountId="" />
          ) : (
            <button
              onClick={() => setShowWhatIf(true)}
              className="btn btn-primary w-full md:w-auto"
            >
              Ouvrir What-if
            </button>
          )}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AlertsPanel alerts={alerts} />
        </Suspense>
      </div>
    </div>
  );
};

export default CfoDashboard;
