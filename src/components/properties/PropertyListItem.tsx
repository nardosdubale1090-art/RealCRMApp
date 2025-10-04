// /src/component/properties/PropertyListItem.tsx

import React from 'react';
import type { PropertyItem, PropertyItemType } from '../../types';
import { 
    FolderIcon, 
    BuildingOfficeIcon, 
    HomeModernIcon, 
    ChevronRightIcon, 
    PencilIcon, 
    TrashIcon 
} from '../shared/Icons';

interface PropertyListItemProps {
    item: PropertyItem;
    type: PropertyItemType;
    level: number;
    isExpanded: boolean;
    isLoadingChildren: boolean;
    onToggleExpand: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const statusColors: { [key: string]: string } = {
    'Available': 'text-green-400',
    'Sold': 'text-gray-400',
    'Rented': 'text-yellow-400',
    'Under Maintenance': 'text-purple-400',
};

const PropertyListItem: React.FC<PropertyListItemProps> = ({ item, type, level, isExpanded, isLoadingChildren, onToggleExpand, onEdit, onDelete }) => {
    
    const isExpandable = type !== 'unit';

    const getIcon = () => {
        switch (type) {
            case 'site': return <FolderIcon className="h-5 w-5 text-yellow-400" />;
            case 'building': return <BuildingOfficeIcon className="h-5 w-5 text-blue-400" />;
            case 'unit': return <HomeModernIcon className="h-5 w-5 text-teal-400" />;
            default: return null;
        }
    };

    const getInfo = () => {
        if ('location' in item) return `${item.buildingCount} buildings`;
        if ('floors' in item) return `${item.unitCount} units`;
        if ('status' in item) {
             return (
                <span className={`flex items-center text-sm font-medium ${statusColors[item.status]}`}>
                    <span className={`h-2 w-2 mr-2 rounded-full ${statusColors[item.status].replace('text', 'bg')}`}></span>
                    {item.status}
                </span>
            )
        }
        return '-';
    };
    
    const getPrice = () => {
        if ('price' in item) {
            return `$${item.price.toLocaleString()}`;
        }
        return '-';
    }

    return (
        <tr className="group hover:bg-gray-700/20 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center" style={{ paddingLeft: `${level * 2}rem` }}>
                    {isExpandable ? (
                        <button onClick={onToggleExpand} className="p-1 -ml-6 mr-1 text-text-secondary hover:text-text-primary">
                             <ChevronRightIcon className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                    ) : (
                        <div className="w-6"></div>
                    )}
                    {getIcon()}
                    <span className="ml-3 font-medium text-text-primary">{item.name}</span>
                     {isLoadingChildren && <div className="ml-2 w-4 h-4 border-2 border-t-primary border-transparent rounded-full animate-spin"></div>}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-text-secondary capitalize">{type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-text-secondary">{getInfo()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-text-primary font-semibold">{getPrice()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={onEdit} className="p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-primary/10">
                        <PencilIcon className="h-4 w-4" />
                    </button>
                     <button onClick={onDelete} className="p-2 text-text-secondary hover:text-red-500 rounded-lg hover:bg-red-500/10">
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default PropertyListItem;