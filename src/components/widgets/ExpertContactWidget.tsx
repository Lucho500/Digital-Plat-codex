import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useFeatureFlag } from '../../lib/hooks/useFeatureFlag';
import { useExpertDetails } from '../../lib/hooks/useExpertDetails';
import { logAdvisoryEvent } from '../../lib/hooks/useAnalytics';
import BookingModal from '../BookingModal';

interface Props {
  accountId: string;
}

const ExpertContactWidget: React.FC<Props> = ({ accountId }) => {
  const { enabled } = useFeatureFlag('advisoryV1');
  const { expert, isLoading } = useExpertDetails(accountId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (enabled && expert) {
      void logAdvisoryEvent('expertWidgetViewed', {
        accountId,
        expertId: expert.id
      });
    }
  }, [enabled, expert, accountId]);

  if (!enabled) return null;

  if (isLoading) {
    return (
      <Card className="p-4 flex items-center space-x-4" role="region">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
        </div>
      </Card>
    );
  }

  if (!expert) return null;

  const npsEmoji = expert.npsScore >= 80 ? '😊' : expert.npsScore >= 50 ? '😐' : '😞';

  return (
    <>
      <Card role="region" className="p-4 flex items-center space-x-4">
        <div className="relative">
          <img
            src={expert.avatarUrl}
            alt={expert.name}
            className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
          />
          <span
            className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
              expert.online ? 'bg-success' : 'bg-error'
            }`}
          ></span>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{expert.name}</h4>
          <p className="text-sm text-gray-500">{expert.speciality}</p>
          <p className="text-sm mt-1">
            {npsEmoji} {expert.npsScore}/100
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            variant="primary"
            onClick={() => {
              void logAdvisoryEvent('expertPlanCallClicked', {
                accountId,
                expertId: expert.id
              });
              setOpen(true);
            }}
          >
            Planifier un appel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              void logAdvisoryEvent('expertMessageClicked', {
                accountId,
                expertId: expert.id
              });
              window.location.href = `/messages/new?to=${expert.id}`;
            }}
          >
            Envoyer un message
          </Button>
        </div>
      </Card>
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
        expertName={expert.name}
      />
    </>
  );
};

export default ExpertContactWidget;
