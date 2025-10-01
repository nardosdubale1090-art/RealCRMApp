
import React from 'react';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon } from '../shared/Icons';

const Header: React.FC = () => {
    return (
        <header className="bg-secondary h-20 flex items-center justify-between px-6 border-b border-border">
            <div className="flex items-center">
                 <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-96 pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-6">
                <button className="relative text-text-secondary hover:text-text-primary">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-secondary"></span>
                </button>
                <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-10 w-10 text-text-secondary" />
                    <div>
                        <p className="font-semibold text-sm">Admin User</p>
                        <p className="text-xs text-text-secondary">Super Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
