import React, { useEffect, useMemo, useState } from 'react';

function debounce<F extends (...args: any[]) => void>(fn: F, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

interface Props {
  accountId: string;
}

export default function WhatIfPanel({ accountId }: Props) {
  const [deltaCApct, setDeltaCApct] = useState(0);
  const [deltaMarginPct, setDeltaMarginPct] = useState(0);
  const [deltaSalary, setDeltaSalary] = useState(0);
  const [deltaOpex, setDeltaOpex] = useState(0);
  const [kpi, setKpi] = useState<any>(null);

  const runScenario = useMemo(
    () =>
      debounce(async (params: any) => {
        const res = await fetch('/api/cfo/whatif', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountId, ...params }),
        });
        const data = await res.json();
        setKpi(data.kpiDiff);
      }, 400),
    [accountId]
  );

  useEffect(() => {
    runScenario({ deltaCApct, deltaMarginPct, deltaSalary, deltaOpex });
  }, [deltaCApct, deltaMarginPct, deltaSalary, deltaOpex, runScenario]);

  return (
    <div className="space-y-2">
      <div>
        <label>CA</label>
        <input type="range" min="-20" max="50" value={deltaCApct} onChange={(e) => setDeltaCApct(Number(e.target.value))} />
      </div>
      <div>
        <label>Marge</label>
        <input type="range" min="-10" max="10" value={deltaMarginPct} onChange={(e) => setDeltaMarginPct(Number(e.target.value))} />
      </div>
      <div>
        <label>Salaires</label>
        <input
          type="range"
          min="-100000"
          max="100000"
          step="1000"
          value={deltaSalary}
          onChange={(e) => setDeltaSalary(Number(e.target.value))}
        />
      </div>
      <div>
        <label>OPEX</label>
        <input
          type="range"
          min="-100000"
          max="100000"
          step="1000"
          value={deltaOpex}
          onChange={(e) => setDeltaOpex(Number(e.target.value))}
        />
      </div>
      {kpi && (
        <div className="text-sm">
          <div>Min cash: {kpi.cash_min?.toFixed(2)}</div>
          <div>Solde fin d'année: {kpi.solde_fin_annee?.toFixed(2)}</div>
          <div>EBITDA: {kpi.EBITDA?.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
