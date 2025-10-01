import React from 'react';

export enum UserRole {
  ADMIN = 'Admin',
  AGENT = 'Agent',
  COMPANY_ADMIN = 'Company Admin',
  EMPLOYEE = 'Employee',
  CLIENT = 'Client',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

export interface Client {
  id:string;
  name: string;
  email: string;
  phone: string;
  status: 'New Lead' | 'Contacted' | 'Site Visit' | 'Negotiating' | 'Closed' | 'Lost';
  assignedAgent: string;
  lastContact: string;
  source: string;
}

export type PropertyStatus = 'Available' | 'Rented' | 'Sold' | 'Under Maintenance';

export interface Unit {
  id: string;
  name: string;
  type: 'Studio' | '1BR' | '2BR' | '3BR+' | 'Penthouse' | 'Office' | 'Shop';
  price: number;
  status: PropertyStatus;
  floor: number;
  area: number; // in sq meters
  bedrooms: number;
  bathrooms: number;
  ownerId?: string;
  tenantId?: string;
  imageUrl: string;
  buildingId: string;
  parentInfo?: {
    siteId: string;
    siteName: string;
    buildingName: string;
    location: string;
  }
}

export interface Building {
  id: string;
  name: string;
  floors: number;
  unitCount: number;
  units?: Unit[];
  siteId: string;
}

export interface Site {
  id: string;
  name: string;
  location: string;
  address: string;
  imageUrl: string;
  buildingCount: number;
  buildings?: Building[];
}

export type PropertyItem = Site | Building | Unit;
export type PropertyItemType = 'site' | 'building' | 'unit';


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
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

export interface RecentActivity {
  id: string;
  type: 'New Client' | 'Deal Update' | 'Site Visit' | 'Task Assigned';
  description: string;
  timestamp: string;
  user: string;
  avatarUrl: string;
}

export interface Notification {
  id: string;
  type: 'New Deal' | 'Task Assigned' | 'Client Message' | 'System Update';
  message: string;
  timestamp: string;
  isRead: boolean;
  relatedUser?: string; // e.g., "Alice Johnson"
}

export interface NavLinkItem {
    id: string;
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    allowedRoles: UserRole[];
    isPublic: boolean;
}