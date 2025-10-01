import React, { useCallback, useEffect } from 'react';
import SettingsCard from './SettingsCard';
import FontFamilyDropdown from './FontFamilyDropdown';
import { FONT_FAMILIES } from '../../context/AppearanceContext';

type FontFamily = 'inter' | 'poppins' | 'roboto' | 'lato' | 'lora' | 'nunito-sans' | 'playfair-display' | 'source-code-pro' | 'open-sans' | 'montserrat' | 'merriweather';
type BaseFontSize = 14 | 15 | 16 | 17 | 18;

const FONT_SIZE_LABELS: Record<number, string> = {
    14: 'Compact',
    15: 'Small',
    16: 'Default',
    17: 'Large',
    18: 'Spacious',
};

interface TypographySettingsProps {
    localFontFamily: FontFamily;
    setLocalFontFamily: (font: FontFamily) => void;
    localBaseFontSize: BaseFontSize;
    setLocalBaseFontSize: (size: BaseFontSize) => void;
}

const TypographySettings: React.FC<TypographySettingsProps> = ({ localFontFamily, setLocalFontFamily, localBaseFontSize, setLocalBaseFontSize }) => {
    
    const applyPreviewTypography = useCallback((font: FontFamily, size: BaseFontSize) => {
        const root = document.documentElement;
        const fontData = FONT_FAMILIES[font] || FONT_FAMILIES.inter;
        root.style.setProperty('--font-family-sans', fontData.css);
        root.style.fontSize = `${size}px`;
    }, []);

    useEffect(() => {
        applyPreviewTypography(localFontFamily, localBaseFontSize);
    }, [localFontFamily, localBaseFontSize, applyPreviewTypography]);
    
    return (
        <SettingsCard title="Typography" description="Customize the font family and size for the application.">
            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Font Family</label>
                    <FontFamilyDropdown value={localFontFamily} onChange={setLocalFontFamily} />
                </div>
                <div>
                    <label htmlFor="font-size-slider" className="block text-sm font-medium text-text-secondary mb-3">
                        Base Font Size: <span className="font-bold text-text-primary">{FONT_SIZE_LABELS[localBaseFontSize] || `${localBaseFontSize}px`}</span>
                    </label>
                    <input
                        id="font-size-slider"
                        type="range"
                        min="14"
                        max="18"
                        step="1"
                        value={localBaseFontSize}
                        onChange={(e) => setLocalBaseFontSize(parseInt(e.target.value, 10) as BaseFontSize)}
                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-text-secondary mt-1">
                        <span>Compact</span>
                        <span>Spacious</span>
                    </div>
                </div>
            </div>
        </SettingsCard>
    );
};

export default TypographySettings;
