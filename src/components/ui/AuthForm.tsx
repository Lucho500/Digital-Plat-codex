import React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, Loader } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
}

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            className={`form-input pl-10 ${errors.email ? 'border-error' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            className={`form-input pl-10 ${errors.password ? 'border-error' : ''}`}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
          />
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader className="animate-spin" size={16} /> : undefined}
      >
        {isSubmitting ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default AuthForm;