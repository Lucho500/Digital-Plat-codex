import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import { useAuthContext } from '../../contexts/AuthContext';

interface Flag {
  id: string;
  is_enabled: boolean;
  updated_at: string;
}

const descriptions: Record<string, string> = {
  onboardingQR: 'Active le flux QR Express pour l\'onboarding',
};

const FeatureFlagsPage: React.FC = () => {
  const { user } = useAuthContext();
  const role = (user?.user_metadata as any)?.role;
  if (role !== 'admin' && role !== 'product_owner') {
    return <p className="p-4">Accès refusé</p>;
  }

  const [flags, setFlags] = useState<Flag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('feature_flags').select('*');
      if (error) throw error;
      setFlags(data as Flag[]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const toggle = async (id: string) => {
    await supabase.rpc('toggle_feature', { flag_id: id });
    fetchFlags();
  };

  const exportCsv = async () => {
    const { data } = await supabase.from('feature_flag_logs').select('*');
    const rows = data ?? [];
    const header = 'flag_id,old_value,new_value,user_id,created_at';
    const csv = [header, ...rows.map(r => `${r.flag_id},${r.old_value},${r.new_value},${r.user_id},${r.created_at}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feature_flag_logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="p-4">Chargement...</p>;
  if (error) return <p className="p-4">Erreur de chargement</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Feature Flags</h1>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Flag ID</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Dernière maj</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {flags.map(flag => (
            <tr key={flag.id} className="border-t">
              <td className="p-2">{flag.id}</td>
              <td className="p-2">{descriptions[flag.id] || ''}</td>
              <td className="p-2">{flag.is_enabled ? 'Actif' : 'Inactif'}</td>
              <td className="p-2">{flag.updated_at ? new Date(flag.updated_at).toLocaleString() : '-'}</td>
              <td className="p-2 text-center">
                <Button onClick={() => toggle(flag.id)}>
                  {flag.is_enabled ? 'Désactiver' : 'Activer'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="secondary" className="mt-4" onClick={exportCsv}>
        Exporter CSV
      </Button>
    </div>
  );
};

export default FeatureFlagsPage;
