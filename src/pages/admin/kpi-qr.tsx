import React from 'react';
import useSWR from '../../lib/useSWR';
import { fetchQrKpi, QrKpiResponse } from '../../lib/api/qrKpi';
import { useAuthContext } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/Card';
import Charts from '../../components/ui/Charts';
import { ArrowDown, ArrowUp } from 'lucide-react';

const KpiQrPage: React.FC = () => {
  const { user } = useAuthContext();
  const role = (user?.user_metadata as any)?.role;
  if (role !== 'admin' && role !== 'product_owner') {
    return <p className="p-4">Accès refusé</p>;
  }

  const { data } = useSWR<QrKpiResponse>('qr-kpi', fetchQrKpi, { refreshInterval: 30000 });

  if (!data) return <p className="p-4">Chargement...</p>;

  const sparkData = data.ttfv_sparkline.map((v, i) => ({ i, v: v / 1000 }));
  const adoptionData = [
    { type: 'QR', value: data.adoption_qr },
    { type: 'Classique', value: data.adoption_classic }
  ];
  const dropTrend = data.drop_off <= 0.1 ? 'down' : 'up';
  const DropIcon = dropTrend === 'down' ? ArrowDown : ArrowUp;

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <h2 className="text-sm text-gray-500">TTFV</h2>
        <p className="text-2xl font-bold">{Math.round(data.ttfv_ms / 1000)}s</p>
        <Charts type="line" data={sparkData} xKey="i" yKeys={[{ key: 'v', name: 'TTFV', color: '#2563eb' }]} width={150} height={60} />
      </Card>
      <Card className="p-4 flex flex-col">
        <h2 className="text-sm text-gray-500">Drop-off</h2>
        <div className="flex items-center mt-2">
          <p className="text-2xl font-bold">{Math.round(data.drop_off * 100)}%</p>
          <DropIcon className={dropTrend === 'down' ? 'text-green-600 ml-2' : 'text-red-600 ml-2'} />
        </div>
      </Card>
      <Card className="p-4">
        <h2 className="text-sm text-gray-500">Adoption</h2>
        <Charts type="bar" data={adoptionData} xKey="type" yKeys={[{ key: 'value', name: 'Utilisateurs', color: '#7c3aed' }]} width={200} height={120} />
      </Card>
      <Card className="p-4">
        <h2 className="text-sm text-gray-500">Parsing success</h2>
        <div className="mt-2 w-full bg-gray-200 rounded h-4">
          <div className="bg-green-500 h-4 rounded" style={{ width: `${Math.round(data.parsing_success * 100)}%` }}></div>
        </div>
        <p className="mt-2 text-sm font-medium">{Math.round(data.parsing_success * 100)}%</p>
      </Card>
    </div>
  );
};

export default KpiQrPage;
