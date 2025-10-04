// /src/component/properties/PropertyCard.tsx


import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MapPinIcon, BedIcon, RectangleGroupIcon, HeartIcon } from '../shared/Icons';
import Tooltip from '../shared/Tooltip';

// Fix: Add local Property interface because it was removed from global types and this component was not updated.
interface Property {
  id: string;
  title: string;
  address: string;
  status: 'For Sale' | 'Sold';
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  imageUrl: string;
}

const statusColors: { [key in Property['status']]: string } = {
    'For Sale': 'bg-green-500/20 text-green-400',
    'Sold': 'bg-gray-500/20 text-gray-400',
};

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  }

  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={property.imageUrl} alt={property.title} />
        <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${statusColors[property.status]}`}>
            {property.status}
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
        <h3 className="text-lg font-semibold text-text-primary truncate">{property.title}</h3>
        
        <div className="flex items-center mt-1 text-sm text-text-secondary">
          <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{property.address}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
                {property.bedrooms && (
                    <Tooltip content={`${property.bedrooms} Bedrooms`} position="top">
                        <div className="flex items-center">
                            <BedIcon className="h-5 w-5 mr-1 text-primary"/>
                            <span className="font-semibold">{property.bedrooms}</span>
                        </div>
                    </Tooltip>
                )}
                 {property.bathrooms && (
                     <Tooltip content={`${property.bathrooms} Bathrooms`} position="top">
                        <div className="flex items-center">
                            <span className="font-bold text-primary text-xl mr-1">/</span>
                            <span className="font-semibold">{property.bathrooms} Bath</span>
                        </div>
                    </Tooltip>
                )}
                 <Tooltip content={`${property.area} m² Area`} position="top">
                    <div className="flex items-center">
                        <RectangleGroupIcon className="h-5 w-5 mr-1 text-primary"/>
                        <span className="font-semibold">{property.area} m²</span>
                    </div>
                </Tooltip>
            </div>
        </div>

        <div className="mt-4 border-t border-border pt-3">
            <p className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}
            </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
