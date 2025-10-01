import React from 'react';
import { Link } from 'react-router-dom';
import { Site } from '../../../types';
import { MapPinIcon, BuildingOfficeIcon } from '../../shared/Icons';

interface SiteDetailsViewProps {
    site: Site;
}

const SiteDetailsView: React.FC<SiteDetailsViewProps> = ({ site }) => {
    return (
        <div className="bg-card rounded-xl shadow-soft border border-border/50 overflow-hidden">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${site.imageUrl})` }}></div>
            <div className="p-6">
                <h1 className="text-3xl font-bold text-text-primary">{site.name}</h1>
                <div className="flex items-center mt-2 text-text-secondary">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{site.location} - {site.address}</span>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2 mb-4">
                        Buildings in this Site ({site.buildingCount})
                    </h2>
                    {site.buildings && site.buildings.length > 0 ? (
                        <ul className="space-y-3">
                            {site.buildings.map(building => (
                                <li key={building.id} className="p-3 bg-secondary rounded-lg flex justify-between items-center hover:bg-gray-700/50">
                                    <div className="flex items-center">
                                        <BuildingOfficeIcon className="h-5 w-5 mr-3 text-blue-400" />
                                        <div>
                                            <p className="font-semibold text-text-primary">{building.name}</p>
                                            <p className="text-sm text-text-secondary">{building.unitCount} units</p>
                                        </div>
                                    </div>
                                    <Link to={`/properties/building/${building.id}`} className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-hover">
                                        View
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-text-secondary">No buildings have been added to this site yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SiteDetailsView;