import React, { useState, useEffect } from 'react';
import type { PropertyItem, PropertyItemType } from '../../../types';

interface PropertyFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: 'add' | 'edit';
    itemType?: PropertyItemType;
    item?: PropertyItem;
}

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({ isOpen, onClose, mode, itemType, item }) => {
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        if (mode === 'edit' && item) {
            setFormData(item);
        } else {
            setFormData({});
        }
    }, [isOpen, mode, item]);

    if (!isOpen) return null;

    const title = `${mode === 'edit' ? 'Edit' : 'Add'} ${itemType?.charAt(0).toUpperCase() + itemType!.slice(1)}`;

    const renderFields = () => {
        switch (itemType) {
            case 'site':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Site Name</label>
                            <input type="text" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Location</label>
                            <input type="text" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-text-secondary">Address</label>
                            <input type="text" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </>
                );
            case 'building':
                 return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Parent Site</label>
                            <select className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Sunset Villas</option>
                                <option>Bole Commercial Hub</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Building Name</label>
                            <input type="text" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Number of Floors</label>
                            <input type="number" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </>
                );
            case 'unit':
                return (
                     <>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Parent Building</label>
                             <select className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Tower A (Sunset Villas)</option>
                                <option>Main Complex (Bole Commercial Hub)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-secondary">Unit Name / Number</label>
                            <input type="text" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary">Price ($)</label>
                                <input type="number" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary">Area (m²)</label>
                                <input type="number" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary">Bedrooms</label>
                                <input type="number" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary">Bathrooms</label>
                                <input type="number" className="mt-1 block w-full bg-background border border-border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                         </div>
                    </>
                );
            default:
                return null;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center animate-fade-in" style={{animationDuration: '200ms'}}>
            <div className="bg-card rounded-lg shadow-xl w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-semibold">{title}</h3>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {renderFields()}
                </div>
                <div className="p-4 bg-secondary/50 rounded-b-lg flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-md">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-md">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyFormModal;