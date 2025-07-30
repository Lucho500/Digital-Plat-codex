import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Users, 
  Plus, 
  FileText, 
  Download, 
  TrendingUp, 
  Clock,
  ChevronRight,
  CreditCard,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

const Clients: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);

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
      <div className="mb-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Factures récentes</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="form-input py-1.5 pl-8 pr-3 text-sm"
                />
                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                icon={<Filter size={16} />}
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filtrer
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Numéro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    FACT-2023-089
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">AC</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">ABC Corp</div>
                        <div className="text-sm text-gray-500">contact@abccorp.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    28/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Payée</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    3 450 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    FACT-2023-088
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">XI</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">XYZ Inc</div>
                        <div className="text-sm text-gray-500">billing@xyzinc.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    25/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-warning">En attente</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    2 780 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    FACT-2023-087
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">TS</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Tech Solutions</div>
                        <div className="text-sm text-gray-500">finance@techsolutions.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    22/06/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-error">Retard</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    4 120 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Affichage de 3 factures sur 28</p>
            <Button 
              variant="text" 
              size="sm" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
            >
              Voir toutes les factures
            </Button>
          </div>
        </Card>
      </div>

      {/* Client List */}
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
              <Button 
                variant="text" 
                size="sm" 
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
                fullWidth
              >
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
              <Button 
                variant="text" 
                size="sm" 
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
                fullWidth
              >
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
              <Button 
                variant="text" 
                size="sm" 
                icon={<ChevronRight size={16} />} 
                iconPosition="right"
                fullWidth
              >
                Voir le détail
              </Button>
            </div>
          </Card>
        </div>
      </div>

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