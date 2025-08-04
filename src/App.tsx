import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/layout/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Closing from './pages/Closing';
import Salaries from './pages/Salaries';
import Clients from './pages/Clients';
import Suppliers from './pages/Suppliers';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import Assets from './pages/Assets';
import Strategic from './pages/Strategic';
import Taxation from './pages/Taxation';
import Expert from './pages/Expert';
import Knowledge from './pages/Knowledge';
import MonthlyClosing from './pages/MonthlyClosing';
import SalaryManagement from './pages/SalaryManagement';
import TaxOnboarding from './pages/TaxOnboarding';
import TaxOnboardingV2 from './pages/TaxOnboardingV2';
import OnboardingSuccess from './pages/OnboardingSuccess';
import OnboardingStart from './pages/OnboardingStart';
import QrUploadPage from './pages/QrUploadPage';
import FeatureFlagsPage from './pages/admin/FeatureFlagsPage';
import { useFeatureFlag } from './lib/hooks/useFeatureFlag';
import { Navigate } from 'react-router-dom';
import './styles/globals.css';

const QrUploadRoute: React.FC = () => {
  const { enabled, loading } = useFeatureFlag('onboardingQR');
  if (loading) return <p>Chargement...</p>;
  if (!enabled) return <Navigate to="/onboarding/tax" />;
  return <QrUploadPage />;
};

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <h1 style={{ textAlign: 'center', padding: '20px', color: 'black' }}>
      Test Netlify OK
    </h1>

    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/closing" element={<Layout><Closing /></Layout>} />
            <Route
              path="/closing/monthly"
              element={<Layout><MonthlyClosing /></Layout>}
            />
            <Route path="/salaries" element={<Layout><Salaries /></Layout>} />
            <Route
              path="/salaries/manage"
              element={<Layout><SalaryManagement /></Layout>}
            />
            <Route path="/clients" element={<Layout><Clients /></Layout>} />
            <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
            <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
            <Route path="/budgets" element={<Layout><Budgets /></Layout>} />
            <Route path="/assets" element={<Layout><Assets /></Layout>} />
            <Route path="/strategic" element={<Layout><Strategic /></Layout>} />
            <Route path="/taxation" element={<Layout><Taxation /></Layout>} />
            <Route path="/expert" element={<Layout><Expert /></Layout>} />
            <Route path="/knowledge" element={<Layout><Knowledge /></Layout>} />
            <Route
              path="/onboarding/tax"
              element={import.meta.env.VITE_ONBOARDING_V2 === 'true' ? <TaxOnboardingV2 /> : <TaxOnboarding />}
            />
            <Route path="/onboarding/success" element={<OnboardingSuccess />} />
            <Route path="/onboarding/start" element={<OnboardingStart />} />
            <Route path="/qr-upload/:sessionToken" element={<QrUploadRoute />} />
            <Route path="/admin/feature-flags" element={<Layout><FeatureFlagsPage /></Layout>} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </div>
);

export default App;
