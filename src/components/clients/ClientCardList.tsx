import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';

const ClientCardList: React.FC = () => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium text-gray-900">Clients actifs</h3>
      <Button variant="text" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">
        Voir tous les clients
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-lg font-medium">AC</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">ABC Corp</h4>
              <p className="text-sm text-gray-500">Client depuis 2021</p>
            </div>
          </div>
          <span className="badge badge-success">Actif</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">CA 2023</span>
            <span className="font-medium">42 300 €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Factures en cours</span>
            <span className="font-medium">2</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Délai de paiement</span>
            <span className="font-medium">15 jours</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Button variant="text" size="sm" icon={<ChevronRight size={16} />} iconPosition="right" fullWidth>
            Voir le détail
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-lg font-medium">XI</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">XYZ Inc</h4>
              <p className="text-sm text-gray-500">Client depuis 2022</p>
            </div>
          </div>
          <span className="badge badge-success">Actif</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">CA 2023</span>
            <span className="font-medium">28 750 €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Factures en cours</span>
            <span className="font-medium">1</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Délai de paiement</span>
            <span className="font-medium">30 jours</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Button variant="text" size="sm" icon={<ChevronRight size={16} />} iconPosition="right" fullWidth>
            Voir le détail
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="text-lg font-medium">TS</span>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-gray-900">Tech Solutions</h4>
              <p className="text-sm text-gray-500">Client depuis 2023</p>
            </div>
          </div>
          <span className="badge badge-warning">En attente</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">CA 2023</span>
            <span className="font-medium">12 450 €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Factures en cours</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Délai de paiement</span>
            <span className="font-medium">45 jours</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Button variant="text" size="sm" icon={<ChevronRight size={16} />} iconPosition="right" fullWidth>
            Voir le détail
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

export default ClientCardList;
