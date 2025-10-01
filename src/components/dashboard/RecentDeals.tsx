import React from 'react';
import { mockDeals } from '../../mocks/data';
import type { Deal } from '../../types';

const statusColors: { [key in Deal['status']]: string } = {
    'In Progress': 'bg-yellow-500',
    'Completed': 'bg-green-500',
    'Cancelled': 'bg-red-500',
};

const RecentDeals: React.FC = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-text-primary">Recent Deals</h3>
            <ul className="space-y-4">
                {mockDeals.slice(0, 5).map(deal => (
                    <li key={deal.id} className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-primary">{deal.title}</p>
                            <p className="text-sm text-text-secondary">{deal.clientName} - ${deal.value.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColors[deal.status]}`}>
                            {deal.status}
                           </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentDeals;