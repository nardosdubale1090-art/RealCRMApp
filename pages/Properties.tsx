
import React from 'react';
import Table from '../components/shared/Table';
import { mockProperties } from '../mocks/data';
import type { Property } from '../types';

const statusColors: { [key in Property['status']]: string } = {
    'For Sale': 'border-green-500 text-green-400',
    'For Rent': 'border-blue-500 text-blue-400',
    'Sold': 'border-gray-500 text-gray-400',
    'Rented': 'border-yellow-500 text-yellow-400',
};

const Properties: React.FC = () => {
  const columns = [
    { 
        header: 'Property', 
        accessor: (item: Property) => (
            <div className="flex items-center">
                <img className="h-10 w-16 object-cover rounded-md" src={item.imageUrl} alt={item.title} />
                <div className="ml-4">
                    <div className="text-sm font-medium text-text-primary">{item.title}</div>
                    <div className="text-sm text-text-secondary">{item.address}</div>
                </div>
            </div>
        )
    },
    { header: 'Type', accessor: 'type' as keyof Property },
    { 
      header: 'Status', 
      accessor: (item: Property) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusColors[item.status]}`}>
          {item.status}
        </span>
      )
    },
    { 
      header: 'Price', 
      accessor: (item: Property) => `$${item.price.toLocaleString()}` 
    },
    { header: 'Area (m²)', accessor: 'area' as keyof Property },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Properties</h1>
      <Table<Property>
        columns={columns}
        data={mockProperties}
        title="All Properties"
      />
    </div>
  );
};

export default Properties;
