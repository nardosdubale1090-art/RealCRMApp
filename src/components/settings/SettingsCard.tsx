import React from 'react';

interface SettingsCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, description, children, footer }) => {
  return (
    <div className="bg-card rounded-lg shadow-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary">{description}</p>
      </div>
      {children && <div className="p-6">{children}</div>}
      {footer && (
        <div className="bg-secondary px-6 py-4 rounded-b-lg text-right">
            {footer}
        </div>
      )}
    </div>
  );
};

export default SettingsCard;
