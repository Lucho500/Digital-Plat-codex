import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  BarChart3,
  TrendingUp,
  ArrowRight,
  Download,
  Calendar,
  DollarSign,
  Users,
  Target,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 65000, expenses: 45000, profit: 20000 },
  { month: 'Fév', revenue: 59000, expenses: 42000, profit: 17000 },
  { month: 'Mar', revenue: 80000, expenses: 52000, profit: 28000 },
  { month: 'Avr', revenue: 81000, expenses: 55000, profit: 26000 },
  { month: 'Mai', revenue: 76000, expenses: 48000, profit: 28000 },
  { month: 'Jun', revenue: 84000, expenses: 53000, profit: 31000 }
];

const kpiData = [
  { month: 'Jan', value: 65 },
  { month: 'Fév', value: 59 },
  { month: 'Mar', value: 80 },
  { month: 'Avr', value: 81 },
  { month: 'Mai', value: 76 },
  { month: 'Jun', value: 84 }
];

const Strategic: React.FC = () => {
  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Pilotage Stratégique</h2>
            <p className="text-gray-500 mt-1">Analysez et pilotez votre performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Download size={16} />}
            >
              Exporter les données
            </Button>
            <Button 
              variant="accent" 
              icon={<BarChart3 size={16} />}
            >
              Nouveau rapport
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Chiffre d'affaires</p>
              <h3 className="text-2xl font-semibold mt-1">84 320 €</h3>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>+12.5% vs mois dernier</span>
              </div>
            </div>
            <DollarSign size={36} className="opacity-50" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Marge brute</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">31 450 €</h3>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp size={16} className="mr-1" />
                <span>+8.3% vs mois dernier</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <Target size={20} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Trésorerie</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">42 970 €</h3>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp size={16} className="mr-1" />
                <span>+15.2% vs mois dernier</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <DollarSign size={20} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Effectif</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">4</h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Users size={16} className="mr-1" />
                <span>Équivalent temps plein</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Users size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Performance financière</h3>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Filter size={16} />}
            >
              Filtrer
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#0F3460" 
                  fill="#0F3460" 
                  fillOpacity={0.6}
                  name="CA"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="1"
                  stroke="#E39D34" 
                  fill="#E39D34" 
                  fillOpacity={0.6}
                  name="Charges"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Répartition des revenus</h3>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<Filter size={16} />}
            >
              Filtrer
            </Button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" name="Marge" fill="#2EA043" />
                <Bar dataKey="expenses" name="Charges" fill="#E39D34" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* KPI Tracking */}
      <div className="mb-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Suivi des KPIs</h3>
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
                icon={<Filter size={16} />}
              >
                Filtrer
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Évolution du CA</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0F3460" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="CA (k€)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Répartition des charges</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="expenses" 
                      fill="#E39D34" 
                      name="Charges (k€)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">Tableaux de bord</h4>
            <p className="text-sm text-gray-500 mt-1">Voir les rapports</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target size={24} className="text-success" />
            </div>
            <h4 className="font-medium">Objectifs</h4>
            <p className="text-sm text-gray-500 mt-1">Définir les KPIs</p>
            <Button variant="text" size="sm" className="mt-3">
              Configurer
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Export</h4>
            <p className="text-sm text-gray-500 mt-1">Télécharger les données</p>
            <Button variant="text" size="sm" className="mt-3">
              Exporter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Partage</h4>
            <p className="text-sm text-gray-500 mt-1">Partager les rapports</p>
            <Button variant="text" size="sm" className="mt-3">
              Partager
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Strategic;