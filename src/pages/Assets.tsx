import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DataTable from '../components/ui/DataTable';
import KPICard from '../components/ui/KPICard';
import KPIGrid from '../components/ui/KPIGrid';
import { 
  Box,
  Plus,
  FileText,
  Download,
  TrendingUp,
  Filter,
  Calendar,
  PieChart,
  ArrowRight,
  Settings,
  Trash2,
  Edit,
  Clock,
  Building2,
  Car,
  Laptop
} from 'lucide-react';

const Assets: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Sample data for assets
  const assets = [
    {
      id: 'ast1',
      name: 'Bureau principal',
      category: 'Immobilier',
      purchaseDate: '2021-06-15',
      purchasePrice: 250000,
      currentValue: 275000,
      status: 'active'
    },
    {
      id: 'ast2',
      name: 'Véhicule de fonction',
      category: 'Véhicules',
      purchaseDate: '2022-03-10',
      purchasePrice: 35000,
      currentValue: 28000,
      status: 'active'
    },
    {
      id: 'ast3',
      name: 'Équipement informatique',
      category: 'Matériel',
      purchaseDate: '2023-01-20',
      purchasePrice: 15000,
      currentValue: 12000,
      status: 'active'
    }
  ];

  const assetColumns = [
    {
      header: 'Actif',
      accessor: (row: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary">
            {row.category === 'Immobilier' ? <Building2 size={20} /> :
             row.category === 'Véhicules' ? <Car size={20} /> :
             <Laptop size={20} />}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Date d\'acquisition',
      accessor: (row: any) => (
        <div className="text-sm text-gray-900">
          {new Date(row.purchaseDate).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      header: 'Valeur d\'achat',
      accessor: (row: any) => (
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {row.purchasePrice.toLocaleString()} €
          </div>
        </div>
      ),
      align: 'right'
    },
    {
      header: 'Valeur actuelle',
      accessor: (row: any) => {
        const variation = ((row.currentValue - row.purchasePrice) / row.purchasePrice) * 100;
        return (
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">
              {row.currentValue.toLocaleString()} €
            </div>
            <div className={`text-xs ${variation >= 0 ? 'text-success' : 'text-error'}`}>
              {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
            </div>
          </div>
        );
      },
      align: 'right'
    },
    {
      header: 'Actions',
      accessor: (row: any) => (
        <div className="flex justify-end space-x-2">
          <Button variant="text" size="sm" icon={<Edit size={16} />} />
          <Button variant="text" size="sm" icon={<Trash2 size={16} />} />
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
            <h2 className="text-2xl font-medium text-gray-900">Actifs</h2>
            <p className="text-gray-500 mt-1">Gérez vos actifs et immobilisations</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Plus size={16} />}
            >
              Nouvel actif
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
          title="Valeur totale"
          value="315 000 €"
          change={5.2}
          trend="up"
          description="Actifs en cours"
        />

        <KPICard
          title="Plus-value latente"
          value="15 000 €"
          change={2.8}
          trend="up"
          description="Depuis l'acquisition"
        />

        <KPICard
          title="Amortissements"
          value="45 000 €"
          change={8.5}
          trend="up"
          description="Cumul"
        />

        <KPICard
          title="Actifs"
          value="12"
          description="3 catégories"
        />
      </KPIGrid>

      {/* Asset List */}
      <div className="mt-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Liste des actifs</h3>
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

          <DataTable
            columns={assetColumns}
            data={assets}
            pageSize={10}
          />
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus size={24} className="text-primary" />
          </div>
          <h4 className="font-medium">Nouvel actif</h4>
          <p className="text-sm text-gray-500 mt-1">Ajouter un actif</p>
          <Button variant="text" size="sm" className="mt-3">
            Ajouter
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <PieChart size={24} className="text-success" />
          </div>
          <h4 className="font-medium">Amortissements</h4>
          <p className="text-sm text-gray-500 mt-1">Gérer les plans</p>
          <Button variant="text" size="sm" className="mt-3">
            Configurer
          </Button>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock size={24} className="text-warning" />
          </div>
          <h4 className="font-medium">Historique</h4>
          <p className="text-sm text-gray-500 mt-1">Voir l'historique</p>
          <Button variant="text" size="sm" className="mt-3">
            Consulter
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

export default Assets;