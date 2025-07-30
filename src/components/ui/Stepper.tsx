import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
  completed?: boolean;
  optional?: boolean;
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  onChange?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  onChange
}) => {
  const isStepCompleted = (step: Step) => {
    return step.completed || step.id < activeStep;
  };

  const isStepActive = (step: Step) => {
    return step.id === activeStep;
  };

  if (orientation === 'vertical') {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-start">
              <div className="flex items-center h-9 w-9">
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center border-2
                    ${isStepCompleted(step)
                      ? 'bg-success border-success text-white'
                      : isStepActive(step)
                      ? 'border-primary text-primary'
                      : 'border-gray-300 text-gray-500'}
                  `}
                >
                  {isStepCompleted(step) ? (
                    <Check size={20} />
                  ) : (
                    step.id
                  )}
                </div>
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {step.title}
                  {step.optional && (
                    <span className="text-sm text-gray-500 ml-2">(Optional)</span>
                  )}
                </div>
                {step.description && (
                  <p className="text-sm text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-4 absolute top-9 left-0 -ml-0.5 w-0.5 h-full bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="relative flex items-center flex-col flex-1">
            <div
              className={`
                w-9 h-9 rounded-full flex items-center justify-center border-2
                ${isStepCompleted(step)
                  ? 'bg-success border-success text-white'
                  : isStepActive(step)
                  ? 'border-primary text-primary'
                  : 'border-gray-300 text-gray-500'}
              `}
              onClick={() => onChange && onChange(step.id)}
            >
              {isStepCompleted(step) ? (
                <Check size={20} />
              ) : (
                step.id
              )}
            </div>
            <div className="text-center mt-2">
              <div className="text-sm font-medium text-gray-900">
                {step.title}
              </div>
              {step.optional && (
                <div className="text-xs text-gray-500">(Optional)</div>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-300" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;