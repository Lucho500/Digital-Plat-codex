export interface ForecastMonth {
  month: string;
  revenue: number; // CA for the month
  marginPct: number; // margin percentage expressed as 0-1
  salaries: number; // salary costs for the month
  opex: number; // operational expenses for the month
  startingCash?: number; // initial cash for first month
}

export interface ScenarioParams {
  deltaCApct: number;
  deltaMarginPct: number;
  deltaSalary: number;
  deltaOpex: number;
}

interface ForecastResult {
  month: string;
  inflow: number;
  outflow: number;
  cash: number;
}

interface KpiDiff {
  cash_min: number;
  solde_fin_annee: number;
  EBITDA: number;
}

interface ApplyScenarioResult {
  forecast: ForecastResult[];
  kpiDiff: KpiDiff;
}

function computeForecast(base: ForecastMonth[], params: ScenarioParams) {
  let cash = base[0]?.startingCash ?? 0;
  let cashMin = cash;
  let ebitda = 0;
  const forecast: ForecastResult[] = [];

  for (const m of base) {
    const revenue = m.revenue * (1 + params.deltaCApct / 100);
    const marginPct = m.marginPct + params.deltaMarginPct / 100;
    const inflow = revenue * marginPct;
    const salaries = m.salaries + params.deltaSalary;
    const opex = m.opex + params.deltaOpex;
    const outflow = salaries + opex;
    cash += inflow - outflow;
    if (cash < cashMin) cashMin = cash;
    ebitda += inflow - outflow;
    forecast.push({ month: m.month, inflow, outflow, cash });
  }

  return { forecast, cashMin, finalCash: cash, ebitda };
}

export function applyScenario(baseForecast: ForecastMonth[], params: ScenarioParams): ApplyScenarioResult {
  const base = computeForecast(baseForecast, { deltaCApct: 0, deltaMarginPct: 0, deltaSalary: 0, deltaOpex: 0 });
  const scenario = computeForecast(baseForecast, params);
  return {
    forecast: scenario.forecast,
    kpiDiff: {
      cash_min: scenario.cashMin - base.cashMin,
      solde_fin_annee: scenario.finalCash - base.finalCash,
      EBITDA: scenario.ebitda - base.ebitda,
    },
  };
}
