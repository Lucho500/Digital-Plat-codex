import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { supabase } from '../../lib/supabase';
import { Building2, Loader } from 'lucide-react';
import type { Database } from '../../lib/database.types';

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
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            className={`form-input ${errors.user_first_name ? 'border-error' : ''}`}
            {...register('user_first_name', { required: 'First name is required' })}
          />
          {errors.user_first_name && (
            <p className="mt-1 text-sm text-error">{errors.user_first_name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            className={`form-input ${errors.user_last_name ? 'border-error' : ''}`}
            {...register('user_last_name', { required: 'Last name is required' })}
          />
          {errors.user_last_name && (
            <p className="mt-1 text-sm text-error">{errors.user_last_name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Name
        </label>
        <input
          type="text"
          className={`form-input ${errors.name ? 'border-error' : ''}`}
          {...register('name', { required: 'Company name is required' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Legal Name
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
                message: 'SIREN must be 9 digits'
              }
            })}
          />
          {errors.siren && (
            <p className="mt-1 text-sm text-error">{errors.siren.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            VAT Number
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
          Address
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
            Postal Code
          </label>
          <input
            type="text"
            className={`form-input ${errors.postal_code ? 'border-error' : ''}`}
            {...register('postal_code')}
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            className={`form-input ${errors.city ? 'border-error' : ''}`}
            {...register('city')}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
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
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
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
        {isSubmitting ? 'Creating company...' : 'Create Company'}
      </Button>
    </form>
  );
};

export default CompanyForm;