import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressSteps from '../components/ui/ProgressSteps';
import {
  CheckCircle, 
  FileCheck, 
  AlertTriangle, 
  FileQuestion, 
  Clock, 
  ChevronRight,
  Upload,
  Download,
  UserCog,
  Loader
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useClosingTasks } from '../lib/hooks/useClosingTasks';
import { updateClosingTaskStatus } from '../lib/api/closing';

// Define the steps for the monthly closing process
const closingSteps = [
  { id: 1, label: 'Vérification', completed: true },
  { id: 2, label: 'Validation', completed: false },
  { id: 3, label: 'Finalisation', completed: false }
];

// Define task types for the checklist
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'review' | 'missing';
  documents?: { name: string; date: string }[];
}

const MonthlyClosing: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const { data: fetchedTasks } = useClosingTasks('demo', '2023-06');
  
  // Sample tasks for the monthly closing checklist
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'invoices',
      title: 'Factures clients',
      description: 'Toutes les factures du mois ont été émises et comptabilisées.',
      status: 'completed',
      documents: [
        { name: 'Journal des ventes - Juin 2023.pdf', date: '28/06/2023' }
      ]
    },
    {
      id: 'expenses',
      title: 'Factures fournisseurs',
      description: 'Toutes les factures fournisseurs du mois ont été saisies.',
      status: 'review',
      documents: [
        { name: 'Journal des achats - Juin 2023.pdf', date: '28/06/2023' }
      ]
    },
    {
      id: 'bank',
      title: 'Rapprochement bancaire',
      description: 'Le rapprochement bancaire a été effectué.',
      status: 'pending'
    },
    {
      id: 'salaries',
      title: 'Salaires et charges sociales',
      description: 'Les salaires ont été versés et les charges sociales comptabilisées.',
      status: 'completed',
      documents: [
        { name: 'Journal de paie - Juin 2023.pdf', date: '25/06/2023' }
      ]
    },
    {
      id: 'vat',
      title: 'Déclaration TVA',
      description: 'La déclaration TVA du trimestre a été préparée.',
      status: 'missing'
    }
  ]);

  useEffect(() => {
    if (fetchedTasks) {
      setTasks(fetchedTasks as Task[]);
    }
  }, [fetchedTasks]);

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateClosingTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      addToast('Statut de la tâche mis à jour', 'success');
    } catch (error) {
      addToast("Erreur lors de la mise à jour du statut de la tâche", 'error');
    }
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-success" />;
      case 'pending':
        return <Clock size={20} className="text-gray-400" />;
      case 'review':
        return <FileQuestion size={20} className="text-warning" />;
      case 'missing':
        return <AlertTriangle size={20} className="text-error" />;
      default:
        return <Clock size={20} className="text-gray-400" />;
    }
  };

  const getTaskStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-success">Complété</span>;
      case 'pending':
        return <span className="badge badge-primary">En attente</span>;
      case 'review':
        return <span className="badge badge-warning">À vérifier</span>;
      case 'missing':
        return <span className="badge badge-error">Manquant</span>;
      default:
        return <span className="badge badge-primary">En attente</span>;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(currentStep + 1);
        
        // Mark the current step as completed
        const updatedSteps = closingSteps.map(step => 
          step.id === currentStep ? { ...step, completed: true } : step
        );
        
        // Update steps (in a real app, you would dispatch this to your state management)
      }, 1500);
    } else {
      // Final step - redirect to dashboard with success message
      navigate('/closing');
    }
  };

  const handleDelegate = () => {
    // Show a confirmation dialog
    const confirmed = window.confirm("Êtes-vous sûr de vouloir déléguer cette tâche à votre expert comptable ?");
    
    if (confirmed) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // Navigate back to the closing overview page
        navigate('/closing');
      }, 1500);
    }
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Clôture Mensuelle - Juin 2023</h2>
            <p className="text-gray-500 mt-1">Validez les éléments de votre clôture mensuelle</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="secondary" icon={<Download size={16} />}>
              Exporter le rapport
            </Button>
            <Button variant="secondary" icon={<UserCog size={16} />} onClick={handleDelegate}>
              Déléguer à mon expert
            </Button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <ProgressSteps 
          steps={closingSteps} 
          currentStep={currentStep}
          onChange={(step) => step < currentStep && setCurrentStep(step)}
        />
      </div>

      {/* Main Content - Depends on current step */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Vérification des documents</h3>
          {/* Verification step content would go here */}
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Checklist de validation</h3>
            <p className="text-gray-500 mb-6">
              Vérifiez que tous les éléments ci-dessous sont complets avant de finaliser votre clôture.
            </p>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`border rounded-lg p-4 ${
                    task.status === 'completed' ? 'border-success/30 bg-success/5' :
                    task.status === 'review' ? 'border-warning/30 bg-warning/5' :
                    task.status === 'missing' ? 'border-error/30 bg-error/5' :
                    'border-gray-200'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mt-1 mr-3">
                      {getTaskStatusIcon(task.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {getTaskStatusBadge(task.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      
                      {/* Documents section */}
                      {task.documents && task.documents.length > 0 && (
                        <div className="mt-3 border-t border-gray-100 pt-3">
                          <p className="text-xs font-medium text-gray-500 mb-2">Documents associés</p>
                          {task.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between text-sm py-1">
                              <div className="flex items-center">
                                <FileCheck size={16} className="text-primary mr-2" />
                                <span>{doc.name}</span>
                              </div>
                              <span className="text-gray-500 text-xs">{doc.date}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Action buttons */}
                      <div className="mt-3 flex items-center space-x-3">
                        {task.status !== 'completed' && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            onClick={() => updateTaskStatus(task.id, 'completed')}
                          >
                            Valider
                          </Button>
                        )}
                        
                        {!task.documents && (
                          <Button 
                            variant="secondary" 
                            size="sm"
                            icon={<Upload size={16} />}
                          >
                            Ajouter un document
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(1)}
            >
              Retour
            </Button>
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading || tasks.some(task => task.status === 'missing')}
            >
              {loading ? 'Traitement en cours...' : 'Continuer'}
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Clôture prête à être finalisée</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Tous les éléments ont été vérifiés et validés. Vous pouvez maintenant finaliser votre clôture mensuelle.
              </p>
              
              <div className="space-y-3 max-w-md mx-auto mb-8">
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">Rapport de clôture</span>
                  <Button variant="text" size="sm" icon={<Download size={16} />}>
                    Télécharger
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">Bilan intermédiaire</span>
                  <Button variant="text" size="sm" icon={<Download size={16} />}>
                    Télécharger
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">Compte de résultat</span>
                  <Button variant="text" size="sm" icon={<Download size={16} />}>
                    Télécharger
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg"
                icon={loading ? <Loader size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                onClick={handleNextStep}
                disabled={loading}
              >
                {loading ? 'Finalisation en cours...' : 'Finaliser la clôture'}
              </Button>
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(2)}
            >
              Retour
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyClosing;