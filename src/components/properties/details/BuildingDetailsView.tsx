import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Site } from '../../../types';
import { MapPinIcon, HomeModernIcon, ArrowUpRightIcon } from '../../shared/Icons';
import UnitCard from '../UnitCard';

interface BuildingDetailsViewProps {
    building: Building;
    site: Site;
}

const BuildingDetailsView: React.FC<BuildingDetailsViewProps> = ({ building, site }) => {
    return (
        <div className="bg-card rounded-xl shadow-soft border border-border/50 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <Link to={`/properties/site/${site.id}`} className="text-sm text-primary hover:underline">
                            {site.name}
                        </Link>
                        <h1 className="text-3xl font-bold text-text-primary mt-1">{building.name}</h1>
                        <div className="flex items-center mt-2 text-text-secondary">
                            <MapPinIcon className="h-5 w-5 mr-2" />
                            <span>{site.location}</span>
                        </div>
                    </div>
                     <div className="text-right">
                        <p className="text-text-secondary text-sm">Floors</p>
                        <p className="text-2xl font-bold">{building.floors}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-text-primary border-b border-border pb-2 mb-4">
                        Units in this Building ({building.unitCount})
                    </h2>
                    {building.units && building.units.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {building.units.map(unit => (
                               <Link to={`/properties/unit/${unit.id}`} key={unit.id} className="block p-4 bg-secondary rounded-lg hover:bg-gray-700/50 transition-colors group">
                                    <div className="flex justify-between items-center">
                                       <div className="flex items-center">
                                            <HomeModernIcon className="h-5 w-5 mr-3 text-teal-400" />
                                            <div>
                                                <p className="font-semibold text-text-primary">{unit.name}</p>
                                                <p className="text-sm text-text-secondary">${unit.price.toLocaleString()}</p>
                                            </div>
                                       </div>
                                        <ArrowUpRightIcon className="h-5 w-5 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                   </div>
                                </Link>
                           ))}
                        </div>
                    ) : (
                        <p className="text-text-secondary">No units have been added to this building yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuildingDetailsView;