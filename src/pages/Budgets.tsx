import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DataTable from '../components/ui/DataTable';
import Charts from '../components/ui/Charts';
import KPICard from '../components/ui/KPICard';
import KPIGrid from '../components/ui/KPIGrid';
import { 
  Wallet,
  Plus,
  FileText,
  Download,
  TrendingUp,
  Filter,
  Calendar,
  PieChart,
  ArrowRight,
  Target,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';

const Budgets: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data for budget tracking
  const budgetData = [
    { category: 'Loyer', budget: 2500, actual: 2500, variance: 0 },
    { category: 'Services', budget: 2000, actual: 1800, variance: 200 },
    { category: 'Transport', budget: 1500, actual: 1200, variance: 300 },
    { category: 'Fournitures', budget: 1000, actual: 800, variance: 200 },
    { category: 'Autres', budget: 1000, actual: 850, variance: 150 }
  ];

  // Sample data for budget history
  const budgetHistory = [
    { month: 'Jan', planned: 8000, actual: 7800 },
    { month: 'Fév', planned: 8000, actual: 7600 },
    { month: 'Mar', planned: 8000, actual: 8200 },
    { month: 'Avr', planned: 8000, actual: 7900 },
    { month: 'Mai', planned: 8000, actual: 7500 },
    { month: 'Jun', planned: 8000, actual: 7150 }
  ];

  const budgetColumns = [
    {
      header: 'Catégorie',
      accessor: (row: any) => (
        <div className="text-sm font-medium text-gray-900">
          {row.category}
        </div>
      )
    },
    {
      header: 'Budget',
      accessor: (row: any) => (
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {row.budget.toLocaleString()} €
          </p>
        </div>
      ),
      align: 'right'
    },
    {
      header: 'Réel',
      accessor: (row: any) => (
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {row.actual.toLocaleString()} €
          </p>
        </div>
      ),
      align: 'right'
    },
    {
      header: 'Variance',
      accessor: (row: any) => (
        <div className="text-right flex items-center justify-end">
          <span className={`text-sm font-medium ${
            row.variance > 0 ? 'text-success' : row.variance < 0 ? 'text-error' : 'text-gray-500'
          }`}>
            {row.variance > 0 ? '+' : ''}{row.variance.toLocaleString()} €
          </span>
        </div>
      ),
      align: 'right'
    }
  ];

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Budgets</h2>
            <p className="text-gray-500 mt-1">Gérez vos budgets et suivez vos dépenses</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Plus size={16} />}
            >
              Nouveau budget
            </Button>
            <Button 
              variant="accent" 
              icon={<FileText size={16} />}
            >
              Rapport budgétaire
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <KPIGrid columns={4} gap="md">
        <KPICard
          title="Budget mensuel"
          value="8 000 €"
          icon={<Wallet size={20} />}
          variant="primary"
        />

        <KPICard
          title="Dépenses réelles"
          value="7 150 €"
          change={{ value: 10.6, type: 'decrease', period: 'vs budget' }}
          icon={<TrendingUp size={20} />}
          variant="success"
        />

        <KPICard
          title="Variance"
          value="850 €"
          subtitle="Économies"
          icon={<Target size={20} />}
          variant="warning"
        />

        <KPICard
          title="Catégories"
          value="5/5"
          subtitle="Dans le budget"
          icon={<CheckCircle size={20} />}
          variant="default"
        />
      </KPIGrid>

      {/* Budget Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Suivi budgétaire</h3>
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
          
          <div className="h-80">
            <Charts
              type="bar"
              data={budgetHistory}
              height={300}
              xKey="month"
              yKeys={[
                { key: 'planned', name: 'Budget', color: '#0F3460' },
                { key: 'actual', name: 'Réel', color: '#2EA043' }
              ]}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Répartition par catégorie</h3>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<PieChart size={16} />}
            >
              Vue détaillée
            </Button>
          </div>
          
          <div className="space-y-4">
            {budgetData.map((category) => (
              <div key={category.category} className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {category.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {category.actual.toLocaleString()} € / {category.budget.toLocaleString()} €
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`rounded-full h-2 ${
                        category.actual <= category.budget ? 'bg-success' : 'bg-error'
                      }`}
                      style={{ width: `${(category.actual / category.budget) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className={`ml-4 text-sm ${
                  category.actual <= category.budget ? 'text-success' : 'text-error'
                }`}>
                  {Math.round((category.actual / category.budget) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Budget Details */}
      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Détail des budgets</h3>
            <Button 
              variant="text" 
              size="sm" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Voir l'historique
            </Button>
          </div>

          <DataTable
            columns={budgetColumns}
            data={budgetData}
            pageSize={5}
          />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus size={24} className="text-primary" />
          </div>
          <h4 className="font-medium">Nouveau budget</h4>
          <p className="text-sm text-gray-500 mt-1">Créer un budget</p>
          <Button variant="text" size="sm" className="mt-3">
            Créer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target size={24} className="text-success" />
          </div>
          <h4 className="font-medium">Objectifs</h4>
          <p className="text-sm text-gray-500 mt-1">Définir des objectifs</p>
          <Button variant="text" size="sm" className="mt-3">
            Configurer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertTriangle size={24} className="text-warning" />
          </div>
          <h4 className="font-medium">Alertes</h4>
          <p className="text-sm text-gray-500 mt-1">Gérer les alertes</p>
          <Button variant="text" size="sm" className="mt-3">
            Paramétrer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Settings size={24} className="text-accent" />
          </div>
          <h4 className="font-medium">Paramètres</h4>
          <p className="text-sm text-gray-500 mt-1">Configuration</p>
          <Button variant="text" size="sm" className="mt-3">
            Modifier
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Budgets;