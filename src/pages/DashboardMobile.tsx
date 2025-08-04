import React from 'react';
import SuggestedModulesWidget from '../components/widgets/SuggestedModulesWidget';
import { useAuthContext } from '../contexts/AuthContext';

const DashboardMobile: React.FC = () => {
  const { company } = useAuthContext();
  return (
    <div className="p-4">
      {/* Graphique Cash-flow ici */}
      <SuggestedModulesWidget accountId={company?.id || ''} />
    </div>
  );
};

export default DashboardMobile;
