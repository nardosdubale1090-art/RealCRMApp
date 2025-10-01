
import React from 'react';
import Table from '../components/shared/Table';
import { mockEmployees } from '../mocks/data';
import type { Employee } from '../types';

const statusColors: { [key in Employee['status']]: string } = {
    'Active': 'text-green-400',
    'On Leave': 'text-yellow-400',
    'Inactive': 'text-red-400',
};

const Employees: React.FC = () => {
    const columns = [
      { header: 'Name', accessor: 'name' as keyof Employee },
      { header: 'Role', accessor: 'role' as keyof Employee },
      { header: 'Email', accessor: 'email' as keyof Employee },
      { header: 'Phone', accessor: 'phone' as keyof Employee },
      { 
        header: 'Status', 
        accessor: (item: Employee) => (
          <span className={`flex items-center text-sm font-medium ${statusColors[item.status]}`}>
            <span className={`h-2 w-2 mr-2 rounded-full ${statusColors[item.status].replace('text', 'bg')}`}></span>
            {item.status}
          </span>
        )
      },
      { header: 'Deals Closed', accessor: 'dealsClosed' as keyof Employee },
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Employees</h1>
        <Table<Employee>
          columns={columns}
          data={mockEmployees}
          title="All Employees"
        />
      </div>
    );
  };
  
export default Employees;
