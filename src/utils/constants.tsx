// /src/utils/constants.tsx

import React from 'react';
import { HomeIcon, Cog6ToothIcon, UsersIcon, BuildingOffice2Icon, BanknotesIcon, BriefcaseIcon, CalendarDaysIcon, ChartBarIcon, SparklesIcon, ListBulletIcon } from '../components/shared/Icons';
import { UserRole, NavLinkItem } from '../types';

export const DEFAULT_NAV_LINKS: NavLinkItem[] = [
    { id: 'properties', name: 'Properties', href: '/properties', icon: BuildingOffice2Icon, allowedRoles: [UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN, UserRole.CLIENT], isPublic: true },
    
    // Client-specific links
    { id: 'my-interests', name: 'My Interests', href: '/my-interests', icon: SparklesIcon, allowedRoles: [UserRole.CLIENT], isPublic: false },
    { id: 'my-schedule', name: 'My Schedule', href: '/my-schedule', icon: ListBulletIcon, allowedRoles: [UserRole.CLIENT], isPublic: false },
    
    // Internal links
    { id: 'clients', name: 'Clients (CRM)', href: '/clients', icon: UsersIcon, allowedRoles: [UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN], isPublic: false },
    { id: 'deals', name: 'Deals', href: '/deals', icon: BanknotesIcon, allowedRoles: [UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN], isPublic: false },
    { id: 'employees', name: 'Employees', href: '/employees', icon: BriefcaseIcon, allowedRoles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN], isPublic: false },
    { id: 'attendance', name: 'Attendance', href: '/attendance', icon: CalendarDaysIcon, allowedRoles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE], isPublic: false },
    { id: 'calendar', name: 'Calendar', href: '/calendar', icon: CalendarDaysIcon, allowedRoles: [UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE], isPublic: false },
    { id: 'reports', name: 'Reports', href: '/reports', icon: ChartBarIcon, allowedRoles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN], isPublic: false },
];