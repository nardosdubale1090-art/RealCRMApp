
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { salesData } from '../../mocks/data';

const SalesChart: React.FC = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg h-96">
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Sales Overview</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1f2937', // bg-card
                            border: '1px solid #374151' // border-border
                        }} 
                        labelStyle={{ color: '#f9fafb' }} // text-primary
                    />
                    <Legend wrapperStyle={{ color: '#9ca3af', paddingTop: '20px' }}/>
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
