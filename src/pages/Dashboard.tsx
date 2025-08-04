import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Charts from '../components/ui/Charts';
import MaxAssistant from '../components/ui/MaxAssistant';
import { useToast } from '../contexts/ToastContext';
import SuggestedModulesWidget from '../components/widgets/SuggestedModulesWidget';
import { useAuthContext } from '../contexts/AuthContext';
import { 
  Wallet,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  MessageSquare,
  Calendar,
  BarChart3,
  ArrowRight,
  Clock,
  DollarSign,
  Sparkles,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  TrendingDown,
  FileText,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { company } = useAuthContext();
  // Sample data for cash flow chart
  const cashFlowData = [
    { date: '01/07', inflow: 45000, outflow: 32000, balance: 13000 },
    { date: '15/07', inflow: 38000, outflow: 35000, balance: 16000 },
    { date: '01/08', inflow: 52000, outflow: 48000, balance: 20000 },
    { date: '15/08', inflow: 41000, outflow: 39000, balance: 22000 },
    { date: '01/09', inflow: 48000, outflow: 42000, balance: 28000 },
    { date: '15/09', inflow: 55000, outflow: 45000, balance: 38000 }
  ];

  // Sample data for pipeline chart
  const pipelineData = [
    { stage: 'Signé', value: 120000, probability: 100 },
    { stage: 'Négociation', value: 85000, probability: 75 },
    { stage: 'Proposition', value: 150000, probability: 45 },
    { stage: 'Qualification', value: 200000, probability: 25 }
  ];

  // Critical alerts
  const criticalAlerts = [
    {
      id: 1,
      title: 'Déclaration TVA T2 2023',
      deadline: '15/07/2023',
      type: 'fiscal',
      priority: 'high',
      amount: 12450,
      impact: 'critique',
      description: 'Date limite de déclaration et paiement'
    },
    {
      id: 2,
      title: 'Paiement des salaires',
      deadline: '28/06/2023',
      type: 'social',
      priority: 'medium',
      amount: 14520,
      impact: 'important',
      description: 'Virement des salaires à préparer'
    },
    {
      id: 3,
      title: 'Échéance emprunt',
      deadline: '30/07/2023',
      type: 'finance',
      priority: 'high',
      amount: 8500,
      impact: 'critique',
      description: 'Prélèvement automatique prévu'
    }
  ];

  // Quick actions for the floating menu
  const quickActions = [
    { 
      label: 'Déclarer la TVA',
      icon: <FileText size={16} />,
      href: '/taxation'
    },
    {
      label: 'Payer les salaires',
      icon: <DollarSign size={16} />,
      href: '/salaries'
    },
    {
      label: 'Voir la trésorerie',
      icon: <Wallet size={16} />,
      href: '/treasury'
    }
  ];

  return (
    <div className="animate-slide-in-up">
      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={() => addToast('Exemple de toast', 'success')}
        >
          Tester les toasts
        </Button>
      </div>
      {/* Floating Quick Actions Menu */}
      <div className="fixed top-24 right-6 z-40 space-y-2">
        {quickActions.map((action, index) => (
          <div key={index} className="group relative">
            <Button
              variant="primary"
              className="!rounded-full !p-3 shadow-lg"
              icon={action.icon}
              onClick={() => navigate(action.href)}
            />
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {action.label}
            </div>
          </div>
        ))}
      </div>

      {/* Main KPIs - Anxiogenic Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Cash & Runway */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <div className="absolute top-0 right-0 p-2">
            <Button 
              variant="text" 
              size="sm"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Détails
            </Button>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Wallet size={20} className="mr-2 text-primary" />
            Trésorerie & Runway
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Solde disponible</span>
                <div className="flex items-center">
                  <span className="text-2xl font-semibold text-gray-900">45 230 €</span>
                  <div className="ml-2 flex items-center text-success text-sm">
                    <ArrowUpRight size={16} />
                    <span>+12.5%</span>
                  </div>
                </div>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-success to-success/80 rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Seuil critique : 25 000 €</span>
                <span>Objectif : 70 000 €</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/5 rounded-lg p-3 border border-success/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Runway</span>
                  <div className="flex items-center">
                    <Zap size={16} className="text-success mr-1" />
                    <span className="text-lg font-medium text-success">4.5 mois</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Point mort : Oct 2023</div>
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="bg-warning/5 rounded-lg p-3 border border-warning/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Burn rate</span>
                  <div className="flex items-center">
                    <TrendingDown size={16} className="text-warning mr-1" />
                    <span className="text-lg font-medium text-warning">-12.4k€</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Mensuel moyen</div>
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Prochaine échéance importante</span>
                <span className="font-medium text-primary">15/07 - TVA (12 450 €)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Operating Results */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <div className="absolute top-0 right-0 p-2">
            <Button 
              variant="text" 
              size="sm"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Détails
            </Button>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-primary" />
            Résultat & Marge
          </h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="h-32 bg-gray-50 rounded-lg relative overflow-hidden border border-gray-100">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-success to-success/50 rounded-lg transition-all duration-500"
                  style={{ height: '65%' }}
                >
                  <div className="absolute -top-6 left-0 right-0 text-center">
                    <span className="text-sm font-medium text-success">+12.5%</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">31 450 €</div>
                    <div className="text-sm text-gray-500">Résultat net</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">vs. N-1</span>
                <div className="flex items-center text-success">
                  <ArrowUpRight size={14} className="mr-1" />
                  <span>+15.3%</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="h-32 bg-gray-50 rounded-lg relative overflow-hidden border border-gray-100">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-primary/50 rounded-lg transition-all duration-500"
                  style={{ height: '45%' }}
                >
                  <div className="absolute -top-6 left-0 right-0 text-center">
                    <span className="text-sm font-medium text-primary">8.3%</span>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-900">8.3%</div>
                    <div className="text-sm text-gray-500">Marge op.</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Objectif</span>
                <span className="font-medium text-primary">10%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">CA mensuel</div>
                <div className="text-base font-medium">84 320 €</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Charges</div>
                <div className="text-base font-medium">52 870 €</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Prévision</div>
                <div className="text-base font-medium text-primary">+5.2%</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Critical Alerts */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <div className="absolute top-0 right-0 p-2">
            <Button 
              variant="text" 
              size="sm"
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Tout voir
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <AlertCircle size={20} className="mr-2 text-primary" />
              Alertes critiques
            </h3>
            <span className="badge badge-error">3 urgentes</span>
          </div>
          
          <div className="space-y-3">
            {criticalAlerts.map(alert => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.priority === 'high' 
                    ? 'border-error/30 bg-error/5' 
                    : alert.priority === 'medium'
                    ? 'border-warning/30 bg-warning/5'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <AlertTriangle 
                      size={16} 
                      className={
                        alert.priority === 'high' 
                          ? 'text-error' 
                          : alert.priority === 'medium'
                          ? 'text-warning'
                          : 'text-gray-400'
                      } 
                    />
                    <span className="ml-2 text-sm font-medium text-gray-900">{alert.title}</span>
                  </div>
                  <span className="text-sm font-medium">{alert.amount.toLocaleString()} €</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1 text-gray-400" />
                    <span className="text-gray-500">Échéance : {alert.deadline}</span>
                  </div>
                  <Button 
                    variant="text" 
                    size="sm"
                    className="text-xs"
                    icon={<ArrowRight size={12} />}
                    iconPosition="right"
                  >
                    Traiter maintenant
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button 
              variant="secondary" 
              size="sm" 
              fullWidth
              icon={<Calendar size={16} />}
            >
              Voir le calendrier des échéances
            </Button>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cash Flow Chart */}
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Wallet size={20} className="mr-2 text-primary" />
              Flux de trésorerie (90 jours)
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                icon={<Calendar size={16} />}
              >
                Période
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                icon={<Target size={16} />}
              >
                Point critique
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <Charts
              type="area"
              data={cashFlowData}
              height={300}
              xKey="date"
              yKeys={[
                { key: 'inflow', name: 'Entrées', color: '#2EA043' },
                { key: 'outflow', name: 'Sorties', color: '#D22E2E' },
                { key: 'balance', name: 'Solde', color: '#0F3460' }
              ]}
              stacked={false}
            />
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Entrées prévues</div>
              <div className="text-lg font-medium text-success">+45 000 €</div>
              <div className="text-xs text-gray-400 mt-1">7 factures à encaisser</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Sorties prévues</div>
              <div className="text-lg font-medium text-error">-35 450 €</div>
              <div className="text-xs text-gray-400 mt-1">4 échéances à venir</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Solde projeté</div>
              <div className="text-lg font-medium">54 780 €</div>
              <div className="text-xs text-success mt-1">+21% vs. mois dernier</div>
            </div>
          </div>
        </Card>

        {/* Pipeline Chart */}
        <Card className="bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BarChart3 size={20} className="mr-2 text-primary" />
              Pipeline commercial
            </h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                icon={<BarChart3 size={16} />}
              >
                Détails
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <Charts
              type="bar"
              data={pipelineData}
              height={300}
              xKey="stage"
              yKeys={[
                { key: 'value', name: 'Montant', color: '#0F3460' }
              ]}
            />
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500">Pipeline total</div>
              <div className="text-lg font-medium">555 000 €</div>
              <div className="text-xs text-success mt-1">12 opportunités</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Taux conversion</div>
              <div className="text-lg font-medium text-success">42%</div>
              <div className="text-xs text-success mt-1">+5pts vs. N-1</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Prévision CA</div>
              <div className="text-lg font-medium text-primary">233 100 €</div>
              <div className="text-xs text-success mt-1">+15% vs. objectif</div>
            </div>
          </div>
        </Card>
      </div>
        <SuggestedModulesWidget accountId={company?.id || ''} />

        {/* Max Assistant */}
        <MaxAssistant />
      </div>
    );
  };

export default Dashboard;