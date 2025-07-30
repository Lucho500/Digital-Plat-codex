import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { Wallet, Calculator, Calendar, Save, Loader } from 'lucide-react';

interface BudgetFormData {
  name: string;
  amount: number;
  category: string;
  startDate: string;
  endDate: string;
  description?: string;
  recurring: boolean;
}

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<BudgetFormData>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BudgetFormData>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom du budget
        </label>
        <input
          type="text"
          className={`form-input ${errors.name ? 'border-error' : ''}`}
          {...register('name', { required: 'Le nom est requis' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Montant
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              className={`form-input pl-8 ${errors.amount ? 'border-error' : ''}`}
              {...register('amount', { 
                required: 'Le montant est requis',
                min: { value: 0, message: 'Le montant doit être positif' }
              })}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-error">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            className={`form-input ${errors.category ? 'border-error' : ''}`}
            {...register('category', { required: 'La catégorie est requise' })}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="loyer">Loyer</option>
            <option value="services">Services</option>
            <option value="transport">Transport</option>
            <option value="fournitures">Fournitures</option>
            <option value="autres">Autres</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-error">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de début
          </label>
          <input
            type="date"
            className={`form-input ${errors.startDate ? 'border-error' : ''}`}
            {...register('startDate', { required: 'La date de début est requise' })}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-error">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de fin
          </label>
          <input
            type="date"
            className={`form-input ${errors.endDate ? 'border-error' : ''}`}
            {...register('endDate', { required: 'La date de fin est requise' })}
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-error">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="form-input h-24"
          {...register('description')}
        ></textarea>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-primary rounded"
            {...register('recurring')}
          />
          <span className="ml-2 text-sm text-gray-700">Budget récurrent</span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
        icon={isLoading ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
      >
        {isLoading ? 'Enregistrement...' : 'Enregistrer le budget'}
      </Button>
    </form>
  );
};

export default BudgetForm;