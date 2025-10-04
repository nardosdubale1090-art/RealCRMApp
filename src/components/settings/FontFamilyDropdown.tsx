// /src/component/settings/FontFamilyDropDown.tsx

import React, { useState, useRef, useEffect } from 'react';
// Fix: Import FONT_FAMILIES from AppearanceContext and derive FONT_FAMILIES_DATA.
import { FONT_FAMILIES, useAppearance } from '../../context/AppearanceContext';
import { ChevronDownIcon, CheckIcon } from '../shared/Icons';

type FontFamily = ReturnType<typeof useAppearance>['fontFamily'];

// Fix: create FONT_FAMILIES_DATA from the imported FONT_FAMILIES object
const FONT_FAMILIES_DATA = Object.entries(FONT_FAMILIES).map(([key, value]) => ({
    name: key as FontFamily,
    label: value.name,
    css: value.css
}));


interface FontFamilyDropdownProps {
  value: FontFamily;
  onChange: (font: FontFamily) => void;
}

const FontFamilyDropdown: React.FC<FontFamilyDropdownProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedFont = FONT_FAMILIES_DATA.find(f => f.name === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!selectedFont) return null;

    return (
        <div ref={dropdownRef} className="relative w-full max-w-sm">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-secondary border border-border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-primary"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-sm text-text-primary" style={{ fontFamily: selectedFont.css }}>
                    {selectedFont.label}
                </span>
                <ChevronDownIcon className={`h-5 w-5 text-text-secondary transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            <div
                className={`absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg ring-1 ring-border ring-opacity-5 transition-all duration-200 ease-out origin-top
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <ul
                    className="max-h-60 overflow-auto p-1"
                    role="listbox"
                    aria-label="Font Families"
                >
                    {FONT_FAMILIES_DATA.map(font => (
                        <li key={font.name}>
                            <button
                                type="button"
                                onClick={() => { onChange(font.name); setIsOpen(false); }}
                                className={`w-full flex items-center justify-between text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                    value === font.name ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:bg-gray-700/50 hover:text-text-primary'
                                }`}
                                role="option"
                                aria-selected={value === font.name}
                            >
                                <span style={{ fontFamily: font.css }}>
                                    {font.label}
                                </span>
                                {value === font.name && <CheckIcon className="h-5 w-5 text-primary" />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FontFamilyDropdown;