
import type { Client, Property, Employee, Deal, Kpi } from '../types';
import { BanknotesIcon, UsersIcon, BuildingOffice2Icon, ArrowTrendingUpIcon } from '../components/shared/Icons';

export const mockKpis: Kpi[] = [
  { title: 'Total Revenue', value: '$1.2M', change: '+12.5%', changeType: 'increase', icon: BanknotesIcon },
  { title: 'New Clients', value: '84', change: '+2.1%', changeType: 'increase', icon: UsersIcon },
  { title: 'Properties Sold', value: '22', change: '-3.2%', changeType: 'decrease', icon: BuildingOffice2Icon },
  { title: 'Active Deals', value: '45', change: '+5', changeType: 'increase', icon: ArrowTrendingUpIcon },
];

export const mockClients: Client[] = [
  { id: 'C001', name: 'John Doe', email: 'john.doe@example.com', phone: '555-0101', status: 'Negotiating', assignedAgent: 'Alice Johnson', lastContact: '2024-07-20', source: 'Referral' },
  { id: 'C002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-0102', status: 'New Lead', assignedAgent: 'Bob Williams', lastContact: '2024-07-22', source: 'Website' },
  { id: 'C003', name: 'Michael Brown', email: 'michael.b@example.com', phone: '555-0103', status: 'Site Visit', assignedAgent: 'Alice Johnson', lastContact: '2024-07-18', source: 'Social Media' },
  { id: 'C004', name: 'Emily Davis', email: 'emily.d@example.com', phone: '555-0104', status: 'Closed', assignedAgent: 'Charlie Brown', lastContact: '2024-06-30', source: 'Walk-in' },
  { id: 'C005', name: 'David Wilson', email: 'david.w@example.com', phone: '555-0105', status: 'Contacted', assignedAgent: 'Bob Williams', lastContact: '2024-07-21', source: 'Referral' },
];

export const mockProperties: Property[] = [
  { id: 'P001', title: 'Modern Downtown Apartment', address: '123 Main St, Addis Ababa', type: 'Apartment', status: 'For Sale', price: 250000, bedrooms: 2, bathrooms: 2, area: 120, imageUrl: 'https://picsum.photos/400/300?random=1' },
  { id: 'P002', title: 'Luxury Family Villa', address: '456 Oak Ave, Addis Ababa', type: 'Villa', status: 'For Sale', price: 750000, bedrooms: 5, bathrooms: 4, area: 450, imageUrl: 'https://picsum.photos/400/300?random=2' },
  { id: 'P003', title: 'Prime Office Space', address: '789 Pine Ln, Addis Ababa', type: 'Office', status: 'For Rent', price: 5000, area: 200, imageUrl: 'https://picsum.photos/400/300?random=3' },
  { id: 'P004', title: 'Retail Shop on High Street', address: '101 Maple Rd, Addis Ababa', type: 'Shop', status: 'Rented', price: 3000, area: 80, imageUrl: 'https://picsum.photos/400/300?random=4' },
  { id: 'P005', title: 'Cozy Suburban Apartment', address: '212 Birch Blvd, Addis Ababa', type: 'Apartment', status: 'Sold', price: 180000, bedrooms: 1, bathrooms: 1, area: 75, imageUrl: 'https://picsum.photos/400/300?random=5' },
];

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Alice Johnson', role: 'Sales Senior', email: 'alice.j@recrm.com', phone: '555-0201', status: 'Active', dealsClosed: 12, hireDate: '2020-03-15' },
  { id: 'E002', name: 'Bob Williams', role: 'Sales Junior', email: 'bob.w@recrm.com', phone: '555-0202', status: 'Active', dealsClosed: 5, hireDate: '2022-08-01' },
  { id: 'E003', name: 'Charlie Brown', role: 'Manager', email: 'charlie.b@recrm.com', phone: '555-0203', status: 'Active', dealsClosed: 25, hireDate: '2018-01-20' },
  { id: 'E004', name: 'Diana Prince', role: 'Accountant', email: 'diana.p@recrm.com', phone: '555-0204', status: 'On Leave', dealsClosed: 0, hireDate: '2021-05-10' },
  { id: 'E005', name: 'Ethan Hunt', role: 'IT', email: 'ethan.h@recrm.com', phone: '555-0205', status: 'Active', dealsClosed: 0, hireDate: '2023-02-28' },
];

export const mockDeals: Deal[] = [
  { id: 'D001', title: 'Downtown Apt Sale', clientId: 'C001', clientName: 'John Doe', propertyId: 'P001', propertyTitle: 'Modern Downtown Apartment', value: 245000, status: 'In Progress', closeDate: '2024-08-15' },
  { id: 'D002', title: 'High Street Shop Lease', clientId: 'C004', clientName: 'Emily Davis', propertyId: 'P004', propertyTitle: 'Retail Shop on High Street', value: 36000, status: 'Completed', closeDate: '2024-07-01' },
  { id: 'D003', title: 'Villa Purchase', clientId: 'C003', clientName: 'Michael Brown', propertyId: 'P002', propertyTitle: 'Luxury Family Villa', value: 730000, status: 'In Progress', closeDate: '2024-09-01' },
];

export const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
    { name: 'Jul', sales: 7000 },
];
