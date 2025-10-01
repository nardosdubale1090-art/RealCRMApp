
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants';
import { BuildingStorefrontIcon } from '../shared/Icons';

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 bg-secondary flex flex-col">
            <div className="flex items-center justify-center h-20 border-b border-border">
                <BuildingStorefrontIcon className="h-8 w-8 text-primary"/>
                <h1 className="text-2xl font-bold ml-2">RE-CRM Pro</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {NAV_LINKS.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.href}
                        end
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? 'bg-primary text-white'
                                    : 'text-text-secondary hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        <link.icon className="h-5 w-5 mr-3" />
                        {link.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-border">
                 <p className="text-xs text-text-secondary text-center">© 2024 RE-CRM Pro. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Sidebar;
