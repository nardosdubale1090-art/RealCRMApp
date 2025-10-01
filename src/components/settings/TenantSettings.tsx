import React from 'react';
import SettingsCard from './SettingsCard';

const TenantSettings: React.FC = () => {
  return (
      <SettingsCard title="Company Information" description="Update your company's details, logo, and contact information.">
        <p className="text-text-secondary">Form to edit company details will be here.</p>
      </SettingsCard>
  );
};

export default TenantSettings;
