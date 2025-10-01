import type { Client, Employee, Deal, Kpi, RecentActivity, Unit } from '../types';
import { BanknotesIcon, UsersIcon, ClockIcon, ArrowTrendingUpIcon } from '../components/shared/Icons';
import { mockSites } from './properties.data';

export const mockKpis: Kpi[] = [
  { title: 'Total Clients', value: '1,286', change: '+15%', changeType: 'increase', icon: UsersIcon },
  { title: 'New Leads (7 days)', value: '84', change: '+2.1%', changeType: 'increase', icon: ArrowTrendingUpIcon },
  { title: 'Deals Closed (30 days)', value: '22', change: '-3.2%', changeType: 'decrease', icon: BanknotesIcon },
  { title: 'Attendance %', value: '98.5%', icon: ClockIcon },
];

export const mockClients: Client[] = [
  { id: 'C001', name: 'John Doe', email: 'john.doe@example.com', phone: '555-0101', status: 'Negotiating', assignedAgent: 'Alice Johnson', lastContact: '2024-07-20', source: 'Referral' },
  { id: 'C002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-0102', status: 'New Lead', assignedAgent: 'Bob Williams', lastContact: '2024-07-22', source: 'Website' },
  { id: 'C003', name: 'Michael Brown', email: 'michael.b@example.com', phone: '555-0103', status: 'Site Visit', assignedAgent: 'Alice Johnson', lastContact: '2024-07-18', source: 'Social Media' },
  { id: 'C004', name: 'Emily Davis', email: 'emily.d@example.com', phone: '555-0104', status: 'Closed', assignedAgent: 'Charlie Brown', lastContact: '2024-06-30', source: 'Walk-in' },
  { id: 'C005', name: 'David Wilson', email: 'david.w@example.com', phone: '555-0105', status: 'Contacted', assignedAgent: 'Bob Williams', lastContact: '2024-07-21', source: 'Referral' },
];

export const mockFeaturedUnits: Unit[] = mockSites
    .flatMap(site => site.buildings?.flatMap(bld => bld.units) || [])
    .filter(unit => unit !== undefined)
    .slice(0, 4) as Unit[];

export const mockFavoritedUnits: Unit[] = mockSites
    .flatMap(site => site.buildings?.flatMap(bld => bld.units) || [])
    .filter(unit => unit !== undefined)
    .slice(2, 4) as Unit[];


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

export const dealPipelineData = [
    { name: 'Leads', value: 120 },
    { name: 'Contacted', value: 95 },
    { name: 'Site Visit', value: 60 },
    { name: 'Negotiating', value: 45 },
    { name: 'Closed', value: 22 },
];

export const leadConversionData = [
    { name: 'Jan', Leads: 65, Converted: 28 },
    { name: 'Feb', Leads: 59, Converted: 25 },
    { name: 'Mar', Leads: 80, Converted: 35 },
    { name: 'Apr', Leads: 81, Converted: 40 },
    { name: 'May', Leads: 56, Converted: 22 },
    { name: 'Jun', Leads: 75, Converted: 39 },
    { name: 'Jul', Leads: 84, Converted: 41 },
];

export const propertyStatusData = [
    { name: 'For Sale', value: 400 },
    { name: 'Sold', value: 150 },
    { name: 'In Negotiation', value: 50 },
];

export const employeePerformanceData = [
    { name: 'Alice J.', deals: 12 },
    { name: 'Bob W.', deals: 5 },
    { name: 'Clara E.', deals: 9 },
    { name: 'David F.', deals: 7 },
    { name: 'Eve G.', deals: 11 },
];

export const mockActivities: RecentActivity[] = [
    { id: 'A001', type: 'New Client', description: 'Jane Smith signed up via Website.', timestamp: '2 mins ago', user: 'System', avatarUrl: 'https://i.pravatar.cc/150?u=system' },
    { id: 'A002', type: 'Deal Update', description: 'Deal for "Luxury Villa" moved to Negotiating.', timestamp: '15 mins ago', user: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=E001' },
    { id: 'A003', type: 'Site Visit', description: 'Scheduled a visit for Michael Brown.', timestamp: '1 hour ago', user: 'Alice Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=E001' },
    { id: 'A004', type: 'Task Assigned', description: 'Follow up with David Wilson assigned to Bob.', timestamp: '3 hours ago', user: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=E003' },
    { id: 'A005', type: 'New Client', description: 'Mark Evans added from Referral.', timestamp: '8 hours ago', user: 'Bob Williams', avatarUrl: 'https://i.pravatar.cc/150?u=E002' },
];