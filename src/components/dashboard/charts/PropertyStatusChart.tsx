import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { propertyStatusData } from '../../../mocks/data';
import { ChartPieIcon } from '../../shared/Icons';
import ChartWrapper from './ChartWrapper';
import { useThemeColors } from '../../../hooks/useThemeColors';


const PropertyStatusChart: React.FC = () => {
    const themeColors = useThemeColors();
    const COLORS = [themeColors[2], themeColors[4], themeColors[0]];
    return (
        <ChartWrapper title="Property Status Distribution" icon={ChartPieIcon}>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={propertyStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {propertyStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--color-card-hsl))',
                            border: '1px solid hsl(var(--color-border-hsl))'
                        }} 
                        labelStyle={{ color: 'hsl(var(--color-text-primary-hsl))' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }}/>
                </PieChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default PropertyStatusChart;