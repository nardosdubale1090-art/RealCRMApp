// /src/component/dashboard/KpiCards.tsx

import React from 'react';
import type { Kpi } from '../../types';

interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isIncrease = kpi.changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-card p-6 rounded-xl shadow-soft border border-transparent hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-text-secondary">{kpi.title}</p>
        <div className="bg-primary/10 p-2 rounded-lg">
          <kpi.icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <p className="text-3xl font-bold text-text-primary mt-4">{kpi.value}</p>
      {kpi.change && (
        <p className={`text-xs mt-1 ${changeColor}`}>
          {kpi.change} vs last month
        </p>
      )}
    </div>
  );
};

export default KpiCard;