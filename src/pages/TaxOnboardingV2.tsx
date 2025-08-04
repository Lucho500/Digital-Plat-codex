import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { logOnboardingEvent } from '../lib/hooks/useAnalytics';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressSteps from '../components/ui/ProgressSteps';
import CompanyActivityStep from '../flows/onboarding/CompanyActivityStep';
import Modal from '../components/ui/Modal';
import { supabase } from '../lib/supabase';
import { fetchSirene } from '../lib/api/sirene';
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

// Define the steps for onboarding V2
const onboardingSteps = [
  { id: 1, label: 'Entreprise & Activité', completed: false },
  { id: 2, label: 'Modules', completed: false },
  { id: 3, label: 'Expert', completed: false },
  { id: 4, label: 'Finalisation', completed: false }
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
  const [resumeModal, setResumeModal] = useState(false);
  const [savedProgress, setSavedProgress] = useState<{ currentStep: number; formData: any } | null>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Form state
  const [companySize, setCompanySize] = useState('');
  const [sector, setSector] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [legalName, setLegalName] = useState('');
  const [siren, setSiren] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [taxRegime, setTaxRegime] = useState('is');

  const qrEnabled = import.meta.env.VITE_ONBOARDING_QR === 'true';
  const sessionId =
    qrEnabled && typeof window !== 'undefined'
      ? localStorage.getItem('ocrSessionId')
      : null;
  const [ocrConfirmed, setOcrConfirmed] = useState(false);
  
  // Initialize with recommended modules
  useEffect(() => {
    const recommended = modules
      .filter(module => module.recommended)
      .map(module => module.id);
    setSelectedModules(recommended);
  }, []);

  const { user } = useAuthContext();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (user) {
      logOnboardingEvent('stepStarted', { stepId: currentStep, userId: user.id });
    }
  }, [currentStep, user]);

  useEffect(() => {
    async function loadProgress() {
      let progressData: { currentStep: number; formData: any } | null = null;
      const local = localStorage.getItem('taxOnboardingV2');
      if (local) {
        try {
          progressData = JSON.parse(local);
        } catch {
          /* ignore */
        }
      }
      if (user) {
        const { data } = await supabase
          .from('onboarding_progress')
          .select('current_step, form_data, completed')
          .eq('user_id', user.id)
          .single();
        if (data && !data.completed) {
          progressData = { currentStep: data.current_step, formData: data.form_data };
        }
      }
      if (progressData) {
        setSavedProgress(progressData);
        setResumeModal(true);
      }
    }
    loadProgress();
  }, [user]);

  // Toggle module selection
  const toggleModule = (moduleId: string) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(id => id !== moduleId));
    } else {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  // Auto-fill company data
  const handleAutoFill = async () => {
    if (!siren) return;
    try {
      const data = await fetchSirene(siren);
      setLegalName(data.legalName);
      setAddress(data.address);
      setPostalCode(data.postalCode);
      setCity(data.city);
    } catch (e) {
      console.error(e);
    }
  };

  const clearProgressData = async () => {
    localStorage.removeItem('taxOnboardingV2');
    if (user) {
      await supabase.from('onboarding_progress').delete().eq('user_id', user.id);
    }
  };

  const saveProgress = (step: number) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    const formData = {
      companySize,
      sector,
      selectedModules,
      selectedExpert,
      legalName,
      siren,
      address,
      postalCode,
      city,
      activityDesc,
      taxRegime
    };
    saveTimer.current = setTimeout(async () => {
      localStorage.setItem('taxOnboardingV2', JSON.stringify({ currentStep: step, formData }));
      await logOnboardingEvent('progressSaved', { stepId: step, userId: user?.id ?? null });
      if (user) {
        await supabase.from('onboarding_progress').upsert({
          user_id: user.id,
          current_step: step,
          form_data: formData,
          completed: false
        });
      }
    }, 500);
  };

  const completeOnboarding = async (analytics: { totalTime: number; stepsCompleted: number; skippedSteps: number }) => {
    await logOnboardingEvent('onboardingCompleted', {
      stepId: currentStep,
      userId: user?.id ?? null,
      ...analytics
    });
    await clearProgressData();
    if (user) {
      await supabase.from('onboarding_progress').upsert({
        user_id: user.id,
        current_step: currentStep,
        form_data: {},
        completed: true
      });
    }
  };

  const resumeProgress = () => {
    if (!savedProgress) return;
    const data = savedProgress.formData || {};
    setCurrentStep(savedProgress.currentStep);
    setCompanySize(data.companySize || '');
    setSector(data.sector || '');
    setSelectedModules(data.selectedModules || []);
    setSelectedExpert(data.selectedExpert || '');
    setLegalName(data.legalName || '');
    setSiren(data.siren || '');
    setAddress(data.address || '');
    setPostalCode(data.postalCode || '');
    setCity(data.city || '');
    setActivityDesc(data.activityDesc || '');
    setTaxRegime(data.taxRegime || 'is');
    setResumeModal(false);
    logOnboardingEvent('progressResumed', { stepId: savedProgress.currentStep, userId: user?.id ?? null });
  };

  const discardProgress = async () => {
    await clearProgressData();
    setResumeModal(false);
    if (savedProgress) {
      await logOnboardingEvent('progressDiscarded', { stepId: savedProgress.currentStep, userId: user?.id ?? null });
    }
  };

  // Handle next step
  const handleNextStep = async () => {
    if (currentStep < onboardingSteps.length) {
      setLoading(true);
      await logOnboardingEvent('stepCompleted', { stepId: currentStep, userId: user?.id ?? null });
      const next = currentStep + 1;
      setCurrentStep(next);
      setProgress((currentStep / onboardingSteps.length) * 100);
      saveProgress(next);
      setLoading(false);
    } else {
      await completeOnboarding({
        totalTime: Date.now() - startTimeRef.current,
        stepsCompleted: onboardingSteps.length,
        skippedSteps: 0
      });
      navigate('/onboarding/success', {
        state: {
          name: legalName || 'Utilisateur',
          modules: selectedModules,
          expert: experts.find(e => e.id === selectedExpert) || null,
          totalTime: Date.now() - startTimeRef.current,
          stepsCompleted: onboardingSteps.length,
          skippedSteps: 0
        }
      });
    }
  };

  // Check if current step is valid to proceed
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return companySize !== '' && sector !== '' && (!qrEnabled || ocrConfirmed);
      case 2:
        return selectedModules.length > 0;
      case 3:
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

      {/* Step 1: Company & Activity */}
      {currentStep === 1 && (
        <>
          <CompanyActivityStep
            companySize={companySize}
            setCompanySize={setCompanySize}
            sector={sector}
            setSector={setSector}
            legalName={legalName}
            setLegalName={setLegalName}
            siren={siren}
            setSiren={setSiren}
            address={address}
            setAddress={setAddress}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            city={city}
            setCity={setCity}
            activityDesc={activityDesc}
            setActivityDesc={setActivityDesc}
            taxRegime={taxRegime}
            setTaxRegime={setTaxRegime}
            activitySectors={activitySectors}
            companySizes={companySizes}
            onAutoFill={handleAutoFill}
            sessionId={sessionId}
            onAllConfirmedChange={setOcrConfirmed}
          />
          <div className="flex justify-end mt-6">
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
        </>
      )}

      {/* Step 2: Modules Selection */}
      {currentStep === 2 && (
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

      {/* Step 3: Expert Selection */}
      {currentStep === 3 && (
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
              {loading ? 'Traitement en cours...' : 'Finaliser'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Completion */}
      {currentStep === 4 && (
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
                onClick={async () => {
                  await completeOnboarding({
                    totalTime: Date.now() - startTimeRef.current,
                    stepsCompleted: onboardingSteps.length,
                    skippedSteps: 0
                  });
                  navigate('/onboarding/success', {
                    state: {
                      name: legalName || 'Utilisateur',
                      modules: selectedModules,
                      expert: experts.find(e => e.id === selectedExpert) || null,
                      totalTime: Date.now() - startTimeRef.current,
                      stepsCompleted: onboardingSteps.length,
                      skippedSteps: 0
                    }
                  });
                }}
              >
                Accéder à mon tableau de bord
              </Button>
            </div>
          </Card>
        </div>
      )}
      <Modal
        isOpen={resumeModal}
        onClose={discardProgress}
        title="Reprendre l'onboarding"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={discardProgress}>Non</Button>
            <Button variant="primary" onClick={resumeProgress}>Oui</Button>
          </div>
        }
      >
        <p className="text-sm text-gray-600">Souhaitez-vous reprendre là où vous vous êtes arrêté ?</p>
      </Modal>
    </div>
  );
};

export default TaxOnboarding;