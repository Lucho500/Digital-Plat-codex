import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DataTable from '../components/ui/DataTable';
import Charts from '../components/ui/Charts';
import KPICard from '../components/ui/KPICard';
import KPIGrid from '../components/ui/KPIGrid';
import { 
  CreditCard,
  Plus,
  FileText,
  Download,
  TrendingUp,
  Filter,
  Calendar,
  PieChart,
  ArrowRight,
  Receipt,
  Building2,
  Car,
  Coffee,
  Clock
} from 'lucide-react';

const Expenses: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data for expenses
  const expenseData = [
    { category: 'Loyer', amount: 2500, percentage: 35 },
    { category: 'Services', amount: 1800, percentage: 25 },
    { category: 'Transport', amount: 1200, percentage: 17 },
    { category: 'Fournitures', amount: 800, percentage: 11 },
    { category: 'Autres', amount: 850, percentage: 12 }
  ];

  // Sample data for recent expenses
  const recentExpenses = [
    {
      id: 'exp1',
      date: '2023-06-28',
      description: 'Loyer Bureau',
      category: 'Loyer',
      amount: 2500,
      status: 'paid'
    },
    {
      id: 'exp2',
      date: '2023-06-25',
      description: 'Services Cloud',
      category: 'Services',
      amount: 450,
      status: 'pending'
    },
    {
      id: 'exp3',
      date: '2023-06-22',
      description: 'Carburant',
      category: 'Transport',
      amount: 180,
      status: 'paid'
    }
  ];

  const expenseColumns = [
    {
      header: 'Date',
      accessor: (row: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">
            {new Date(row.date).toLocaleDateString('fr-FR')}
          </p>
        </div>
      )
    },
    {
      header: 'Description',
      accessor: (row: any) => (
        <div className="text-sm">
          <p className="font-medium text-gray-900">{row.description}</p>
          <p className="text-gray-500">{row.category}</p>
        </div>
      )
    },
    {
      header: 'Montant',
      accessor: (row: any) => (
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {row.amount.toLocaleString()} €
          </p>
        </div>
      ),
      align: 'right'
    },
    {
      header: 'Statut',
      accessor: (row: any) => (
        <div className="flex justify-end">
          <span className={`badge ${
            row.status === 'paid' ? 'badge-success' : 'badge-warning'
          }`}>
            {row.status === 'paid' ? 'Payé' : 'En attente'}
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
            <h2 className="text-2xl font-medium text-gray-900">Dépenses</h2>
            <p className="text-gray-500 mt-1">Gérez et analysez vos dépenses</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Plus size={16} />}
            >
              Nouvelle dépense
            </Button>
            <Button 
              variant="accent" 
              icon={<FileText size={16} />}
            >
              Générer un rapport
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <KPIGrid columns={4} gap="md">
        <KPICard
          title="Total dépenses"
          value="7 150 €"
          change={{ value: 5.2, type: 'decrease', period: 'vs mois dernier' }}
          icon={<CreditCard size={20} />}
          variant="primary"
        />

        <KPICard
          title="Moyenne mensuelle"
          value="6 850 €"
          icon={<TrendingUp size={20} />}
          variant="default"
        />

        <KPICard
          title="Plus grosse dépense"
          value="2 500 €"
          subtitle="Loyer Bureau"
          icon={<Building2 size={20} />}
          variant="warning"
        />

        <KPICard
          title="Dépenses en attente"
          value="450 €"
          subtitle="1 facture"
          icon={<Clock size={20} />}
          variant="error"
        />
      </KPIGrid>

      {/* Expense Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Répartition des dépenses</h3>
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
              data={expenseData}
              height={300}
              xKey="category"
              yKeys={[
                { key: 'amount', name: 'Montant', color: '#0F3460' }
              ]}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Par catégorie</h3>
            <Button 
              variant="secondary" 
              size="sm"
              icon={<PieChart size={16} />}
            >
              Vue détaillée
            </Button>
          </div>
          
          <div className="space-y-4">
            {expenseData.map((category) => (
              <div key={category.category} className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {category.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {category.amount.toLocaleString()} €
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm text-gray-500">
                  {category.percentage}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Expenses */}
      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Dépenses récentes</h3>
            <Button 
              variant="text" 
              size="sm" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Voir toutes les dépenses
            </Button>
          </div>

          <DataTable
            columns={expenseColumns}
            data={recentExpenses}
            pageSize={5}
          />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Receipt size={24} className="text-primary" />
          </div>
          <h4 className="font-medium">Note de frais</h4>
          <p className="text-sm text-gray-500 mt-1">Créer une note</p>
          <Button variant="text" size="sm" className="mt-3">
            Créer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building2 size={24} className="text-success" />
          </div>
          <h4 className="font-medium">Loyers</h4>
          <p className="text-sm text-gray-500 mt-1">Gérer les loyers</p>
          <Button variant="text" size="sm" className="mt-3">
            Gérer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Car size={24} className="text-warning" />
          </div>
          <h4 className="font-medium">Transport</h4>
          <p className="text-sm text-gray-500 mt-1">Frais kilométriques</p>
          <Button variant="text" size="sm" className="mt-3">
            Calculer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Coffee size={24} className="text-accent" />
          </div>
          <h4 className="font-medium">Frais divers</h4>
          <p className="text-sm text-gray-500 mt-1">Autres dépenses</p>
          <Button variant="text" size="sm" className="mt-3">
            Ajouter
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Expenses;