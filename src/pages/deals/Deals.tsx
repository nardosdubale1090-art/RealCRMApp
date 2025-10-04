// /src/pages/deals/Deals.tsx

import React from 'react';
import Table from '../../components/shared/Table';
import { mockDeals } from '../../mocks/data';
import type { Deal } from '../../types';

const statusColors: { [key in Deal['status']]: string } = {
    'In Progress': 'bg-yellow-500',
    'Completed': 'bg-green-500',
    'Cancelled': 'bg-red-500',
};

const Deals: React.FC = () => {
    const columns = [
      { header: 'Deal Title', accessor: 'title' as keyof Deal },
      { header: 'Client', accessor: 'clientName' as keyof Deal },
      { header: 'Property', accessor: 'propertyTitle' as keyof Deal },
      { 
        header: 'Value', 
        accessor: (item: Deal) => `$${item.value.toLocaleString()}` 
      },
      { 
        header: 'Status', 
        accessor: (item: Deal) => (
          <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${statusColors[item.status]}`}>
            {item.status}
          </span>
        )
      },
      { header: 'Close Date', accessor: 'closeDate' as keyof Deal },
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Deals</h1>
        <Table<Deal>
          columns={columns}
          data={mockDeals}
          title="All Deals"
        />
      </div>
    );
  };
  
export default Deals;