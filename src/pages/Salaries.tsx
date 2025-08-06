import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Download, 
  Clock, 
  ChevronRight,
  CreditCard,
  ArrowRight,
  AlertTriangle,
  FileCheck,
  BarChart3
} from 'lucide-react';

const Salaries: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Salaires & Équipe</h2>
            <p className="text-gray-500 mt-1">Gérez vos salariés et paiements des salaires</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="secondary" 
              icon={<UserPlus size={16} />}
            >
              Ajouter un salarié
            </Button>
            <Button 
              variant="accent" 
              icon={<CreditCard size={16} />}
              onClick={() => navigate('/salaries/manage')}
            >
              Payer les salaires
            </Button>
          </div>
        </div>
      </div>

      {/* Next Payment Alert */}
      <div className="mb-6">
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-md p-4 flex items-start">
          <Clock size={20} className="text-primary mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Paiement des salaires à venir</h4>
            <p className="text-sm text-gray-600 mt-1">
              Le prochain paiement des salaires est prévu pour le 28/06/2023.
            </p>
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/salaries/manage')}
              >
                Préparer les salaires
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Employees Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Synthèse de l'équipe</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Masse salariale</p>
                <h3 className="text-2xl font-semibold mt-1">14 520 €</h3>
                <div className="flex items-center mt-2 text-sm">
                  <BarChart3 size={16} className="mr-1" />
                  <span>Mensuelle brute</span>
                </div>
              </div>
              <Users size={36} className="opacity-50" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Effectif total</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">4</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Users size={16} className="mr-1" />
                  <span>Équivalent temps plein</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users size={20} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Charges sociales</p>
                <h3 className="text-2xl font-semibold text-gray-900 mt-1">5 968 €</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <FileCheck size={16} className="mr-1" />
                  <span>À payer le 15/07</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                <FileText size={20} />
              </div>
            </div>
          </Card>
        </div>
        
        {/* Employees Table */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Liste des salariés</h4>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Rechercher un salarié..."
                className="form-input py-1 px-3 text-sm mr-2"
              />
              <Button variant="secondary" size="sm">
                Filtrer
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salarié
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Poste
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salaire brut
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
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">SM</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Sophie Martin</div>
                        <div className="text-sm text-gray-500">sophie.martin@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Directrice Marketing</div>
                    <div className="text-xs text-gray-500">Depuis 01/03/2020</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">CDI</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    3 800 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">TD</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Thomas Dubois</div>
                        <div className="text-sm text-gray-500">thomas.dubois@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Développeur Senior</div>
                    <div className="text-xs text-gray-500">Depuis 15/06/2021</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">CDI</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    3 200 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">CL</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Camille Leroy</div>
                        <div className="text-sm text-gray-500">camille.leroy@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Designer UX/UI</div>
                    <div className="text-xs text-gray-500">Depuis 05/01/2022</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">CDI</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    2 900 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="text-sm font-medium">AB</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Alexandre Bernard</div>
                        <div className="text-sm text-gray-500">alexandre.bernard@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Commercial</div>
                    <div className="text-xs text-gray-500">Depuis 10/10/2022</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-primary">CDD</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    2 500 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Recent Payslips */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Fiches de paie récentes</h3>
          <Button variant="text" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">
            Voir toutes les fiches de paie
          </Button>
        </div>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mai 2023</div>
                    <div className="text-xs text-gray-500">01/05 - 31/05</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Salaires mensuels</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Payé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    14 520 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Avril 2023</div>
                    <div className="text-xs text-gray-500">01/04 - 30/04</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Salaires mensuels</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Payé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    14 520 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Mars 2023</div>
                    <div className="text-xs text-gray-500">01/03 - 31/03</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Salaires mensuels</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Payé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    14 520 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Voir le document"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        className="text-primary hover:text-primary-light"
                        aria-label="Télécharger le document"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Échéances à venir</h3>
        
        <div className="space-y-4">
          <div className="bg-warning/5 border-l-4 border-warning rounded-r-md p-4 flex items-start">
            <AlertTriangle size={20} className="text-warning mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Déclaration sociale nominative (DSN)</h4>
              <p className="text-sm text-gray-600 mt-1">
                À soumettre avant le 05/07/2023
              </p>
              <div className="mt-3">
                <Button variant="secondary" size="sm">
                  Préparer la DSN
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 border-l-4 border-primary rounded-r-md p-4 flex items-start">
            <Clock size={20} className="text-primary mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">Paiement des charges sociales</h4>
              <p className="text-sm text-gray-600 mt-1">
                À effectuer avant le 15/07/2023
              </p>
              <div className="mt-3">
                <Button variant="secondary" size="sm">
                  Préparer le paiement
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salaries;