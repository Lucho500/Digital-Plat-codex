import React, { createContext, useContext } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import { useCompany } from '../lib/hooks/useCompany';

interface AuthContextType {
  user: ReturnType<typeof useAuth>['user'];
  company: ReturnType<typeof useCompany>['company'];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { company, loading: companyLoading } = useCompany(user?.id);

  const loading = authLoading || companyLoading;

  return (
    <AuthContext.Provider value={{ user, company, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}