import React from 'react';

interface Tab {
  id: string;
  name: string;
}

interface SubNavigationProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const SubNavigation: React.FC<SubNavigationProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
        {/* Hide scrollbar for a cleaner look */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.id)}
              className={`no-scrollbar whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:border-gray-500 hover:text-text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.name}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SubNavigation;
