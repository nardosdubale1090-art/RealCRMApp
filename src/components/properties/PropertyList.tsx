// /src/component/properties/PropertyList.tsx


import React, { useState, useEffect, useCallback } from 'react';
import { getSites, getBuildings, getUnits } from '../../api/properties.api';
import type { Site, Building, Unit, PropertyItem, PropertyItemType } from '../../types';
import PropertyListItem from './PropertyListItem';
import { FolderIcon } from '../shared/Icons';

interface PropertyListProps {
    onEdit: (item: PropertyItem, type: PropertyItemType) => void;
    onDelete: (item: PropertyItem, type: PropertyItemType) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ onEdit, onDelete }) => {
    const [sites, setSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [children, setChildren] = useState<Map<string, PropertyItem[]>>(new Map());
    const [loadingChildren, setLoadingChildren] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchSites = async () => {
            try {
                setIsLoading(true);
                const fetchedSites = await getSites();
                setSites(fetchedSites);
            } catch (err) {
                setError('Failed to fetch properties.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSites();
    }, []);

    const toggleExpand = useCallback(async (item: PropertyItem, type: 'site' | 'building') => {
        const isExpanded = expandedItems.has(item.id);

        if (isExpanded) {
            setExpandedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(item.id);
                return newSet;
            });
        } else {
            setExpandedItems(prev => new Set(prev).add(item.id));
            if (!children.has(item.id)) {
                try {
                    setLoadingChildren(prev => new Set(prev).add(item.id));
                    let fetchedChildren: PropertyItem[] = [];
                    if (type === 'site') {
                        fetchedChildren = await getBuildings(item.id);
                    } else if (type === 'building') {
                        fetchedChildren = await getUnits(item.id);
                    }
                    setChildren(prev => new Map(prev).set(item.id, fetchedChildren));
                } catch (e) {
                    console.error("Failed to load children", e);
                    // Optionally remove from expanded on error
                    setExpandedItems(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(item.id);
                        return newSet;
                    });
                } finally {
                     setLoadingChildren(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(item.id);
                        return newSet;
                    });
                }
            }
        }
    }, [expandedItems, children]);

    // Fix: Changed return type from JSX.Element[] to React.ReactElement[] to resolve namespace error.
    const renderRows = (items: PropertyItem[], level: number): React.ReactElement[] => {
        return items.flatMap(item => {
            const isExpanded = expandedItems.has(item.id);
            const itemChildren = children.get(item.id);
            
            let type: PropertyItemType;
            if ('location' in item) type = 'site';
            else if ('floors' in item) type = 'building';
            else type = 'unit';

            // Fix: Changed type from JSX.Element[] to React.ReactElement[] to resolve namespace error.
            const rows: React.ReactElement[] = [<PropertyListItem 
                key={item.id} 
                item={item}
                type={type}
                level={level} 
                isExpanded={isExpanded}
                isLoadingChildren={loadingChildren.has(item.id)}
                onToggleExpand={() => toggleExpand(item, type as 'site' | 'building')}
                onEdit={() => onEdit(item, type)}
                onDelete={() => onDelete(item, type)}
            />];

            if (isExpanded && itemChildren) {
                rows.push(...renderRows(itemChildren, level + 1));
            }

            return rows;
        });
    };

    if (isLoading) {
        return <div className="text-center p-8 text-text-secondary">Loading properties...</div>;
    }
    
    if (error) {
        return <div className="text-center p-8 text-red-400">{error}</div>;
    }

    if (sites.length === 0) {
        return (
             <div className="text-center py-16 bg-card rounded-xl shadow-soft border border-border/50">
                <FolderIcon className="h-16 w-16 mx-auto text-text-secondary/50" />
                <h3 className="mt-4 text-lg font-semibold text-text-primary">No Properties Found</h3>
                <p className="mt-1 text-sm text-text-secondary">Get started by adding a new site.</p>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                    + Add Site
                </button>
            </div>
        );
    }
    

    return (
        <div className="bg-card rounded-xl shadow-soft overflow-hidden border border-border/50">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border text-sm">
                    <thead className="bg-secondary/50">
                        <tr>
                            <th scope="col" className="w-1/2 px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Info / Status</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Price</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {renderRows(sites, 0)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyList;