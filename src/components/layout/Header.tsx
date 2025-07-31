import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLocation } from 'react-router-dom';
import { 
  Menu,
  Bell,
  Search,
  HelpCircle,
  Sun,
  Moon,
  User,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Mon Entreprise';
    if (path === '/closing') return 'Clôture & Pilotage';
    if (path === '/closing/monthly') return 'Clôture Mensuelle';
    if (path === '/salaries') return 'Salaires & Équipe';
    if (path === '/salaries/manage') return 'Gestion des Salaires';
    if (path === '/clients') return 'Clients & Facturation';
    if (path === '/suppliers') return 'Fournisseurs & Achats';
    if (path === '/strategic') return 'Pilotage Stratégique';
    if (path === '/taxation') return 'Fiscalité & Admin';
    if (path === '/expert') return 'Mon Expert';
    if (path === '/knowledge') return 'Centre de Connaissances';
    if (path === '/onboarding/tax') return 'Onboarding Fiscal';
    
    return 'Forvis Mazars';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Menu size={20} />
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-between">
        <h1 className="text-xl font-medium text-gray-800 ml-2">{getPageTitle()}</h1>
        
        <div className="flex items-center space-x-1 md:space-x-4">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            className="p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Search size={20} />
          </button>
          
          {/* Help button */}
          <button
            className="p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Notifications"
            className="p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
          
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Profile menu"
              className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden md:block font-medium">Maurice D.</span>
              <ChevronDown size={16} className="hidden md:block" />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon profil</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;