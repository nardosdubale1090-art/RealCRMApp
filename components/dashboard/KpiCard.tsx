
import React from 'react';
import type { Kpi } from '../../types';

interface KpiCardProps {
  kpi: Kpi;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  const isIncrease = kpi.changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-secondary">{kpi.title}</p>
        <p className="text-3xl font-bold text-text-primary mt-1">{kpi.value}</p>
        <p className={`text-xs mt-2 ${changeColor}`}>
          {kpi.change} vs last month
        </p>
      </div>
      <div className="bg-primary/20 p-3 rounded-full">
        <kpi.icon className="h-7 w-7 text-primary" />
      </div>
    </div>
  );
};

export default KpiCard;
