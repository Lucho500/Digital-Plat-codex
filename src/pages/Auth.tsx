import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/ui/AuthForm';
import CompanyForm from '../components/ui/CompanyForm';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Building2 } from 'lucide-react';

const Auth: React.FC = () => {
  const { user, company, loading } = useAuthContext();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If user exists and has a company, redirect to dashboard
  if (user && company) {
    return <Navigate to="/" replace />;
  }

  // If user exists but doesn't have a company, show company form
  if (user && !company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Building2 size={24} className="text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Set up your company
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your company details to get started
            </p>
          </div>

          <Card>
            <CompanyForm userId={user.id} onSuccess={() => window.location.reload()} />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <Building2 size={24} className="text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'signin' 
              ? 'Sign in to your account to continue' 
              : 'Get started with your free account'}
          </p>
        </div>

        <Card>
          <AuthForm mode={mode} />
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
              <Button 
                variant="text" 
                size="sm" 
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;