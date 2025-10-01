import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSiteDetails, getBuildingDetails, getUnitDetails } from '../../api/properties.api';
import { Site, Building, Unit, PropertyItemType } from '../../types';
import { ArrowLeftIcon } from '../../components/shared/Icons';

import SiteDetailsView from '../../components/properties/details/SiteDetailsView';
import BuildingDetailsView from '../../components/properties/details/BuildingDetailsView';
import UnitDetailsView from '../../components/properties/details/UnitDetailsView';

type DetailsData = 
    | { type: 'site'; data: Site }
    | { type: 'building'; data: { building: Building; site: Site } }
    | { type: 'unit'; data: { unit: Unit; building: Building; site: Site } };

const PropertyDetails: React.FC = () => {
    const { type, id } = useParams<{ type: PropertyItemType, id: string }>();
    const navigate = useNavigate();
    
    const [details, setDetails] = useState<DetailsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!type || !id) {
                setError('Invalid property identifier.');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                let data;
                switch (type) {
                    case 'site':
                        data = await getSiteDetails(id);
                        if(data) setDetails({ type: 'site', data });
                        break;
                    case 'building':
                        data = await getBuildingDetails(id);
                        if(data) setDetails({ type: 'building', data });
                        break;
                    case 'unit':
                        data = await getUnitDetails(id);
                        if(data) setDetails({ type: 'unit', data });
                        break;
                    default:
                        throw new Error("Invalid property type");
                }
                if (!data) {
                    throw new Error("Property not found.");
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [type, id]);
    
    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10">Loading details...</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-red-400">{error}</div>;
        }
        if (!details) {
            return null;
        }

        switch (details.type) {
            case 'site':
                return <SiteDetailsView site={details.data} />;
            case 'building':
                return <BuildingDetailsView building={details.data.building} site={details.data.site} />;
            case 'unit':
                return <UnitDetailsView unit={details.data.unit} building={details.data.building} site={details.data.site} />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <button 
                onClick={() => navigate('/properties')} 
                className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Properties
            </button>

            {renderContent()}
        </div>
    );
};

export default PropertyDetails;