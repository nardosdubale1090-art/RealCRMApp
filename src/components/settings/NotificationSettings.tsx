import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import SettingsCard from './SettingsCard';
import { BellIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '../shared/Icons';

// --- Helper Components ---

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange }) => (
  <button
    type="button"
    className={`${
      enabled ? 'bg-primary' : 'bg-gray-600'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card`}
    role="switch"
    aria-checked={enabled}
    onClick={() => onChange(!enabled)}
  >
    <span
      aria-hidden="true"
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

// --- Data Structure ---

type NotificationChannel = 'inApp' | 'email' | 'push';

interface NotificationSetting {
  id: string;
  label: string;
  inApp: boolean;
  email: boolean;
  push: boolean;
}

interface NotificationCategory {
  id: string;
  title: string;
  settings: NotificationSetting[];
}

const getRoleBasedSettings = (role: UserRole | undefined): NotificationCategory[] => {
  const commonSettings: NotificationCategory = {
    id: 'general',
    title: 'General',
    settings: [
      { id: 'systemUpdates', label: 'System Updates & Announcements', inApp: true, email: true, push: false },
    ],
  };

  switch (role) {
    case UserRole.ADMIN:
    case UserRole.COMPANY_ADMIN:
      return [
        {
          id: 'dealsCrm',
          title: 'Deals & CRM',
          settings: [
            { id: 'newLead', label: 'New lead assigned to an agent', inApp: true, email: true, push: false },
            { id: 'dealStatus', label: 'Deal status changes', inApp: true, email: false, push: false },
            { id: 'highValueDeal', label: 'High-value deal created', inApp: true, email: true, push: true },
          ],
        },
        {
          id: 'userManagement',
          title: 'User Management',
          settings: [
            { id: 'newUser', label: 'New user joins the team', inApp: false, email: true, push: false },
            { id: 'roleChange', label: 'User role changes', inApp: true, email: true, push: false },
          ],
        },
        commonSettings,
      ];
    case UserRole.AGENT:
    case UserRole.EMPLOYEE:
       return [
        {
          id: 'dealsCrm',
          title: 'Your Deals & Tasks',
          settings: [
            { id: 'newLeadAssigned', label: 'New lead assigned to you', inApp: true, email: true, push: true },
            { id: 'taskAssigned', label: 'New task assigned to you', inApp: true, email: true, push: false },
            { id: 'dealUpdate', label: 'Update on one of your deals', inApp: true, email: false, push: false },
            { id: 'clientMessage', label: 'New message from a client', inApp: true, email: true, push: true },
          ],
        },
        commonSettings,
      ];
    case UserRole.CLIENT:
       return [
        {
          id: 'propertyUpdates',
          title: 'Property Updates',
          settings: [
            { id: 'newPropertyMatch', label: 'New property matches your interests', inApp: false, email: true, push: false },
            { id: 'priceChange', label: 'Price change on a favorited property', inApp: true, email: true, push: true },
            { id: 'statusChange', label: 'Status change on a favorited property', inApp: true, email: false, push: false },
          ],
        },
        {
          id: 'appointments',
          title: 'Appointments',
          settings: [
            { id: 'appointmentReminder', label: 'Appointment reminders', inApp: true, email: true, push: true },
            { id: 'appointmentChange', label: 'Appointment confirmations & changes', inApp: true, email: true, push: false },
          ],
        },
      ];
    default:
      return [];
  }
};

// --- Main Component ---

const NotificationSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(() => getRoleBasedSettings(user?.role));
  const [allEnabled, setAllEnabled] = useState(true);

  const handleToggle = (categoryId: string, settingId: string, channel: NotificationChannel) => {
    setSettings(prevSettings =>
      prevSettings.map(category =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map(setting =>
                setting.id === settingId
                  ? { ...setting, [channel]: !setting[channel] }
                  : setting
              ),
            }
          : category
      )
    );
  };
  
  const handleToggleAll = (enabled: boolean) => {
      setAllEnabled(enabled);
      setSettings(prevSettings =>
        prevSettings.map(category => ({
            ...category,
            settings: category.settings.map(setting => ({
                ...setting,
                inApp: enabled,
                email: enabled,
                push: enabled,
            }))
        }))
      );
  }

  return (
    <SettingsCard
      title="Notification Preferences"
      description="Choose how you receive alerts across the platform."
      footer={
        <button className="px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors">
          Save Changes
        </button>
      }
    >
      <div className="space-y-8">
        {/* Master Control */}
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
          <div>
            <h4 className="font-semibold text-text-primary">Enable All Notifications</h4>
            <p className="text-sm text-text-secondary">A master switch for all alerts.</p>
          </div>
          <ToggleSwitch enabled={allEnabled} onChange={handleToggleAll} />
        </div>

        {/* Categories */}
        {settings.map(category => (
          <div key={category.id}>
            <h3 className="text-lg font-semibold text-text-primary mb-4 border-b border-border pb-2">{category.title}</h3>
            
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="sr-only sm:not-sr-only">
                        <tr>
                            <th className="py-2 text-left text-sm font-semibold text-text-secondary">Notification Type</th>
                            <th className="w-24 py-2 text-center text-sm font-semibold text-text-secondary">
                                <div className="flex items-center justify-center gap-2">
                                    <BellIcon className="h-5 w-5" /> In-App
                                </div>
                            </th>
                            <th className="w-24 py-2 text-center text-sm font-semibold text-text-secondary">
                                 <div className="flex items-center justify-center gap-2">
                                    <EnvelopeIcon className="h-5 w-5" /> Email
                                </div>
                            </th>
                             <th className="w-24 py-2 text-center text-sm font-semibold text-text-secondary">
                                 <div className="flex items-center justify-center gap-2">
                                    <DevicePhoneMobileIcon className="h-5 w-5" /> Push
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {category.settings.map(setting => (
                            <tr key={setting.id}>
                                <td className="py-4 pr-4 text-sm font-medium text-text-primary">{setting.label}</td>
                                <td className="py-4 text-center">
                                    <ToggleSwitch enabled={setting.inApp} onChange={() => handleToggle(category.id, setting.id, 'inApp')} />
                                </td>
                                 <td className="py-4 text-center">
                                    <ToggleSwitch enabled={setting.email} onChange={() => handleToggle(category.id, setting.id, 'email')} />
                                </td>
                                 <td className="py-4 text-center">
                                    <ToggleSwitch enabled={setting.push} onChange={() => handleToggle(category.id, setting.id, 'push')} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        ))}
      </div>
    </SettingsCard>
  );
};

export default NotificationSettings;
