// /src/component/layout/Topbar.tsx

import React from 'react';
import { NavLink } from 'react-router-dom';
// Fix: Use navLinks from AppearanceContext instead of static constants.
import { useAppearance } from '../../context/AppearanceContext';
import { useAuth } from '../../hooks/useAuth';

const Topbar: React.FC = () => {
  const { user } = useAuth();
  const { navLinks } = useAppearance();
  
  const visibleLinks = user 
    ? navLinks.filter(link => link.allowedRoles.includes(user.role))
    : navLinks.filter(link => link.isPublic);

  return (
    <div className="bg-secondary border-b border-border hidden md:block">
      <nav className="px-4 sm:px-6">
        <ul className="flex items-center h-14 space-x-2 lg:space-x-4 overflow-x-auto">
          {visibleLinks.map(link => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-gray-700/50 hover:text-white'
                  }`
                }
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;
