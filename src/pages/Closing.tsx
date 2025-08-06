import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Clock, 
  Check, 
  AlertTriangle, 
  FileText, 
  ChevronRight,
  Calendar,
  CheckCircle,
  ArrowRight,
  Download,
  BarChart
} from 'lucide-react';

const Closing: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      alert('Navigation échouée');
    }
  };

  const handleExport = (label: string) => {
    try {
      alert(`Export du rapport ${label}`);
    } catch (error) {
      alert("Erreur lors de l'export");
    }
  };

  const handleAnalysis = (label: string) => {
    try {
      alert(`Analyse ${label} à venir`);
    } catch (error) {
      alert("Erreur lors de l'analyse");
    }
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Clôture & Pilotage</h2>
            <p className="text-gray-500 mt-1">Gérez vos clôtures mensuelles et annuelles</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="accent" 
              icon={<Clock size={16} />}
              onClick={() => navigate('/closing/monthly')}
            >
              Démarrer une clôture
            </Button>
          </div>
        </div>
      </div>

      {/* Alert for pending closure */}
      <div className="mb-6">
        <div className="bg-warning/5 border-l-4 border-warning rounded-r-md p-4 flex items-start">
          <AlertTriangle size={20} className="text-warning mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Clôture mensuelle à finaliser</h4>
            <p className="text-sm text-gray-600 mt-1">
              La clôture du mois de Juin est en attente de validation.
            </p>
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/closing/monthly')}
              >
                Finaliser la clôture
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly closures section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clôtures mensuelles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            onClick={() => navigate('/closing/monthly')}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar size={20} className="text-primary mr-2" />
                <h4 className="font-medium text-gray-900">Juin 2023</h4>
              </div>
              <span className="badge badge-warning">En cours</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Factures clients</span>
                <span className="flex items-center text-success">
                  <CheckCircle size={14} className="mr-1" />
                  Complet
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Factures fournisseurs</span>
                <span className="flex items-center text-warning">
                  <AlertTriangle size={14} className="mr-1" />
                  À vérifier
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Rapprochement bancaire</span>
                <span className="flex items-center text-gray-400">
                  <Clock size={14} className="mr-1" />
                  En attente
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Button
                variant="text"
                size="sm"
                icon={<ChevronRight size={16} />}
                iconPosition="right"
                fullWidth
                onClick={() => handleNavigate('/closing/monthly')}
              >
                Continuer la clôture
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar size={20} className="text-primary mr-2" />
                <h4 className="font-medium text-gray-900">Mai 2023</h4>
              </div>
              <span className="badge badge-success">Finalisé</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Chiffre d'affaires</span>
                <span className="font-medium">25 680 €</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Résultat</span>
                <span className="font-medium">3 450 €</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Trésorerie</span>
                <span className="font-medium">42 970 €</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
              <Button
                variant="text"
                size="sm"
                icon={<FileText size={16} />}
                onClick={() => handleNavigate('/reports/2023-05')}
              >
                Voir le rapport
              </Button>
              <Button
                variant="text"
                size="sm"
                icon={<Download size={16} />}
                onClick={() => handleExport('Mai 2023')}
              >
                Exporter
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar size={20} className="text-primary mr-2" />
                <h4 className="font-medium text-gray-900">Avril 2023</h4>
              </div>
              <span className="badge badge-success">Finalisé</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Chiffre d'affaires</span>
                <span className="font-medium">22 340 €</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Résultat</span>
                <span className="font-medium">2 980 €</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Trésorerie</span>
                <span className="font-medium">38 750 €</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
              <Button
                variant="text"
                size="sm"
                icon={<FileText size={16} />}
                onClick={() => handleNavigate('/reports/2023-04')}
              >
                Voir le rapport
              </Button>
              <Button
                variant="text"
                size="sm"
                icon={<Download size={16} />}
                onClick={() => handleExport('Avril 2023')}
              >
                Exporter
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Annual closures section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clôtures annuelles</h3>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exercice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chiffre d'affaires
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Résultat
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-primary mr-2" />
                      <div className="text-sm font-medium text-gray-900">2022</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    01/01/2022 - 31/12/2022
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Finalisé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    289 750 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    37 280 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleNavigate('/reports/2022')}
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleExport('2022')}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleAnalysis('2022')}
                      >
                        <BarChart size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-primary mr-2" />
                      <div className="text-sm font-medium text-gray-900">2021</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    01/01/2021 - 31/12/2021
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Finalisé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    245 320 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    28 470 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleNavigate('/reports/2021')}
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleExport('2021')}
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        onClick={() => handleAnalysis('2021')}
                      >
                        <BarChart size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Reporting section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Rapports et analyses</h3>
          <Button
            variant="text"
            size="sm"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            onClick={() => handleNavigate('/reports')}
          >
            Voir tous les rapports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">Bilan</h4>
            <p className="text-sm text-gray-500 mt-1">Situation patrimoniale</p>
            <Button
              variant="text"
              size="sm"
              className="mt-3"
              onClick={() => handleNavigate('/reports/bilan')}
            >
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-success" />
            </div>
            <h4 className="font-medium">Compte de résultat</h4>
            <p className="text-sm text-gray-500 mt-1">Performance financière</p>
            <Button
              variant="text"
              size="sm"
              className="mt-3"
              onClick={() => handleNavigate('/reports/compte-resultat')}
            >
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Trésorerie</h4>
            <p className="text-sm text-gray-500 mt-1">Flux financiers</p>
            <Button
              variant="text"
              size="sm"
              className="mt-3"
              onClick={() => handleNavigate('/reports/tresorerie')}
            >
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Analyse fiscale</h4>
            <p className="text-sm text-gray-500 mt-1">Optimisation fiscale</p>
            <Button
              variant="text"
              size="sm"
              className="mt-3"
              onClick={() => handleNavigate('/reports/analyse-fiscale')}
            >
              Consulter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Closing;