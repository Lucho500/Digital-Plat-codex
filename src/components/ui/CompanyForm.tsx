import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { supabase } from '../../lib/supabase';
import { Building2, Loader } from 'lucide-react';
import type { Database } from '../../lib/database.types';
import { useToast } from '../../contexts/ToastContext';

type CompanyInsert = Database['public']['Tables']['companies']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

interface CompanyFormData extends Omit<CompanyInsert, 'id' | 'created_at' | 'updated_at'> {
  user_first_name: string;
  user_last_name: string;
}

interface CompanyFormProps {
  userId: string;
  onSuccess: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ userId, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompanyFormData>();
  const { addToast } = useToast();

  const onSubmit = async (data: CompanyFormData) => {
    try {
      // First create the company
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: data.name,
          legal_name: data.legal_name,
          siren: data.siren,
          vat_number: data.vat_number,
          address: data.address,
          postal_code: data.postal_code,
          city: data.city,
          country: data.country || 'France',
          phone: data.phone,
          email: data.email
        })
        .select()
        .single();

      if (companyError) throw companyError;

      // Then update the user with company_id and profile info
      const { error: userError } = await supabase
        .from('users')
        .update({
          company_id: companyData.id,
          first_name: data.user_first_name,
          last_name: data.user_last_name,
          role: 'admin'
        })
        .eq('id', userId);

      if (userError) throw userError;

      onSuccess();
      addToast('Entreprise créée avec succès', 'success');
    } catch (error) {
      addToast("Message d'erreur", 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            className={`form-input ${errors.user_first_name ? 'border-error' : ''}`}
            {...register('user_first_name', { required: 'Le prénom est requis' })}
          />
          {errors.user_first_name && (
            <p className="mt-1 text-sm text-error">{errors.user_first_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            className={`form-input ${errors.user_last_name ? 'border-error' : ''}`}
            {...register('user_last_name', { required: 'Le nom est requis' })}
          />
          {errors.user_last_name && (
            <p className="mt-1 text-sm text-error">{errors.user_last_name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nom de l'entreprise
        </label>
        <input
          type="text"
          className={`form-input ${errors.name ? 'border-error' : ''}`}
          {...register('name', { required: "Le nom de l'entreprise est requis" })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Raison sociale
        </label>
        <input
          type="text"
          className={`form-input ${errors.legal_name ? 'border-error' : ''}`}
          {...register('legal_name')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SIREN
          </label>
          <input
            type="text"
            className={`form-input ${errors.siren ? 'border-error' : ''}`}
            {...register('siren', {
              pattern: {
                value: /^\d{9}$/,
                message: 'Le SIREN doit comporter 9 chiffres'
              }
            })}
          />
          {errors.siren && (
            <p className="mt-1 text-sm text-error">{errors.siren.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de TVA
          </label>
          <input
            type="text"
            className={`form-input ${errors.vat_number ? 'border-error' : ''}`}
            {...register('vat_number')}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adresse
        </label>
        <input
          type="text"
          className={`form-input ${errors.address ? 'border-error' : ''}`}
          {...register('address')}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code postal
          </label>
          <input
            type="text"
            className={`form-input ${errors.postal_code ? 'border-error' : ''}`}
            {...register('postal_code')}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <input
            type="text"
            className={`form-input ${errors.city ? 'border-error' : ''}`}
            {...register('city')}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pays
          </label>
          <input
            type="text"
            className={`form-input ${errors.country ? 'border-error' : ''}`}
            defaultValue="France"
            {...register('country')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'border-error' : ''}`}
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Adresse e-mail invalide'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'border-error' : ''}`}
            {...register('phone')}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader className="animate-spin" size={16} /> : <Building2 size={16} />}
      >
        {isSubmitting ? "Cr\u00e9ation de l'entreprise..." : "Cr\u00e9er l'entreprise"}
      </Button>
    </form>
  );
};

export default CompanyForm;