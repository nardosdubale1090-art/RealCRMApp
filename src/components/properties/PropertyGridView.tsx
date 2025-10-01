import React, { useState, useEffect } from 'react';
import { getAllUnitsWithParentInfo } from '../../api/properties.api';
import { Unit, PropertyItemType } from '../../types';
import UnitCard from './UnitCard';
import { UnitCardSkeleton } from './shared/SkeletonLoaders';
import { HomeModernIcon } from '../shared/Icons';

interface PropertyGridViewProps {
    onEdit: (item: Unit, type: PropertyItemType) => void;
    onDelete: (item: Unit, type: PropertyItemType) => void;
}

const PropertyGridView: React.FC<PropertyGridViewProps> = ({ onEdit, onDelete }) => {
    const [units, setUnits] = useState<Unit[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUnits = async () => {
            try {
                setIsLoading(true);
                const fetchedUnits = await getAllUnitsWithParentInfo();
                setUnits(fetchedUnits);
            } catch (err) {
                setError('Failed to fetch units.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUnits();
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <UnitCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-center p-8 text-red-400">{error}</div>;
    }

    if (units.length === 0) {
        return (
            <div className="text-center py-16 bg-card rounded-xl shadow-soft border border-border/50">
                <HomeModernIcon className="h-16 w-16 mx-auto text-text-secondary/50" />
                <h3 className="mt-4 text-lg font-semibold text-text-primary">No Units Found</h3>
                <p className="mt-1 text-sm text-text-secondary">There are currently no units available to display.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {units.map(unit => (
                <UnitCard 
                    key={unit.id} 
                    unit={unit} 
                    onEdit={() => onEdit(unit, 'unit')}
                    onDelete={() => onDelete(unit, 'unit')}
                />
            ))}
        </div>
    );
};

export default PropertyGridView;