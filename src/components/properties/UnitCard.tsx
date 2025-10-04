// /src/component/properties/UnitCard.tsx


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Unit } from '../../types';
import { useAuth } from '../../hooks/useAuth';
// Fix: Replaced non-existent EllipsisVerticalIcon with EllipsisHorizontalIcon.
import { MapPinIcon, BedIcon, RectangleGroupIcon, HeartIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon, ArrowUpRightIcon } from '../shared/Icons';
import Tooltip from '../shared/Tooltip';

const statusColors: { [key in Unit['status']]: string } = {
    'Available': 'bg-green-500/20 text-green-400',
    'Sold': 'bg-gray-500/20 text-gray-400',
    'Rented': 'bg-yellow-500/20 text-yellow-400',
    'Under Maintenance': 'bg-purple-500/20 text-purple-400',
};

interface UnitCardProps {
  unit: Unit;
  onEdit: () => void;
  onDelete: () => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const canManage = user && user.role !== 'Client';

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorited(!isFavorited);
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsMenuOpen(prev => !prev);
  }

  return (
    <Link to={`/properties/unit/${unit.id}`} className="block bg-card rounded-xl shadow-soft overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group border border-transparent hover:border-primary/30">
        <div className="relative">
            <img className="h-48 w-full object-cover" src={unit.imageUrl} alt={unit.name} />
            <div className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${statusColors[unit.status]}`}>
                {unit.status}
            </div>
            
            <div className="absolute top-2 left-2 flex items-center gap-2">
                {user?.role === 'Client' && (
                    <Tooltip content={isFavorited ? 'Remove from favorites' : 'Add to favorites'} position="top">
                        <button onClick={handleFavorite} className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
                            <HeartIcon className={`h-5 w-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-white'}`} />
                        </button>
                    </Tooltip>
                )}
            </div>

            {canManage && (
                <div className="absolute top-2 right-2">
                    <Tooltip content="Actions" position="top">
                        <button onClick={handleMenuToggle} className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
                           <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                    </Tooltip>
                     {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-1 w-32 bg-card rounded-md shadow-lg ring-1 ring-border z-10" onClick={e => e.preventDefault()}>
                            <button onClick={(e) => { e.stopPropagation(); onEdit(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-gray-700/50 hover:text-text-primary">
                                <PencilIcon className="h-4 w-4 mr-2" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(); setIsMenuOpen(false); }} className="w-full text-left flex items-center px-3 py-2 text-sm text-text-secondary hover:bg-gray-700/50 hover:text-red-500">
                                <TrashIcon className="h-4 w-4 mr-2" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
            
        </div>

        <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold text-primary">
                    ${unit.price.toLocaleString()}
                </p>
                <h3 className="text-lg font-semibold text-text-primary truncate mt-1">{unit.name}</h3>
              </div>
               <Tooltip content="View Details" position="top">
                  <div className="p-2 text-text-secondary group-hover:text-primary group-hover:bg-primary/10 rounded-full transition-colors">
                      <ArrowUpRightIcon className="h-5 w-5"/>
                  </div>
              </Tooltip>
            </div>
            
            <div className="flex items-center mt-1 text-sm text-text-secondary">
              <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">{unit.parentInfo?.location || 'Location not available'}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    {unit.bedrooms > 0 && (
                        <Tooltip content={`${unit.bedrooms} Bedrooms`} position="top">
                            <div className="flex items-center">
                                <BedIcon className="h-5 w-5 mr-1 text-primary/80"/>
                                <span className="font-semibold text-text-primary">{unit.bedrooms}</span>
                            </div>
                        </Tooltip>
                    )}
                     <Tooltip content={`${unit.area} m² Area`} position="top">
                        <div className="flex items-center">
                            <RectangleGroupIcon className="h-5 w-5 mr-1 text-primary/80"/>
                            <span className="font-semibold text-text-primary">{unit.area} m²</span>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default UnitCard;