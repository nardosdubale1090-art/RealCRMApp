// /src/pages/settins/Settings.tsx

import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import SettingsNavigation from '../../components/settings/SettingsNavigation';
import SubNavigation from '../../components/settings/SubNavigation';
import SettingsCard from '../../components/settings/SettingsCard';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import {
  BuildingOfficeIcon,
  UsersIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
  BuildingOffice2Icon,
  CreditCardIcon,
  BellAlertIcon,
  UserCircleIcon,
  PuzzlePieceIcon,
} from '../../components/shared/Icons';

// --- Navigation Structure ---

interface SubTab {
  id: string;
  name: string;
}

interface MainTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subTabs?: SubTab[];
}

const ADMIN_TABS: MainTab[] = [
  { id: 'tenantManagement', name: 'Tenant Management', icon: BuildingOfficeIcon },
  { id: 'userAdministration', name: 'User Administration', icon: UsersIcon },
  { id: 'rolesPermissions', name: 'Roles & Permissions', icon: ShieldCheckIcon },
  { id: 'notifications', name: 'Notifications', icon: BellAlertIcon },
  { 
    id: 'systemSettings', 
    name: 'System Settings', 
    icon: Cog6ToothIcon,
    subTabs: [
        { id: 'general', name: 'General' },
        { id: 'integrations', name: 'Integrations' },
        { id: 'apiKeys', name: 'API Keys' },
    ]
  },
  { 
    id: 'appearance', 
    name: 'Appearance', 
    icon: PaintBrushIcon,
    subTabs: [
      { id: 'theme', name: 'Theme & Color' },
      { id: 'layout', name: 'Layout' },
      { id: 'typography', name: 'Typography' },
    ]
  },
];

const TENANT_TABS: MainTab[] = [
  { id: 'companyProfile', name: 'Company Profile', icon: BuildingOffice2Icon },
  { 
    id: 'userManagement', 
    name: 'User Management', 
    icon: UsersIcon,
    subTabs: [
      { id: 'users', name: 'Users' },
      { id: 'invitations', name: 'Invitations' },
      { id: 'roles', name: 'Roles' },
    ]
  },
  { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  { id: 'notifications', name: 'Notifications', icon: BellAlertIcon },
  { 
    id: 'appearance', 
    name: 'Appearance', 
    icon: PaintBrushIcon,
    subTabs: [
      { id: 'theme', name: 'Theme & Color' },
      { id: 'layout', name: 'Layout' },
      { id: 'typography', name: 'Typography' },
    ]
  },
];

const AGENT_TABS: MainTab[] = [
  { 
    id: 'profile', 
    name: 'Profile', 
    icon: UserCircleIcon,
    subTabs: [
        { id: 'personalInfo', name: 'Personal Info' },
        { id: 'security', name: 'Security' },
    ]
  },
  { id: 'notifications', name: 'Notifications', icon: BellAlertIcon },
  { id: 'integrations', name: 'Integrations', icon: PuzzlePieceIcon },
  { 
    id: 'appearance', 
    name: 'Appearance', 
    icon: PaintBrushIcon,
    subTabs: [
      { id: 'theme', name: 'Theme & Color' },
      { id: 'layout', name: 'Layout' },
      { id: 'typography', name: 'Typography' },
    ]
  },
];

const CLIENT_TABS: MainTab[] = [
  { id: 'personalProfile', name: 'Personal Profile', icon: UserCircleIcon },
  { id: 'notifications', name: 'Notifications', icon: BellAlertIcon },
  { 
    id: 'appearance', 
    name: 'Appearance', 
    icon: PaintBrushIcon,
    subTabs: [
      { id: 'theme', name: 'Theme & Color' },
      { id: 'layout', name: 'Layout' },
      { id: 'typography', name: 'Typography' },
    ]
  },
];

// --- Main Component ---

const Settings: React.FC = () => {
  const { user } = useAuth();

  const TABS = useMemo(() => {
    switch (user?.role) {
      case UserRole.ADMIN: return ADMIN_TABS;
      case UserRole.COMPANY_ADMIN: return TENANT_TABS;
      case UserRole.AGENT:
      case UserRole.EMPLOYEE: return AGENT_TABS;
      case UserRole.CLIENT: return CLIENT_TABS;
      default: return [];
    }
  }, [user]);

  const [activeTab, setActiveTab] = useState(TABS.length > 0 ? TABS[0].id : '');
  const [activeSubTab, setActiveSubTab] = useState('');
  
  const currentTab = useMemo(() => TABS.find(t => t.id === activeTab), [TABS, activeTab]);

  useEffect(() => {
    if (TABS.length > 0 && !TABS.some(t => t.id === activeTab)) {
        const firstTab = TABS[0];
        setActiveTab(firstTab.id);
        setActiveSubTab(firstTab.subTabs ? firstTab.subTabs[0].id : '');
    } else if (currentTab && (!activeSubTab || !currentTab.subTabs?.some(st => st.id === activeSubTab))) {
        setActiveSubTab(currentTab.subTabs ? currentTab.subTabs[0].id : '');
    }
  }, [TABS, activeTab, currentTab, activeSubTab]);

  const handleSetMainTab = (tabId: string) => {
    setActiveTab(tabId);
    const selectedTab = TABS.find(t => t.id === tabId);
    setActiveSubTab(selectedTab?.subTabs ? selectedTab.subTabs[0].id : '');
  };

  const renderContent = () => {
    if (!user) return <SettingsCard title="Error" description="Could not load settings." />;
    
    // Handle specific top-level tabs first
    if (activeTab === 'appearance') {
        return <AppearanceSettings activeSubTab={activeSubTab} />;
    }
    if (activeTab === 'notifications') {
        return <NotificationSettings />;
    }

    switch (user.role) {
      case UserRole.ADMIN:
        switch (activeTab) {
          case 'tenantManagement': return <SettingsCard title="Manage Tenants" description="Oversee all companies." />;
          case 'userAdministration': return <SettingsCard title="Manage All Users" description="View and manage every user." />;
          case 'rolesPermissions': return <SettingsCard title="System Roles" description="Define and assign system-level roles." />;
          case 'systemSettings':
            switch (activeSubTab) {
                case 'general': return <SettingsCard title="General System Settings" description="Global configurations." />;
                case 'integrations': return <SettingsCard title="System-Wide Integrations" description="Manage global integrations." />;
                case 'apiKeys': return <SettingsCard title="API Keys" description="Manage API access for the platform." />;
                default: return null;
            }
          default: return null;
        }

      case UserRole.COMPANY_ADMIN:
        switch (activeTab) {
          case 'companyProfile': return <SettingsCard title="Company Information" description="Update your company's details." />;
          case 'userManagement':
            switch (activeSubTab) {
              case 'users': return <SettingsCard title="Manage Team Members" description="Invite, edit, and remove employees." />;
              case 'invitations': return <SettingsCard title="Pending Invitations" description="View and manage pending user invites." />;
              case 'roles': return <SettingsCard title="Team Roles" description="Define custom roles for your team." />;
              default: return null;
            }
          case 'billing': return <SettingsCard title="Subscription & Billing" description="Manage your subscription plan." />;
          default: return null;
        }

      case UserRole.AGENT:
      case UserRole.EMPLOYEE:
        switch (activeTab) {
          case 'profile':
            switch (activeSubTab) {
              case 'personalInfo': return <SettingsCard title="Personal Information" description="Update your name, email, etc." />;
              case 'security': return <SettingsCard title="Security Settings" description="Change your password and manage 2FA." />;
              default: return null;
            }
          case 'integrations': return <SettingsCard title="Connected Applications" description="Manage your integrations." />;
          default: return null;
        }
        
      case UserRole.CLIENT:
        switch (activeTab) {
            case 'personalProfile': return <SettingsCard title="Profile Information" description="Update your contact details." />;
            default: return null;
        }
      default: return null;
    }
  };
  
  if (TABS.length === 0 && user) {
      return (
          <div className="space-y-6">
              <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
              <SettingsCard title="No Settings" description="No settings available for your account." />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <aside className="md:col-span-3 lg:col-span-2">
          <SettingsNavigation tabs={TABS} activeTab={activeTab} setActiveTab={handleSetMainTab} />
        </aside>
        <div className="md:col-span-9 lg:col-span-10 mt-8 md:mt-0">
          {currentTab?.subTabs && (
            <SubNavigation
              tabs={currentTab.subTabs}
              activeTab={activeSubTab}
              setActiveTab={setActiveSubTab}
            />
          )}
          <div className={currentTab?.subTabs ? 'mt-6' : ''}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
