// /src/component/dashboard/charts/DealPipelineChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dealPipelineData } from '../../../mocks/data';
import { FunnelIcon } from '../../shared/Icons';
import ChartWrapper from './ChartWrapper';
import { useThemeColors } from '../../../hooks/useThemeColors';

const DealPipelineChart: React.FC = () => {
    const themeColors = useThemeColors();
    return (
        <ChartWrapper title="Deal Pipeline Funnel" icon={FunnelIcon}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dealPipelineData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border-hsl))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--color-text-secondary-hsl))" />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--color-text-secondary-hsl))" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip 
                        cursor={{fill: 'hsla(var(--color-border-hsl), 0.3)'}}
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--color-card-hsl))',
                            border: '1px solid hsl(var(--color-border-hsl))'
                        }} 
                        labelStyle={{ color: 'hsl(var(--color-text-primary-hsl))' }}
                    />
                    <Bar dataKey="value" fill={themeColors[0]} background={{ fill: 'hsl(var(--color-background-hsl))' }} />
                </BarChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default DealPipelineChart;