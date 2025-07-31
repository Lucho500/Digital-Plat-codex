import React, { useEffect, useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useModuleRecommendations, CompanyData, Expert } from '../../lib/hooks/useModuleRecommendations';
import { logOnboardingEvent } from '../../lib/hooks/useAnalytics';

interface ModulesExpertStepProps {
  companyData: CompanyData;
  onComplete: (modules: string[], expert: Expert | null) => void;
  onSkip: () => void;
}

const ModulesExpertStep: React.FC<ModulesExpertStepProps> = ({ companyData, onComplete, onSkip }) => {
  if (import.meta.env.VITE_ONBOARDING_V2 !== 'true') return null;

  const { modules: suggestedModules, expert } = useModuleRecommendations(companyData);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedExpertId, setSelectedExpertId] = useState<string>('');

  useEffect(() => {
    setSelectedModules(suggestedModules);
  }, [suggestedModules]);

  useEffect(() => {
    if (expert) {
      setSelectedExpertId(expert.id);
    }
  }, [expert]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    await logOnboardingEvent('modulesSuggested', {
      stepId: 3,
      userId: null,
    });
    await logOnboardingEvent('expertSuggested', {
      stepId: 3,
      userId: null,
    });
    onComplete(selectedModules, expert && expert.id === selectedExpertId ? expert : null);
  };

  const handleSkip = async () => {
    await logOnboardingEvent('modulesSkipped', { stepId: 3, userId: null });
    onSkip();
  };

  return (
    <div className="space-y-6">
      <Card title="Modules recommandés">
        <div className="space-y-3">
          {suggestedModules.map(id => (
            <label key={id} className="flex items-center focus-within:ring">
              <input
                type="checkbox"
                checked={selectedModules.includes(id)}
                onChange={() => toggleModule(id)}
                className="form-checkbox text-primary rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{id}</span>
            </label>
          ))}
        </div>
      </Card>

      {expert && (
        <Card title="Expert associé">
          <label className="flex items-center focus-within:ring">
            <input
              type="radio"
              name="expert"
              checked={selectedExpertId === expert.id}
              onChange={() => setSelectedExpertId(expert.id)}
              className="form-radio text-primary"
            />
            <span className="ml-2 text-sm text-gray-700">{expert.name}</span>
          </label>
          <label className="flex items-center mt-2 focus-within:ring">
            <input
              type="radio"
              name="expert"
              value="generaliste"
              checked={selectedExpertId === 'generaliste'}
              onChange={() => setSelectedExpertId('generaliste')}
              className="form-radio text-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Généraliste</span>
          </label>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={handleSkip}>Je passe cette étape</Button>
        <Button variant="primary" onClick={handleFinish}>Finaliser l'inscription</Button>
      </div>
    </div>
  );
};

export default ModulesExpertStep;
