export type TaskStatus = 'complete' | 'warning' | 'pending';

export interface MonthlyClosing {
  month: string;
  year: number;
  status: 'ongoing' | 'completed';
  tasks?: Array<{ label: string; status: TaskStatus }>;
  metrics?: Array<{ label: string; value: string }>;
}

export async function getMonthlyClosings(): Promise<MonthlyClosing[]> {
  return [
    {
      month: 'Juin',
      year: 2023,
      status: 'ongoing',
      tasks: [
        { label: 'Factures clients', status: 'complete' },
        { label: 'Factures fournisseurs', status: 'warning' },
        { label: 'Rapprochement bancaire', status: 'pending' },
      ],
    },
    {
      month: 'Mai',
      year: 2023,
      status: 'completed',
      metrics: [
        { label: "Chiffre d'affaires", value: '25 680 €' },
        { label: 'Résultat', value: '3 450 €' },
        { label: 'Trésorerie', value: '42 970 €' },
      ],
    },
    {
      month: 'Avril',
      year: 2023,
      status: 'completed',
      metrics: [
        { label: "Chiffre d'affaires", value: '22 340 €' },
        { label: 'Résultat', value: '2 980 €' },
        { label: 'Trésorerie', value: '38 750 €' },
      ],
    },
  ];
}
