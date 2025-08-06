import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  Clock,
  AlertTriangle,
  FileText,
  ChevronRight,
  Calendar,
  CheckCircle,
  ArrowRight,
  Download,
  BarChart
} from 'lucide-react';
import {
  getMonthlyClosings,
  MonthlyClosing,
} from '../lib/api/closing';

const Closing: React.FC = () => {
  const navigate = useNavigate();
  const [monthlyClosings, setMonthlyClosings] = useState<MonthlyClosing[]>([]);

  useEffect(() => {
    getMonthlyClosings().then(setMonthlyClosings);
  }, []);

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Clôture & Pilotage</h2>
            <p className="text-gray-500 mt-1">Gérez vos clôtures mensuelles et annuelles</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="accent" 
              icon={<Clock size={16} />}
              onClick={() => navigate('/closing/monthly')}
            >
              Démarrer une clôture
            </Button>
          </div>
        </div>
      </div>

      {/* Alert for pending closure */}
      <div className="mb-6">
        <div className="bg-warning/5 border-l-4 border-warning rounded-r-md p-4 flex items-start">
          <AlertTriangle size={20} className="text-warning mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">Clôture mensuelle à finaliser</h4>
            <p className="text-sm text-gray-600 mt-1">
              La clôture du mois de Juin est en attente de validation.
            </p>
            <div className="mt-3">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/closing/monthly')}
              >
                Finaliser la clôture
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly closures section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clôtures mensuelles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {monthlyClosings.map((closing) => (
            <Card
              key={`${closing.month}-${closing.year}`}
              onClick={
                closing.status === 'ongoing'
                  ? () => navigate('/closing/monthly')
                  : undefined
              }
              className={closing.status === 'ongoing' ? 'cursor-pointer' : ''}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar size={20} className="text-primary mr-2" />
                  <h4 className="font-medium text-gray-900">
                    {closing.month} {closing.year}
                  </h4>
                </div>
                <span
                  className={`badge ${
                    closing.status === 'ongoing'
                      ? 'badge-warning'
                      : 'badge-success'
                  }`}
                >
                  {closing.status === 'ongoing' ? 'En cours' : 'Finalisé'}
                </span>
              </div>
              <div className="space-y-2">
                {closing.status === 'ongoing' &&
                  closing.tasks?.map((task) => (
                    <div
                      key={task.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-500">{task.label}</span>
                      {task.status === 'complete' && (
                        <span className="flex items-center text-success">
                          <CheckCircle size={14} className="mr-1" /> Complet
                        </span>
                      )}
                      {task.status === 'warning' && (
                        <span className="flex items-center text-warning">
                          <AlertTriangle size={14} className="mr-1" /> À vérifier
                        </span>
                      )}
                      {task.status === 'pending' && (
                        <span className="flex items-center text-gray-400">
                          <Clock size={14} className="mr-1" /> En attente
                        </span>
                      )}
                    </div>
                  ))}
                {closing.status === 'completed' &&
                  closing.metrics?.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-500">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                  ))}
              </div>
              {closing.status === 'ongoing' ? (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Button
                    variant="text"
                    size="sm"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                    fullWidth
                  >
                    Continuer la clôture
                  </Button>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                  <Button variant="text" size="sm" icon={<FileText size={16} />}>
                    Voir le rapport
                  </Button>
                  <Button variant="text" size="sm" icon={<Download size={16} />}>
                    Exporter
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Annual closures section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Clôtures annuelles</h3>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exercice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chiffre d'affaires
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Résultat
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
                      <Calendar size={16} className="text-primary mr-2" />
                      <div className="text-sm font-medium text-gray-900">2022</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    01/01/2022 - 31/12/2022
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Finalisé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    289 750 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    37 280 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary hover:text-primary-light">
                        <FileText size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-light">
                        <Download size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-light">
                        <BarChart size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-primary mr-2" />
                      <div className="text-sm font-medium text-gray-900">2021</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    01/01/2021 - 31/12/2021
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="badge badge-success">Finalisé</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    245 320 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    28 470 €
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-primary hover:text-primary-light">
                        <FileText size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-light">
                        <Download size={16} />
                      </button>
                      <button className="text-primary hover:text-primary-light">
                        <BarChart size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Reporting section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Rapports et analyses</h3>
          <Button variant="text" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">
            Voir tous les rapports
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-primary" />
            </div>
            <h4 className="font-medium">Bilan</h4>
            <p className="text-sm text-gray-500 mt-1">Situation patrimoniale</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-success" />
            </div>
            <h4 className="font-medium">Compte de résultat</h4>
            <p className="text-sm text-gray-500 mt-1">Performance financière</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart size={24} className="text-warning" />
            </div>
            <h4 className="font-medium">Trésorerie</h4>
            <p className="text-sm text-gray-500 mt-1">Flux financiers</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
          
          <Card className="text-center p-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-accent" />
            </div>
            <h4 className="font-medium">Analyse fiscale</h4>
            <p className="text-sm text-gray-500 mt-1">Optimisation fiscale</p>
            <Button variant="text" size="sm" className="mt-3">
              Consulter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Closing;