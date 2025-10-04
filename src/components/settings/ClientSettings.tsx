// /src/component/settings/ClientSettings.tsx

import React from 'react';
import SettingsCard from './SettingsCard';

const ClientSettings: React.FC = () => {
  return (
    <SettingsCard title="Profile Information" description="Update your contact details.">
      <p className="text-text-secondary">Form to edit client profile information will be here.</p>
    </SettingsCard>
  );
};

export default ClientSettings;
