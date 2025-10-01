import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ChevronDownIcon } from '../shared/Icons';

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsNavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const activeTabInfo = tabs.find(t => t.id === activeTab);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-secondary border border-border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-primary"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <div className="flex items-center">
            {activeTabInfo?.icon && <activeTabInfo.icon className="h-5 w-5 mr-3 text-text-secondary" />}
            <span className="font-semibold text-text-primary">{activeTabInfo?.name}</span>
          </div>
          <ChevronDownIcon className={`h-5 w-5 text-text-secondary transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>
        
        <div className={`absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg ring-1 ring-border focus:outline-none transition-all duration-200 ease-out origin-top ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <ul
                className="max-h-60 overflow-auto p-1"
                role="listbox"
            >
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => { setActiveTab(tab.id); setIsDropdownOpen(false); }}
                    className="w-full text-left flex items-center px-3 py-2 text-sm rounded-md text-text-secondary hover:bg-gray-700/50 hover:text-text-primary"
                    role="option"
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
        </div>
      </div>
    );
  }

  return (
    <nav>
      <ul className="space-y-1">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors duration-200 ${
                  isActive ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>{tab.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingsNavigation;
