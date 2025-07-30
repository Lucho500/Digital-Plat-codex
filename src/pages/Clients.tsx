import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InvoiceTable from '../components/clients/InvoiceTable';
import ClientCardList from '../components/clients/ClientCardList';
import {
  Users,
  Plus,
  FileText,
  Download,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Clients: React.FC = () => {

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Clients & Facturation</h2>
            <p className="text-gray-500 mt-1">Gérez vos clients et votre facturation</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<Plus size={16} />}
            >
              Nouveau client
            </Button>
            <Button 
              variant="accent" 
              icon={<FileText size={16} />}
            >
              Créer une facture
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Chiffre d'affaires</p>
              <h3 className="text-2xl font-semibold mt-1">127 850 €</h3>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>+8.3% vs mois dernier</span>
              </div>
            </div>
            <FileText size={36} className="opacity-50" />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Factures en attente</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">12 450 €</h3>
              <div className="flex items-center mt-2 text-sm text-warning">
                <Clock size={16} className="mr-1" />
                <span>3 factures à relancer</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <AlertTriangle size={20} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Clients actifs</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-1">24</h3>
              <div className="flex items-center mt-2 text-sm text-success">
                <TrendingUp size={16} className="mr-1" />
                <span>+2 ce mois-ci</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <Users size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Invoices */}
      <InvoiceTable />

      {/* Client List */}
      <ClientCardList />

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">Nouvelle facture</h4>
            <p className="text-sm text-gray-500 mt-1">Créer une facture</p>
            <Button variant="text" size="sm" className="mt-3">
              Commencer
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={24} className="text-success" />
            </div>
            <h4 className="font-medium">Nouveau client</h4>
            <p className="text-sm text-gray-500 mt-1">Ajouter un client</p>
            <Button variant="text" size="sm" className="mt-3">
              Ajouter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Relances</h4>
            <p className="text-sm text-gray-500 mt-1">Gérer les relances</p>
            <Button variant="text" size="sm" className="mt-3">
              Voir
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Exports</h4>
            <p className="text-sm text-gray-500 mt-1">Exporter les données</p>
            <Button variant="text" size="sm" className="mt-3">
              Exporter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Clients;