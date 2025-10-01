
import React from 'react';
import Table from '../components/shared/Table';
import { mockClients } from '../mocks/data';
import type { Client } from '../types';

const statusColors: { [key in Client['status']]: string } = {
    'New Lead': 'bg-blue-500 text-white',
    'Contacted': 'bg-cyan-500 text-white',
    'Site Visit': 'bg-indigo-500 text-white',
    'Negotiating': 'bg-yellow-500 text-black',
    'Closed': 'bg-green-500 text-white',
    'Lost': 'bg-red-500 text-white'
};

const Clients: React.FC = () => {
  const columns = [
    { header: 'Name', accessor: 'name' as keyof Client },
    { header: 'Email', accessor: 'email' as keyof Client },
    { header: 'Phone', accessor: 'phone' as keyof Client },
    { 
      header: 'Status', 
      accessor: (item: Client) => (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[item.status]}`}>
          {item.status}
        </span>
      )
    },
    { header: 'Assigned Agent', accessor: 'assignedAgent' as keyof Client },
    { header: 'Last Contact', accessor: 'lastContact' as keyof Client },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Clients (CRM)</h1>
      <Table<Client>
        columns={columns}
        data={mockClients}
        title="All Clients"
      />
    </div>
  );
};

export default Clients;
