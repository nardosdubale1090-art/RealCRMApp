// /src/component/dashboard/QuickActions.tsx

import React from 'react';
import { PlusCircleIcon, UsersIcon, BuildingOffice2Icon, BanknotesIcon, CalendarDaysIcon } from '../shared/Icons';

const actions = [
    { label: 'Add Client', icon: UsersIcon },
    { label: 'Add Property', icon: BuildingOffice2Icon },
    { label: 'Create Deal', icon: BanknotesIcon },
    { label: 'Schedule Visit', icon: CalendarDaysIcon },
];

const QuickActions: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
        {actions.map(action => (
             <button 
                key={action.label}
                className="flex items-center justify-center px-3 py-2 bg-secondary hover:bg-gray-700 text-text-secondary hover:text-text-primary text-sm font-medium rounded-lg transition-colors"
            >
                <action.icon className="h-4 w-4 mr-2" />
                <span>{action.label}</span>
            </button>
        ))}
    </div>
  );
};

export default QuickActions;
