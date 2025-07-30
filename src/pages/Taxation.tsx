import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  FileCheck,
  Plus,
  ArrowRight,
  Calendar,
  AlertTriangle,
  Clock,
  Download,
  FileText,
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  UserCog
} from 'lucide-react';

const Taxation: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Fiscalité & Admin</h2>
            <p className="text-gray-500 mt-1">Gérez vos obligations fiscales</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<UserCog size={16} />}
            >
              Contacter mon expert
            </Button>
            <Button 
              variant="accent" 
              icon={<Plus size={16} />}
            >
              Nouvelle déclaration
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines Alert */}
      <div className="mb-6">
        <div className="bg-warning/5 border-l-4 border-warning rounded-r-md p-4 flex items-start">
          <AlertTriangle size={20} className="text-warning mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Échéances à venir</h4>
            <p className="text-sm text-gray-600 mt-1">
              Déclaration TVA du 2ème trimestre à soumettre avant le 15/07/2023
            </p>
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm"
              >
                Préparer la déclaration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Calendar */}
      <div className="mb-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Calendrier fiscal</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedPeriod === 'current' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedPeriod('current')}
              >
                Trimestre en cours
              </Button>
              <Button 
                variant={selectedPeriod === 'next' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedPeriod('next')}
              >
                Prochain trimestre
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-warning/30 bg-warning/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Calendar size={20} className="text-warning mr-2" />
                  <h4 className="font-medium text-gray-900">15 Juillet 2023</h4>
                </div>
                <span className="badge badge-warning">Urgent</span>
              </div>
              <p className="text-sm text-gray-600">Déclaration TVA - 2ème trimestre 2023</p>
              <div className="mt-3 flex space-x-2">
                <Button variant="secondary" size="sm">
                  Préparer
                </Button>
                <Button variant="text" size="sm">
                  En savoir plus
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Calendar size={20} className="text-primary mr-2" />
                  <h4 className="font-medium text-gray-900">31 Juillet 2023</h4>
                </div>
                <span className="badge badge-primary">À venir</span>
              </div>
              <p className="text-sm text-gray-600">Acompte impôt sur les sociétés</p>
              <div className="mt-3 flex space-x-2">
                <Button variant="text" size="sm">
                  Rappel
                </Button>
              </div>
            </div>

            <div className="border border-success/30 bg-success/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Calendar size={20} className="text-success mr-2" />
                  <h4 className="font-medium text-gray-900">30 Juin 2023</h4>
                </div>
                <span className="badge badge-success">Complété</span>
              </div>
              <p className="text-sm text-gray-600">Déclaration CVAE</p>
              <div className="mt-3 flex space-x-2">
                <Button variant="text" size="sm" icon={<Download size={16} />}>
                  Télécharger
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Declarations */}
      <div className="mb-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Déclarations récentes</h3>
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
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date soumission
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileCheck size={20} className="text-primary mr-2" />
                      <span className="text-sm font-medium text-gray-900">TVA</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    T1 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15/04/2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Validé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    12 450 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Button 
                      variant="text" 
                      size="sm" 
                      icon={<Download size={16} />}
                    >
                      Télécharger
                    </Button>
                  </td>
                </tr>
                {/* Add more declaration rows here */}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">TVA</h4>
            <p className="text-sm text-gray-500 mt-1">Déclarer la TVA</p>
            <Button variant="text" size="sm" className="mt-3">
              Commencer
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar size={24} className="text-success" />
            </div>
            <h4 className="font-medium">IS</h4>
            <p className="text-sm text-gray-500 mt-1">Impôt sociétés</p>
            <Button variant="text" size="sm" className="mt-3">
              Préparer
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Échéances</h4>
            <p className="text-sm text-gray-500 mt-1">Voir le calendrier</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserCog size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Expert</h4>
            <p className="text-sm text-gray-500 mt-1">Contacter l'expert</p>
            <Button variant="text" size="sm" className="mt-3">
              Discuter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Taxation;