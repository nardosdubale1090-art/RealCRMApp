// /src/component/settings/ThemeSettings.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ACCENT_PALETTES } from '../../context/AppearanceContext';
import { ComputerDesktopIcon, SunIcon, MoonIcon } from '../shared/Icons';
import SettingsCard from './SettingsCard';

type BaseTheme = 'system' | 'light' | 'dark-pro' | 'midnight';
type AccentColor = 'indigo' | 'forest' | 'rose' | 'sunrise' | 'violet' | 'ocean';

const BASE_THEMES: { name: BaseTheme; label: string; icon: React.ComponentType<{className?: string}> }[] = [
  { name: 'system', label: 'System', icon: ComputerDesktopIcon },
  { name: 'light', label: 'Light', icon: SunIcon },
  { name: 'dark-pro', label: 'Dark Pro', icon: MoonIcon },
  { name: 'midnight', label: 'Midnight', icon: MoonIcon },
];

const ACCENT_COLORS_DATA = Object.entries(ACCENT_PALETTES).map(([key, value]) => ({
    name: key as AccentColor,
    label: value.label,
    primaryHex: value.primaryHex,
}));

interface ThemeSettingsProps {
    localBaseTheme: BaseTheme;
    setLocalBaseTheme: (theme: BaseTheme) => void;
    localAccentColor: AccentColor;
    setLocalAccentColor: (accent: AccentColor) => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ localBaseTheme, setLocalBaseTheme, localAccentColor, setLocalAccentColor }) => {
    
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => 
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
    
    const applyPreviewTheme = useCallback((theme: BaseTheme) => {
        const root = document.documentElement;
        root.classList.remove('theme-light', 'theme-dark-pro', 'theme-midnight');
        if (theme === 'system') {
            root.classList.add(systemTheme === 'dark' ? 'theme-dark-pro' : 'theme-light');
        } else {
            root.classList.add(`theme-${theme}`);
        }
    }, [systemTheme]);

    const applyPreviewAccent = useCallback((accent: AccentColor) => {
        const root = document.documentElement;
        const accentPalette = ACCENT_PALETTES[accent] || ACCENT_PALETTES.indigo;
        for (const [key, value] of Object.entries(accentPalette.vars)) {
            root.style.setProperty(key, value);
        }
    }, []);
    
    useEffect(() => {
        applyPreviewTheme(localBaseTheme);
    }, [localBaseTheme, applyPreviewTheme]);

    useEffect(() => {
        applyPreviewAccent(localAccentColor);
    }, [localAccentColor, applyPreviewAccent]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const filteredBaseThemes = useMemo(() => {
        return BASE_THEMES.filter(theme => 
          theme.name === 'system' || 
          (systemTheme === 'dark' && theme.name !== 'dark-pro') ||
          (systemTheme === 'light' && theme.name !== 'light')
        );
    }, [systemTheme]);

    return (
        <div className="space-y-8">
            <SettingsCard title="Base Theme" description="Select the foundational look of the interface.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredBaseThemes.map((t) => (
                        <div key={t.name} className="text-center">
                            <button
                                onClick={() => setLocalBaseTheme(t.name)}
                                className={`w-full p-4 border rounded-lg flex flex-col items-center justify-center transition-all aspect-[4/3] relative ${
                                    localBaseTheme === t.name ? 'border-primary ring-2 ring-primary' : 'border-border bg-secondary hover:border-text-secondary'
                                }`}
                            >
                                <t.icon className={`h-8 w-8 mb-2 ${localBaseTheme === t.name ? 'text-primary' : 'text-text-secondary'}`} />
                                <span className={`text-sm font-medium ${localBaseTheme === t.name ? 'text-primary' : 'text-text-secondary'}`}>{t.label}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </SettingsCard>

            <SettingsCard title="Accent Color" description="Choose a palette for buttons, charts, and highlights.">
                <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6">
                    {ACCENT_COLORS_DATA.map((palette) => (
                        <div key={palette.name} className="flex flex-col items-center">
                            <button
                                onClick={() => setLocalAccentColor(palette.name)}
                                className={`p-1 rounded-full transition-all duration-200 ${
                                localAccentColor === palette.name ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : 'hover:scale-110'
                                }`}
                                aria-label={`Select ${palette.label} accent color`}
                            >
                                <div className="w-10 h-10 rounded-full" style={{ backgroundColor: palette.primaryHex }} />
                            </button>
                            <p className={`mt-3 text-center text-xs font-medium ${localAccentColor === palette.name ? 'text-primary' : 'text-text-secondary'}`}>
                                {palette.label}
                            </p>
                        </div>
                    ))}
                </div>
            </SettingsCard>
        </div>
    );
};

export default ThemeSettings;
