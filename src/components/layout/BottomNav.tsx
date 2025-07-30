import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarClock, Users, FileText, Menu } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Home size={20} />
        <span>Accueil</span>
      </NavLink>
      
      <NavLink to="/closing" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <CalendarClock size={20} />
        <span>Clôture</span>
      </NavLink>
      
      <NavLink to="/salaries" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Users size={20} />
        <span>Salaires</span>
      </NavLink>
      
      <NavLink to="/clients" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <FileText size={20} />
        <span>Clients</span>
      </NavLink>
      
      <NavLink to="/expert" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <Menu size={20} />
        <span>Plus</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;