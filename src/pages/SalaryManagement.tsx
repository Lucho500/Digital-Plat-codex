import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressSteps from '../components/ui/ProgressSteps';
import { 
  Users, 
  Plus, 
  UserCircle, 
  Calendar, 
  Edit, 
  FileText,
  Download,
  CreditCard,
  ArrowRight,
  Loader,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Define the steps for salary management
const salarySteps = [
  { id: 1, label: 'Employés', completed: true },
  { id: 2, label: 'Génération', completed: false },
  { id: 3, label: 'Validation', completed: false },
  { id: 4, label: 'Paiement', completed: false }
];

// Define employee type
interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  selected: boolean;
  payslipGenerated: boolean;
}

const SalaryManagement: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  
  // Sample employees data
  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: 'emp1', 
      name: 'Sophie Martin', 
      position: 'Directrice Marketing', 
      salary: 3800, 
      selected: true,
      payslipGenerated: false 
    },
    { 
      id: 'emp2', 
      name: 'Thomas Dubois', 
      position: 'Développeur Senior', 
      salary: 3200, 
      selected: true,
      payslipGenerated: false 
    },
    { 
      id: 'emp3', 
      name: 'Camille Leroy', 
      position: 'Designer UX/UI', 
      salary: 2900, 
      selected: true,
      payslipGenerated: false 
    },
    { 
      id: 'emp4', 
      name: 'Alexandre Bernard', 
      position: 'Commercial', 
      salary: 2500, 
      selected: false,
      payslipGenerated: false 
    }
  ]);

  // Toggle selection of all employees
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setEmployees(employees.map(emp => ({ ...emp, selected: newSelectAll })));
  };

  // Toggle selection of a single employee
  const toggleEmployeeSelection = (empId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === empId ? { ...emp, selected: !emp.selected } : emp
    ));
    
    // Update selectAll state based on whether all employees are selected
    const allSelected = employees.every(emp => emp.id === empId ? !emp.selected : emp.selected);
    setSelectAll(allSelected);
  };

  // Generate payslips for selected employees
  const generatePayslips = () => {
    setLoading(true);
    setTimeout(() => {
      setEmployees(employees.map(emp => 
        emp.selected ? { ...emp, payslipGenerated: true } : emp
      ));
      setLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep < 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(currentStep + 1);
      }, 1500);
    } else {
      // Final step - redirect to dashboard with success message
      navigate('/salaries');
    }
  };

  // Handle "auto-process everything" option
  const handleAutoProcess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate completing all steps
      setCurrentStep(4);
    }, 2500);
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">Gestion des Salaires</h2>
            <p className="text-gray-500 mt-1">Préparez et effectuez le paiement des salaires</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="accent" 
              icon={<ArrowRight size={16} />} 
              iconPosition="right"
              onClick={handleAutoProcess}
            >
              Tout automatiser
            </Button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <ProgressSteps 
          steps={salarySteps} 
          currentStep={currentStep}
          onChange={(step) => step < currentStep && setCurrentStep(step)}
        />
      </div>

      {/* Step 1: Employee Selection */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Sélection des employés</h3>
              <Button 
                variant="secondary" 
                size="sm" 
                icon={<Plus size={16} />}
              >
                Ajouter un employé
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Poste
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salaire Brut
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={employee.selected}
                          onChange={() => toggleEmployeeSelection(employee.id)}
                          className="h-4 w-4 text-primary border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            <UserCircle size={24} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              #{employee.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {employee.salary.toLocaleString()} €
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-primary hover:text-primary-light mr-3"
                          aria-label="Modifier le salarié"
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              variant="primary"
              onClick={generatePayslips}
              disabled={loading || !employees.some(emp => emp.selected)}
              icon={loading ? <Loader size={16} className="animate-spin" /> : undefined}
            >
              {loading ? 'Génération en cours...' : 'Générer les fiches de paie'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Payslip Generation */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fiches de paie générées</h3>
            <p className="text-gray-500 mb-6">
              Les fiches de paie ont été générées pour les employés sélectionnés. Vérifiez et validez-les avant de procéder au paiement.
            </p>
            
            <div className="space-y-4">
              {employees.filter(emp => emp.selected).map((employee) => (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-3">
                        <UserCircle size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{employee.name}</h4>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900">{employee.salary.toLocaleString()} €</div>
                      <div className="text-sm text-gray-500">Brut mensuel</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Juin 2023</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        icon={<FileText size={16} />}
                      >
                        Voir le détail
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        icon={<Download size={16} />}
                      >
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(1)}
            >
              Retour
            </Button>
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading}
            >
              {loading ? 'Traitement en cours...' : 'Continuer vers la validation'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Validation */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Validation des paiements</h3>
            <p className="text-gray-500 mb-6">
              Vérifiez les montants et validez le paiement des salaires pour les employés sélectionnés.
            </p>
            
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-warning mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Vérification importante</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Assurez-vous que tous les montants sont corrects avant de valider. Une fois le paiement lancé, il ne pourra pas être annulé.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employé
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brut
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Charges
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net à payer
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.filter(emp => emp.selected).map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {employee.salary.toLocaleString()} €
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                        {(employee.salary * 0.23).toFixed(2)} €
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        {(employee.salary * 0.77).toFixed(2)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th scope="row" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <td className="px-6 py-3 text-right text-xs font-medium text-gray-900">
                      {employees
                        .filter(emp => emp.selected)
                        .reduce((sum, emp) => sum + emp.salary, 0)
                        .toLocaleString()} €
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-medium text-gray-900">
                      {employees
                        .filter(emp => emp.selected)
                        .reduce((sum, emp) => sum + emp.salary * 0.23, 0)
                        .toFixed(2)} €
                    </td>
                    <td className="px-6 py-3 text-right text-xs font-medium text-gray-900">
                      {employees
                        .filter(emp => emp.selected)
                        .reduce((sum, emp) => sum + emp.salary * 0.77, 0)
                        .toFixed(2)} €
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="secondary"
              onClick={() => setCurrentStep(2)}
            >
              Retour
            </Button>
            <Button 
              variant="primary"
              icon={loading ? <Loader size={16} className="animate-spin" /> : <CreditCard size={16} />}
              iconPosition="right"
              onClick={handleNextStep}
              disabled={loading}
            >
              {loading ? 'Validation en cours...' : 'Valider et procéder au paiement'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Payment Confirmation */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-success" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Paiement des salaires réussi</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Les salaires ont été traités avec succès et seront versés à la date prévue du 28/06/2023.
              </p>
              
              <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Montant total</span>
                  <span className="text-sm font-medium text-gray-900">
                    {employees
                      .filter(emp => emp.selected)
                      .reduce((sum, emp) => sum + emp.salary * 0.77, 0)
                      .toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Employés concernés</span>
                  <span className="text-sm font-medium text-gray-900">
                    {employees.filter(emp => emp.selected).length}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Date de paiement</span>
                  <span className="text-sm font-medium text-gray-900">28/06/2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Référence</span>
                  <span className="text-sm font-medium text-gray-900">SALARY-JUN-2023</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="secondary" 
                  icon={<Download size={16} />}
                >
                  Télécharger le récapitulatif
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/salaries')}
                >
                  Retour à la gestion des salaires
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;