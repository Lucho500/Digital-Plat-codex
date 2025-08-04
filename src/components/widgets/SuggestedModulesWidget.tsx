import React, { useEffect, useMemo } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useFeatureFlag } from '../../lib/hooks/useFeatureFlag';
import { useSuggestedModules } from '../../lib/hooks/useSuggestedModules';
import suggestedModules from '../../config/suggested-modules';
import { logRecoEvent } from '../../lib/hooks/useAnalytics';

interface Props {
  accountId: string;
}

const SuggestedModulesWidget: React.FC<Props> = ({ accountId }) => {
  const { enabled } = useFeatureFlag('upsellRecoV1');
  const { modules, isLoading } = useSuggestedModules(accountId);
  const variant = useMemo(() => (Math.random() < 0.5 ? 'bundle' : 'module'), []);

  const items = useMemo(() => {
    const mapped = modules?.map((m) => suggestedModules[m.moduleId]).filter(Boolean) || [];
    if (variant === 'bundle' && mapped.length > 0) {
      const bundleId = `${mapped[0].id}-bundle`;
      const bundle = suggestedModules[bundleId];
      if (bundle) {
        return [bundle, ...mapped.slice(1)];
      }
    }
    return mapped;
  }, [modules, variant]);

  useEffect(() => {
    if (items && items.length > 0) {
      const position = window.innerWidth < 768 ? 'mobile' : 'desktop';
      void logRecoEvent('recoWidgetViewed', {
        moduleIds: items.map((m) => m.id),
        position,
        variant
      });
    }
  }, [items, variant]);

  useEffect(() => {
    void logRecoEvent('bundleExperimentAssigned', { variant });
  }, [variant]);

  if (!enabled) return null;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-sm text-gray-600">Aucun module recommandé pour l'instant</p>
        <a href="/store" className="text-primary text-sm underline">
          Découvrir le store
        </a>
      </Card>
    );
  }

  return (
    <div role="list" className="space-y-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            role="listitem"
            tabIndex={0}
            aria-label={`${item.name} - ${item.benefit}`}
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            <Card className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon size={24} className="text-primary" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.benefit.length > 60 ? `${item.benefit.slice(0, 57)}...` : item.benefit}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-primary text-white rounded">
                    {/** i18n key: upsell.freeTrialBadge */}
                    Essai gratuit 7 j
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => {
                  const position = window.innerWidth < 768 ? 'mobile' : 'desktop';
                  void logRecoEvent('recoWidgetClicked', {
                    moduleId: item.id,
                    position,
                    variant
                  });
                  window.alert('Try & Buy');
                }}
                title={item.price}
              >
                Essayer
              </Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedModulesWidget;
