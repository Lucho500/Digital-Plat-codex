import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuthContext } from '../contexts/AuthContext';
import { logOnboardingEvent } from '../lib/hooks/useAnalytics';
import { useFeedback } from '../lib/hooks/useFeedback';

interface SuccessState {
  name: string;
  modules: string[];
  expert?: { name: string } | null;
  totalTime: number;
  stepsCompleted: number;
  skippedSteps: number;
}

const Confetti: React.FC = () => {
  const pieces = Array.from({ length: 20 });
  const colors = ['#0F3460', '#C11B17', '#2EA043', '#E39D34'];
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[i % colors.length]
          }}
        />
      ))}
    </div>
  );
};

const OnboardingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: SuccessState };
  const { user } = useAuthContext();
  const { triggerFeedback } = useFeedback();

  useEffect(() => {
    triggerFeedback();
    logOnboardingEvent('onboardingCompleted', {
      userId: user?.id ?? null,
      stepId: state.stepsCompleted,
      totalTime: state.totalTime,
      stepsCompleted: state.stepsCompleted,
      skippedSteps: state.skippedSteps
    });
    const btn = document.getElementById('dashboard-btn');
    btn?.focus();
  }, []);

  return (
    <div className="animate-fade-in flex justify-center mt-10">
      <Confetti />
      <Card className="text-center max-w-md">
        <h3 className="text-xl font-medium mb-4">Bienvenue {state.name} !</h3>
        <p className="text-gray-700 mb-2">
          Modules activés : {state.modules.join(', ')}
        </p>
        {state.expert && (
          <p className="text-gray-700 mb-4">
            Expert attribué : {state.expert.name}
          </p>
        )}
        <Button
          id="dashboard-btn"
          variant="primary"
          onClick={() => navigate('/')}
        >
          Accéder au tableau de bord
        </Button>
        <div className="mt-3">
          <Button variant="secondary" onClick={() => navigate('/guide')}>
            Découvrir la plateforme
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingSuccess;
