// /src/component/properties/FeaturedPropertyCard.tsx

import React, { useState } from 'react';
import type { Unit } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { MapPinIcon, BedIcon, RectangleGroupIcon, HeartIcon } from '../shared/Icons';
import Tooltip from '../shared/Tooltip';

const statusColors: { [key in Unit['status']]: string } = {
    'Available': 'bg-green-500/20 text-green-400',
    'Sold': 'bg-gray-500/20 text-gray-400',
    'Rented': 'bg-yellow-500/20 text-yellow-400',
    'Under Maintenance': 'bg-purple-500/20 text-purple-400',
};

interface FeaturedPropertyCardProps {
  unit: Unit;
}

const FeaturedPropertyCard: React.FC<FeaturedPropertyCardProps> = ({ unit }) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  }

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={unit.imageUrl} alt={unit.name} />
        <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${statusColors[unit.status]}`}>
            {unit.status}
        </div>
        {user?.role === 'Client' && (
           <Tooltip content={isFavorited ? 'Remove from favorites' : 'Add to favorites'} position="top">
                <button 
                    onClick={handleFavorite}
                    className="absolute top-2 left-2 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
                >
                <HeartIcon className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>
           </Tooltip>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary truncate">{unit.name}</h3>
        
        <div className="flex items-center mt-1 text-sm text-text-secondary">
          <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{unit.type} on Floor {unit.floor}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
                {unit.bedrooms > 0 && (
                    <Tooltip content={`${unit.bedrooms} Bedrooms`} position="top">
                        <div className="flex items-center">
                            <BedIcon className="h-5 w-5 mr-1 text-primary"/>
                            <span className="font-semibold">{unit.bedrooms}</span>
                        </div>
                    </Tooltip>
                )}
                 <Tooltip content={`${unit.area} m² Area`} position="top">
                    <div className="flex items-center">
                        <RectangleGroupIcon className="h-5 w-5 mr-1 text-primary"/>
                        <span className="font-semibold">{unit.area} m²</span>
                    </div>
                </Tooltip>
            </div>
        </div>

        <div className="mt-4 border-t border-border pt-3">
            <p className="text-2xl font-bold text-primary">
                ${unit.price.toLocaleString()}
            </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
