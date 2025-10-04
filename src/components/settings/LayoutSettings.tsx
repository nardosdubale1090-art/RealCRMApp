// /src/component/settings/LayoutSettings.tsx

import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
// Fix: Corrected typo from Square2x2Icon to Squares2X2Icon.
import { Squares2X2Icon, ArrowRightOnRectangleIcon } from '../shared/Icons';
import SettingsCard from './SettingsCard';

type Layout = 'vertical' | 'horizontal';
type MobileLayout = 'bottom' | 'sidebar';

const LAYOUTS: { name: Layout; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'vertical', label: 'Sidebar', icon: Squares2X2Icon },
  { name: 'horizontal', label: 'Top navbar', icon: ArrowRightOnRectangleIcon },
];

const MOBILE_LAYOUTS: { name: MobileLayout; label:string; }[] = [
    { name: 'bottom', label: 'Bottom navbar' },
    { name: 'sidebar', label: 'Sidebar' },
];

interface LayoutSettingsProps {
    localLayout: Layout;
    setLocalLayout: (layout: Layout) => void;
    localMobileLayout: MobileLayout;
    setLocalMobileLayout: (layout: MobileLayout) => void;
}

const LayoutSettings: React.FC<LayoutSettingsProps> = ({ localLayout, setLocalLayout, localMobileLayout, setLocalMobileLayout }) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <SettingsCard title="Navigation Style" description={isMobile ? "Choose your preferred layout on small screens." : "Select how you'd like to navigate on larger screens."}>
            {isMobile ? (
                <div className="grid grid-cols-2 gap-4">
                    {MOBILE_LAYOUTS.map((l) => (
                        <button
                            key={l.name}
                            onClick={() => setLocalMobileLayout(l.name)}
                            className={`w-full p-4 border rounded-lg font-medium text-sm transition-all ${
                                localMobileLayout === l.name ? 'border-primary text-primary ring-2 ring-primary' : 'border-border bg-secondary hover:border-text-secondary text-text-secondary'
                            }`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {LAYOUTS.map((l) => (
                        <button
                            key={l.name}
                            onClick={() => setLocalLayout(l.name)}
                            className={`w-full px-3 py-2 border rounded-lg flex items-center justify-center space-x-3 transition-all ${
                                localLayout === l.name ? 'border-primary ring-2 ring-primary' : 'border-border bg-secondary hover:border-text-secondary'
                            }`}
                        >
                            <l.icon className={`h-5 w-5 ${localLayout === l.name ? 'text-primary' : 'text-text-secondary'}`} />
                            <span className={`text-sm font-medium ${localLayout === l.name ? 'text-primary' : 'text-text-secondary'}`}>{l.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </SettingsCard>
    );
};

export default LayoutSettings;