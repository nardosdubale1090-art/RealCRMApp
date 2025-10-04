// /src/component/properties/details/UnitDetailsView.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Unit, Building, Site, PropertyStatus } from '../../../types';
import { MapPinIcon, BedIcon, RectangleGroupIcon, PhotoIcon, DocumentTextIcon, BuildingOfficeIcon, FolderIcon } from '../../shared/Icons';

interface UnitDetailsViewProps {
    unit: Unit;
    building: Building;
    site: Site;
}

const statusColors: { [key in PropertyStatus]: string } = {
    'Available': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Sold': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'Rented': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Under Maintenance': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const UnitDetailsView: React.FC<UnitDetailsViewProps> = ({ unit, building, site }) => {
    
    const infoPillClasses = "flex items-center bg-secondary px-3 py-1.5 rounded-full text-sm";
    
    return (
        <div className="bg-card rounded-xl shadow-soft border border-border/50 overflow-hidden">
            <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url(${unit.imageUrl})` }}></div>
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-start">
                    <div>
                         <div className="flex items-center text-sm text-text-secondary mb-2">
                             <Link to={`/properties/site/${site.id}`} className="hover:text-primary hover:underline flex items-center gap-1.5">
                                <FolderIcon className="h-4 w-4" /> {site.name}
                            </Link>
                            <span className="mx-2">/</span>
                             <Link to={`/properties/building/${building.id}`} className="hover:text-primary hover:underline flex items-center gap-1.5">
                                <BuildingOfficeIcon className="h-4 w-4" /> {building.name}
                            </Link>
                        </div>
                        <h1 className="text-4xl font-bold text-text-primary">{unit.name}</h1>
                         <div className="flex items-center mt-2 text-text-secondary">
                            <MapPinIcon className="h-5 w-5 mr-2" />
                            <span>{site.location}</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-left md:text-right">
                        <p className="text-4xl font-bold text-primary">${unit.price.toLocaleString()}</p>
                         <div className={`mt-2 inline-block px-3 py-1 text-sm font-bold rounded-full border ${statusColors[unit.status]}`}>
                            {unit.status}
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-4">
                    <div className={infoPillClasses}>
                        <BedIcon className="h-5 w-5 mr-2 text-primary/80" />
                        <span className="font-semibold text-text-primary">{unit.bedrooms}</span>
                        <span className="ml-1">Bedrooms</span>
                    </div>
                     <div className={infoPillClasses}>
                        <span className="font-bold text-lg text-primary/80 mr-2">/</span>
                        <span className="font-semibold text-text-primary">{unit.bathrooms}</span>
                        <span className="ml-1">Bathrooms</span>
                    </div>
                     <div className={infoPillClasses}>
                        <RectangleGroupIcon className="h-5 w-5 mr-2 text-primary/80" />
                        <span className="font-semibold text-text-primary">{unit.area} m²</span>
                        <span className="ml-1">Area</span>
                    </div>
                     <div className={infoPillClasses}>
                        <span className="font-semibold text-text-primary">Floor {unit.floor}</span>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2 mb-4 flex items-center gap-2">
                           <PhotoIcon className="h-5 w-5" /> Image Gallery
                        </h2>
                        <div className="text-text-secondary">Gallery component will be here.</div>
                    </div>
                     <div>
                        <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2 mb-4 flex items-center gap-2">
                           <DocumentTextIcon className="h-5 w-5" /> Documents & Notes
                        </h2>
                        <div className="text-text-secondary">Documents and notes section will be here.</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UnitDetailsView;