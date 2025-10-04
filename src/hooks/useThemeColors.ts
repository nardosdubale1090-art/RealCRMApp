// /src/hooks/useThemeColors.ts

import { useState, useEffect } from 'react';
import { useAppearance } from '../context/AppearanceContext';

const getChartColors = (): string[] => {
    if (typeof window === 'undefined') {
        return ['#000000', '#000000', '#000000', '#000000', '#000000'];
    }
    const style = getComputedStyle(document.documentElement);
    return [
        style.getPropertyValue('--color-chart-1').trim(),
        style.getPropertyValue('--color-chart-2').trim(),
        style.getPropertyValue('--color-chart-3').trim(),
        style.getPropertyValue('--color-chart-4').trim(),
        style.getPropertyValue('--color-chart-5').trim(),
    ];
};

export const useThemeColors = () => {
    const { baseTheme, accentColor } = useAppearance();
    const [chartColors, setChartColors] = useState<string[]>(getChartColors);

    useEffect(() => {
        // This effect will run when the theme or accent color changes.
        // We need a small delay for the CSS variables to be applied by the browser.
        const timeoutId = setTimeout(() => {
            setChartColors(getChartColors());
        }, 50);

        return () => clearTimeout(timeoutId);
    }, [baseTheme, accentColor]); // Rerun when base theme or accent color changes

    return chartColors;
};