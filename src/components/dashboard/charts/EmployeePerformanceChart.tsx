// /src/component/dashboard/charts/EmployeePerformanceChart.tsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { employeePerformanceData } from '../../../mocks/data';
import { UserGroupIcon } from '../../shared/Icons';
import ChartWrapper from './ChartWrapper';
import { useThemeColors } from '../../../hooks/useThemeColors';


const EmployeePerformanceChart: React.FC = () => {
    const themeColors = useThemeColors();
    return (
        <ChartWrapper title="Employee Performance (Deals)" icon={UserGroupIcon}>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={employeePerformanceData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border-hsl))" horizontal={false}/>
                    <XAxis type="number" stroke="hsl(var(--color-text-secondary-hsl))" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--color-text-secondary-hsl))" width={60} tick={{ fontSize: 12 }} />
                    <Tooltip 
                        cursor={{fill: 'hsla(var(--color-border-hsl), 0.3)'}}
                        contentStyle={{ 
                           backgroundColor: 'hsl(var(--color-card-hsl))',
                           border: '1px solid hsl(var(--color-border-hsl))'
                        }} 
                        labelStyle={{ color: 'hsl(var(--color-text-primary-hsl))' }}
                    />
                    <Bar dataKey="deals" fill={themeColors[3]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default EmployeePerformanceChart;