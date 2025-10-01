import React from 'react';
import SettingsCard from './SettingsCard';

const AdminSettings: React.FC = () => {
  return (
      <SettingsCard title="Manage Tenants" description="Oversee all real estate companies using the platform.">
        <p className="text-text-secondary">Tenant management UI will be here.</p>
      </SettingsCard>
  );
};

export default AdminSettings;
