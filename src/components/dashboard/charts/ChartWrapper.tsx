// /src/component/dashboard/charts/ChartWrapper.tsx

import React from 'react';

interface ChartWrapperProps {
    title: string;
    icon: React.ComponentType<{className?: string}>;
    children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, icon: Icon, children }) => {
    return (
        <div className="bg-card p-4 rounded-lg shadow-lg h-full flex flex-col">
            <div className="flex items-center mb-4">
                <Icon className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-md font-semibold text-text-primary">{title}</h3>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
};

export default ChartWrapper;
