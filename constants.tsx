
import React from 'react';
import { HomeIcon, UsersIcon, BuildingOffice2Icon, BanknotesIcon, BriefcaseIcon, CalendarDaysIcon, ChartBarIcon, Cog6ToothIcon } from './components/shared/Icons';

export const NAV_LINKS = [
    { name: 'Dashboard', href: '#/', icon: HomeIcon },
    { name: 'Clients (CRM)', href: '#/clients', icon: UsersIcon },
    { name: 'Properties', href: '#/properties', icon: BuildingOffice2Icon },
    { name: 'Deals', href: '#/deals', icon: BanknotesIcon },
    { name: 'Employees', href: '#/employees', icon: BriefcaseIcon },
    { name: 'Attendance', href: '#/attendance', icon: CalendarDaysIcon },
    { name: 'Calendar', href: '#/calendar', icon: CalendarDaysIcon },
    { name: 'Reports', href: '#/reports', icon: ChartBarIcon },
    { name: 'Settings', href: '#/settings', icon: Cog6ToothIcon },
];
