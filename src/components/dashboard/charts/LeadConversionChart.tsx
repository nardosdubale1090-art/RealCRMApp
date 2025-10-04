// /src/component/dashboard/charts/LeadConversionChart.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { leadConversionData } from '../../../mocks/data';
import { PresentationChartLineIcon } from '../../shared/Icons';
import ChartWrapper from './ChartWrapper';
import { useThemeColors } from '../../../hooks/useThemeColors';

const LeadConversionChart: React.FC = () => {
    const themeColors = useThemeColors();
    return (
        <ChartWrapper title="Lead Conversion Rate" icon={PresentationChartLineIcon}>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={leadConversionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border-hsl))" />
                    <XAxis dataKey="name" stroke="hsl(var(--color-text-secondary-hsl))" tick={{ fontSize: 12 }} />
                    <YAxis stroke="hsl(var(--color-text-secondary-hsl))" tick={{ fontSize: 12 }} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--color-card-hsl))',
                            border: '1px solid hsl(var(--color-border-hsl))'
                        }} 
                        labelStyle={{ color: 'hsl(var(--color-text-primary-hsl))' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }}/>
                    <Line type="monotone" dataKey="Leads" stroke={themeColors[1]} strokeWidth={2} />
                    <Line type="monotone" dataKey="Converted" stroke={themeColors[2]} strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default LeadConversionChart;