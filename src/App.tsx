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
import './styles/globals.css';

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
            {/* … autres routes */}
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </div>
);

export default App;
