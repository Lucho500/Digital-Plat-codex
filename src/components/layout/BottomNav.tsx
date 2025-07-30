import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarClock, Users, FileText, Menu } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      <NavLink
        to="/"
        aria-label="Accueil"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <Home size={20} />
        <span>Accueil</span>
      </NavLink>
      
      <NavLink
        to="/closing"
        aria-label="Clôture"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <CalendarClock size={20} />
        <span>Clôture</span>
      </NavLink>
      
      <NavLink
        to="/salaries"
        aria-label="Salaires"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <Users size={20} />
        <span>Salaires</span>
      </NavLink>
      
      <NavLink
        to="/clients"
        aria-label="Clients"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <FileText size={20} />
        <span>Clients</span>
      </NavLink>
      
      <NavLink
        to="/expert"
        aria-label="Plus"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
      >
        <Menu size={20} />
        <span>Plus</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;