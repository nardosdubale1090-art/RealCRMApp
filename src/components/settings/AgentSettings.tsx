// /src/component/settings/AgentSettings.tsx

import React from 'react';
import SettingsCard from './SettingsCard';

const AgentSettings: React.FC = () => {
  return (
      <SettingsCard title="Personal Information" description="Update your name, email, and password.">
        <p className="text-text-secondary">Form to edit user profile will be here.</p>
      </SettingsCard>
  );
};

export default AgentSettings;
