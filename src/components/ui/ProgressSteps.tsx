import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  completed: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  onChange?: (step: number) => void;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps, 
  currentStep,
  onChange 
}) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto my-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="progress-step">
            <button
              onClick={() => onChange && onChange(step.id)}
              disabled={!onChange}
              className={`progress-step-number ${
                currentStep === step.id ? 'active' : ''
              } ${step.completed ? 'completed' : ''}`}
            >
              {step.completed ? (
                <Check size={16} />
              ) : (
                index + 1
              )}
            </button>
            <div className="hidden sm:block ml-2">
              <p className={`text-sm font-medium ${
                currentStep === step.id ? 'text-primary' : 'text-gray-500'
              }`}>
                {step.label}
              </p>
            </div>
          </div>
          
          {/* Connector line between steps */}
          {index < steps.length - 1 && (
            <div 
              className={`progress-step-line ${
                step.completed ? 'completed' : ''
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;