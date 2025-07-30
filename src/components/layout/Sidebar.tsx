import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CalendarClock, 
  Users, 
  FileText, 
  ShoppingCart, 
  Wallet,
  CreditCard,
  Box,
  BarChart3, 
  FileCheck, 
  UserCog, 
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const navItems = [
    { name: 'Mon Entreprise', icon: <Home size={20} />, path: '/' },
    { name: 'Clôture & Pilotage', icon: <CalendarClock size={20} />, path: '/closing' },
    { name: 'Salaires & Équipe', icon: <Users size={20} />, path: '/salaries' },
    { name: 'Clients & Facturation', icon: <FileText size={20} />, path: '/clients' },
    { name: 'Fournisseurs & Achats', icon: <ShoppingCart size={20} />, path: '/suppliers' },
    { name: 'Dépenses', icon: <CreditCard size={20} />, path: '/expenses' },
    { name: 'Budgets', icon: <Wallet size={20} />, path: '/budgets' },
    { name: 'Actifs', icon: <Box size={20} />, path: '/assets' },
    { name: 'Pilotage Stratégique', icon: <BarChart3 size={20} />, path: '/strategic' },
    { name: 'Fiscalité & Admin', icon: <FileCheck size={20} />, path: '/taxation' },
    { name: 'Mon Expert', icon: <UserCog size={20} />, path: '/expert' },
    { name: 'Centre de Connaissances', icon: <BookOpen size={20} />, path: '/knowledge' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'translate-x-0' : '-translate-x-64 md:translate-x-0'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        <div className="flex items-center">
          <div className="font-bold text-xl text-white">Forvis Mazars</div>
        </div>
        <button 
          onClick={toggle}
          className="p-1 rounded-full hover:bg-primary-light md:hidden"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="p-4 bg-primary-light rounded-lg">
          <h5 className="font-medium text-white mb-2">Besoin d'aide?</h5>
          <p className="text-sm text-white/80">Contactez votre expert Mazars directement depuis l'application.</p>
          <NavLink to="/expert" className="mt-3 btn btn-accent inline-block text-sm">
            Contacter mon expert
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;