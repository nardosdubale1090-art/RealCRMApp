
export enum UserRole {
  ADMIN = 'Admin',
  AGENT = 'Agent',
  COMPANY_ADMIN = 'Company Admin',
  EMPLOYEE = 'Employee',
  CLIENT = 'Client',
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'New Lead' | 'Contacted' | 'Site Visit' | 'Negotiating' | 'Closed' | 'Lost';
  assignedAgent: string;
  lastContact: string;
  source: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  type: 'Apartment' | 'Villa' | 'Office' | 'Shop';
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Rented';
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in sq meters
  imageUrl: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Sales Junior' | 'Sales Senior' | 'Supervisor' | 'Manager' | 'Accountant' | 'IT';
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  dealsClosed: number;
  hireDate: string;
}

export interface Deal {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  propertyId: string;
  propertyTitle: string;
  value: number;
  status: 'In Progress' | 'Completed' | 'Cancelled';
  closeDate: string;
}

export interface Kpi {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}
