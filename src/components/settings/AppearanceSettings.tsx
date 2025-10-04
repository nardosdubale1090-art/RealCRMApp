// /src/component/settings/AppearanceSettings.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppearance } from '../../context/AppearanceContext';
import { useToast } from '../../context/ToastContext';
import { ArrowPathIcon, XCircleIcon, ExclamationTriangleIcon } from '../shared/Icons';
import SettingsCard from './SettingsCard';
import ThemeSettings from './ThemeSettings';
import LayoutSettings from './LayoutSettings';
import TypographySettings from './TypographySettings';

type BaseTheme = ReturnType<typeof useAppearance>['baseTheme'];
type AccentColor = ReturnType<typeof useAppearance>['accentColor'];
type Layout = ReturnType<typeof useAppearance>['layout'];
type MobileLayout = ReturnType<typeof useAppearance>['mobileLayout'];
type FontFamily = ReturnType<typeof useAppearance>['fontFamily'];
type BaseFontSize = ReturnType<typeof useAppearance>['baseFontSize'];

interface AppearanceSettingsProps {
    activeSubTab: string;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ activeSubTab }) => {
  const { 
    baseTheme: globalBaseTheme, setBaseTheme, 
    accentColor: globalAccentColor, setAccentColor,
    layout: globalLayout, setLayout, 
    mobileLayout: globalMobileLayout, setMobileLayout,
    fontFamily: globalFontFamily, setFontFamily,
    baseFontSize: globalBaseFontSize, setBaseFontSize,
    resetAppearance
  } = useAppearance();
  const { showToast } = useToast();

  // Local state for live previews
  const [localBaseTheme, setLocalBaseTheme] = useState(globalBaseTheme);
  const [localAccentColor, setLocalAccentColor] = useState(globalAccentColor);
  const [localLayout, setLocalLayout] = useState(globalLayout);
  const [localMobileLayout, setLocalMobileLayout] = useState(globalMobileLayout);
  const [localFontFamily, setLocalFontFamily] = useState(globalFontFamily);
  const [localBaseFontSize, setLocalBaseFontSize] = useState(globalBaseFontSize);

  const [hasChanges, setHasChanges] = useState(false);
  const [isResetConfirming, setIsResetConfirming] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);
  
  // --- Effects ---

  // Re-sync local state if global state changes (e.g., another browser tab)
  useEffect(() => {
    setLocalBaseTheme(globalBaseTheme);
    setLocalAccentColor(globalAccentColor);
    setLocalLayout(globalLayout);
    setLocalMobileLayout(globalMobileLayout);
    setLocalFontFamily(globalFontFamily);
    setLocalBaseFontSize(globalBaseFontSize);
  }, [globalBaseTheme, globalAccentColor, globalLayout, globalMobileLayout, globalFontFamily, globalBaseFontSize]);
  
  // Detect if there are unsaved changes to show the save bar
  useEffect(() => {
    const changesExist =
      localBaseTheme !== globalBaseTheme ||
      localAccentColor !== globalAccentColor ||
      localLayout !== globalLayout ||
      localMobileLayout !== globalMobileLayout ||
      localFontFamily !== globalFontFamily ||
      localBaseFontSize !== globalBaseFontSize;
    setHasChanges(changesExist);
  }, [localBaseTheme, localAccentColor, localLayout, localMobileLayout, localFontFamily, localBaseFontSize, globalBaseTheme, globalAccentColor, globalLayout, globalMobileLayout, globalFontFamily, globalBaseFontSize]);

  // Cleanup for reset confirmation timeout
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  // --- Handlers ---

  const handleSave = () => {
    setBaseTheme(localBaseTheme);
    setAccentColor(localAccentColor);
    setLayout(localLayout);
    setMobileLayout(localMobileLayout);
    setFontFamily(localFontFamily);
    setBaseFontSize(localBaseFontSize);
    showToast('Appearance settings saved!');
  };

  const handleDiscard = () => {
    setLocalBaseTheme(globalBaseTheme);
    setLocalAccentColor(globalAccentColor);
    setLocalLayout(globalLayout);
    setLocalMobileLayout(globalMobileLayout);
    setLocalFontFamily(globalFontFamily);
    setLocalBaseFontSize(globalBaseFontSize);
  }

  const handleReset = () => {
    if (isResetConfirming) {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
      resetAppearance();
      showToast('Appearance reset to defaults.');
      setIsResetConfirming(false);
    } else {
      setIsResetConfirming(true);
      resetTimeoutRef.current = window.setTimeout(() => setIsResetConfirming(false), 3000);
    }
  };

  const renderSubContent = () => {
      switch(activeSubTab) {
          case 'theme':
              return (
                <ThemeSettings 
                    localBaseTheme={localBaseTheme}
                    setLocalBaseTheme={setLocalBaseTheme}
                    localAccentColor={localAccentColor}
                    setLocalAccentColor={setLocalAccentColor}
                />
              );
          case 'layout':
              return (
                <LayoutSettings
                    localLayout={localLayout}
                    setLocalLayout={setLocalLayout}
                    localMobileLayout={localMobileLayout}
                    setLocalMobileLayout={setLocalMobileLayout}
                />
              );
          case 'typography':
              return (
                <TypographySettings
                    localFontFamily={localFontFamily}
                    setLocalFontFamily={setLocalFontFamily}
                    localBaseFontSize={localBaseFontSize}
                    setLocalBaseFontSize={setLocalBaseFontSize}
                />
              );
          default:
              return <SettingsCard title="Appearance" description="Select an appearance category." />;
      }
  }

  return (
    <div className="pb-24">
      {renderSubContent()}
      
      <div className={`fixed bottom-0 right-0 left-0 md:left-auto z-40 p-4 transition-transform duration-500 ease-in-out ${hasChanges ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="container mx-auto flex justify-center md:justify-end">
          <div className="bg-card rounded-lg shadow-2xl p-3 flex items-center space-x-3 border border-border">
            <button
                onClick={handleDiscard}
                className="flex items-center px-4 py-2 text-sm font-medium bg-secondary text-text-secondary rounded-lg hover:bg-gray-700/50 hover:text-text-primary transition-colors"
                title="Discard changes"
            >
                <XCircleIcon className="h-5 w-5 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Discard</span>
            </button>
             <button
                onClick={handleReset}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isResetConfirming 
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-secondary text-text-secondary hover:bg-gray-700/50 hover:text-text-primary'
                }`}
                title={isResetConfirming ? 'Confirm reset' : 'Reset to defaults'}
            >
                {isResetConfirming ? (
                    <ExclamationTriangleIcon className="h-5 w-5 mr-0 sm:mr-2" />
                ) : (
                    <ArrowPathIcon className="h-5 w-5 mr-0 sm:mr-2" />
                )}
                <span className="hidden sm:inline">{isResetConfirming ? 'Confirm' : 'Reset'}</span>
            </button>
            <button
                onClick={handleSave}
                className="px-6 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
                Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
