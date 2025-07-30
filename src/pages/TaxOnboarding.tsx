import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressSteps from '../components/ui/ProgressSteps';
import { 
  FileCheck, 
  Building2, 
  Users, 
  Calculator, 
  ChevronRight, 
  Check, 
  UserCog,
  Loader,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

// Define the steps for onboarding
const onboardingSteps = [
  { id: 1, label: 'Entreprise', completed: false },
  { id: 2, label: 'Activités', completed: false },
  { id: 3, label: 'Modules', completed: false },
  { id: 4, label: 'Expert', completed: false },
  { id: 5, label: 'Finalisation', completed: false }
];

// Define company size options
const companySizes = [
  { id: 'micro', label: 'Micro-entreprise', description: '0 salarié', icon: <Building2 size={24} /> },
  { id: 'tpe', label: 'TPE', description: '1-10 salariés', icon: <Building2 size={24} /> },
  { id: 'pme', label: 'PME', description: '11-250 salariés', icon: <Building2 size={24} /> },
  { id: 'eti', label: 'ETI', description: '250+ salariés', icon: <Building2 size={24} /> }
];

// Define activity sectors
const activitySectors = [
  { id: 'retail', label: 'Commerce & Distribution' },
  { id: 'services', label: 'Services' },
  { id: 'manufacturing', label: 'Industrie & Production' },
  { id: 'construction', label: 'BTP & Construction' },
  { id: 'tech', label: 'Tech & Digital' },
  { id: 'healthcare', label: 'Santé & Bien-être' },
  { id: 'hospitality', label: 'Hôtellerie & Restauration' },
  { id: 'other', label: 'Autre' }
];

// Define modules
const modules = [
  { 
    id: 'accounting', 
    label: 'Comptabilité', 
    description: 'Gestion comptable, reporting financier', 
    icon: <Calculator size={20} />,
    recommended: true 
  },
  { 
    id: 'payroll', 
    label: 'Paie & Social', 
    description: 'Gestion des salaires et charges sociales', 
    icon: <Users size={20} />,
    recommended: true 
  },
  { 
    id: 'tax', 
    label: 'Fiscalité', 
    description: 'Déclarations fiscales, optimisation', 
    icon: <FileCheck size={20} />,
    recommended: true 
  },
  { 
    id: 'invoice', 
    label: 'Facturation', 
    description: 'Émission et suivi des factures', 
    icon: <FileCheck size={20} />,
    recommended: false 
  },
  { 
    id: 'expense', 
    label: 'Notes de frais', 
    description: 'Gestion des dépenses et remboursements', 
    icon: <Calculator size={20} />,
    recommended: false 
  }
];

// Define the experts
const experts = [
  {
    id: 'exp1',
    name: 'Sophie Dupont',
    role: 'Expert Comptable Senior',
    speciality: 'PME et fiscalité',
    img: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    experience: '15 ans'
  },
  {
    id: 'exp2',
    name: 'Marc Lefevre',
    role: 'Expert Comptable',
    speciality: 'Startups et innovation',
    img: 'https://images.pexels.com/photos/3777952/pexels-photo-3777952.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    experience: '8 ans'
  },
  {
    id: 'exp3',
    name: 'Isabelle Moreau',
    role: 'Expert Comptable',
    speciality: 'Commerce et artisanat',
    img: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    experience: '12 ans'
  }
];

const TaxOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form state
  const [companySize, setCompanySize] = useState('');
  const [sector, setSector] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  
  // Initialize with recommended modules
  React.useEffect(() => {
    const recommended = modules
      .filter(module => module.recommended)
      .map(module => module.id);
    setSelectedModules(recommended);
  }, []);

  // Toggle module selection
  const toggleModule = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(id => id !== moduleId));
    } else {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 5) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(currentStep + 1);
        
        // Update steps as completed
        const updatedSteps = onboardingSteps.map(step => 
          step.id === currentStep ? { ...step, completed: true } : step
        );
        console.log('Updated steps:', updatedSteps);
        
        // Update progress
        setProgress((currentStep / onboardingSteps.length) * 100);
      }, 1000);
    } else {
      // Final step - redirect to dashboard
      navigate('/');
    }
  };

  // Check if current step is valid to proceed
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return companySize !== '';
      case 2:
        return sector !== '';
      case 3:
        return selectedModules.length > 0;
      case 4:
        return selectedExpert !== '';
      default:
        return true;
    }
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Onboarding Fiscal</h2>
            <p className="text-gray-500 mt-1">Configurez votre espace pour un pilotage fiscal optimal</p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <ProgressSteps 
          steps={onboardingSteps} 
          currentStep={currentStep}
          onChange={(step) => step < currentStep && setCurrentStep(step)}
        />
      </div>

      {/* Step 1: Company Information */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Informations sur votre entreprise</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille de votre entreprise
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companySizes.map((size) => (
                  <div 
                    key={size.id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${companySize === size.id 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                    `}
                    onClick={() => setCompanySize(size.id)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 text-primary">
                        {size.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{size.label}</h4>
                          {companySize === size.id && (
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{size.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Informations légales
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Raison sociale
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Votre entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    SIREN
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="123 456 789"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du siège social
              </label>
              <input 
                type="text" 
                className="form-input mb-3" 
                placeholder="Adresse"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Code postal"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ville"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Pays"
                    defaultValue="France"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading || !isStepValid()}
            >
              {loading ? 'Traitement en cours...' : 'Continuer'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Activity Sector */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-6">Activité de votre entreprise</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteur d'activité principal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activitySectors.map((sectorItem) => (
                  <div 
                    key={sectorItem.id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${sector === sectorItem.id 
                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                    `}
                    onClick={() => setSector(sectorItem.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{sectorItem.label}</span>
                      {sector === sectorItem.id && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description de votre activité
              </label>
              <textarea 
                className="form-input h-24" 
                placeholder="Décrivez brièvement votre activité..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Cette information nous permettra de personnaliser votre expérience et d'adapter nos conseils fiscaux.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Régime fiscal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="taxRegime" 
                      className="h-4 w-4 text-primary border-gray-300"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">Impôt sur les sociétés (IS)</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="taxRegime" 
                      className="h-4 w-4 text-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Impôt sur le revenu (IR)</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      name="taxRegime" 
                      className="h-4 w-4 text-primary border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Micro-entreprise</span>
                  </label>
                </div>
              </div>
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
              disabled={loading || !isStepValid()}
            >
              {loading ? 'Traitement en cours...' : 'Continuer'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Modules Selection */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Modules à activer</h3>
            <p className="text-gray-500 mb-6">
              Sélectionnez les modules dont vous avez besoin. Nous avons présélectionné ceux qui sont recommandés pour votre profil.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module) => (
                <div 
                  key={module.id}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${selectedModules.includes(module.id) 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                  `}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 text-primary">
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{module.label}</h4>
                          {module.recommended && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success mt-1">
                              Recommandé
                            </span>
                          )}
                        </div>
                        <div className="w-5 h-5 rounded-full border flex items-center justify-center">
                          {selectedModules.includes(module.id) && (
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(2)}
            >
              Retour
            </Button>
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading || !isStepValid()}
            >
              {loading ? 'Traitement en cours...' : 'Continuer'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Expert Selection */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Votre expert Forvis Mazars</h3>
            <p className="text-gray-500 mb-6">
              Choisissez l'expert qui vous accompagnera. Vous pourrez échanger directement avec lui via la plateforme.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {experts.map((expert) => (
                <div 
                  key={expert.id}
                  className={`
                    border rounded-lg p-4 cursor-pointer transition-all
                    ${selectedExpert === expert.id 
                      ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                      : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                  `}
                  onClick={() => setSelectedExpert(expert.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img 
                        src={expert.img} 
                        alt={expert.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900">{expert.name}</h4>
                    <p className="text-sm text-primary mt-1">{expert.role}</p>
                    <p className="text-xs text-gray-500 mt-1">Spécialité: {expert.speciality}</p>
                    <p className="text-xs text-gray-500 mt-1">Expérience: {expert.experience}</p>
                    
                    {selectedExpert === expert.id && (
                      <div className="mt-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        Sélectionné
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h4 className="font-medium text-gray-900 mb-3">Comment souhaitez-vous interagir avec votre expert ?</h4>
              <div className="space-y-3">
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-primary border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">Messagerie intégrée</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-primary border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">Visioconférence mensuelle</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Notifications d'actualités fiscales</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(3)}
            >
              Retour
            </Button>
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading || !isStepValid()}
            >
              {loading ? 'Traitement en cours...' : 'Finaliser'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Completion */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Onboarding complété avec succès !</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Votre espace a été configuré selon vos besoins. Vous êtes prêt à commencer votre pilotage fiscal.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-6 max-w-md mx-auto mb-8">
                <div className="flex items-center justify-center mb-4">
                  <UserCog size={24} className="text-primary mr-2" />
                  <h4 className="font-medium text-gray-900">Votre expert est prêt</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {experts.find(e => e.id === selectedExpert)?.name} est désormais votre expert attitré. 
                  Il vous contactera dans les prochaines 24h pour faire connaissance.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => navigate('/expert')}
                >
                  Aller à l'espace expert
                </Button>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto mb-8">
                <h4 className="font-medium text-gray-900">Vos prochaines étapes</h4>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Découvrir votre tableau de bord</p>
                      <p className="text-xs text-gray-500">Explorez les indicateurs clés de votre entreprise</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Importer vos données</p>
                      <p className="text-xs text-gray-500">Connectez vos outils existants ou importez vos fichiers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Planifier votre première clôture</p>
                      <p className="text-xs text-gray-500">Préparez votre prochaine échéance avec votre expert</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
                onClick={() => navigate('/')}
              >
                Accéder à mon tableau de bord
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TaxOnboarding;