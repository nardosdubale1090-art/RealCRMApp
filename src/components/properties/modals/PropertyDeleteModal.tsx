// /src/component/properties/modals/PropertyDeleteModal.tsx

import React from 'react';
import type { PropertyItem, PropertyItemType } from '../../../types';
import { ExclamationTriangleIcon } from '../../shared/Icons';

interface PropertyDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: PropertyItem;
    itemType?: PropertyItemType;
}

const PropertyDeleteModal: React.FC<PropertyDeleteModalProps> = ({ isOpen, onClose, item, itemType }) => {
    if (!isOpen || !item || !itemType) return null;

    const getWarningMessage = () => {
        switch (itemType) {
            case 'site':
                return 'This will permanently delete the site and all of its associated buildings and units.';
            case 'building':
                return 'This will permanently delete the building and all of its associated units.';
            case 'unit':
                return 'This action cannot be undone.';
            default:
                return '';
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center animate-fade-in" style={{animationDuration: '200ms'}}>
            <div className="bg-card rounded-lg shadow-xl w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex items-center">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-text-primary">
                                Delete {itemType}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-text-secondary">
                                    Are you sure you want to delete <span className="font-semibold text-text-primary">{item.name}</span>? {getWarningMessage()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-b-lg flex justify-end gap-3">
                    <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-md">
                        Cancel
                    </button>
                    <button onClick={onClose} type="button" className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDeleteModal;