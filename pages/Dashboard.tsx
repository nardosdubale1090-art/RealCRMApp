
import React from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentDeals from '../components/dashboard/RecentDeals';
import { mockKpis } from '../mocks/data';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockKpis.map(kpi => (
          <KpiCard key={kpi.title} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentDeals />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
