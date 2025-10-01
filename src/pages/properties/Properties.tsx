import React, { useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserRole, PropertyItem, PropertyItemType, Unit } from '../../types';
import PropertyList from '../../components/properties/PropertyList';
import PropertyGridView from '../../components/properties/PropertyGridView';
import PropertyFormModal from '../../components/properties/modals/PropertyFormModal';
import PropertyDeleteModal from '../../components/properties/modals/PropertyDeleteModal';

import { MagnifyingGlassIcon, PlusIcon, ListBulletIcon, Squares2X2Icon } from '../../components/shared/Icons';

type ViewMode = 'list' | 'grid';

interface ModalState {
    type: 'form' | 'delete' | null;
    item?: PropertyItem;
    itemType?: PropertyItemType;
    mode?: 'add' | 'edit';
    parent?: { type: 'site' | 'building'; id: string };
}


const Properties: React.FC = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [modalState, setModalState] = useState<ModalState>({ type: null });

  const canManageProperties = user && user.role !== UserRole.CLIENT;

  const handleOpenFormModal = useCallback((mode: 'add' | 'edit', itemType: PropertyItemType, item?: PropertyItem) => {
    setModalState({ type: 'form', item, itemType, mode });
  }, []);

  const handleOpenDeleteModal = useCallback((item: PropertyItem, itemType: PropertyItemType) => {
    setModalState({ type: 'delete', item, itemType });
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setModalState({ type: null });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-text-primary">Properties</h1>
        
        <div className="flex items-center gap-2">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary/70" />
                </span>
                <input type="text" placeholder="Search by name..." className="w-48 sm:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" />
            </div>
            {canManageProperties && (
                <button onClick={() => handleOpenFormModal('add', 'unit')} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-md">
                    <PlusIcon className="h-5 w-5 mr-2" /> Add Property
                </button>
            )}
             <div className="flex items-center bg-secondary p-1 rounded-lg">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-700/50'}`}
                    aria-label="List View"
                >
                    <ListBulletIcon className="h-5 w-5" />
                </button>
                 <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-700/50'}`}
                    aria-label="Grid View"
                >
                    <Squares2X2Icon className="h-5 w-5" />
                </button>
            </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <PropertyList onEdit={(item, type) => handleOpenFormModal('edit', type, item)} onDelete={handleOpenDeleteModal} />
      ) : (
        <PropertyGridView onEdit={(item, type) => handleOpenFormModal('edit', type, item as Unit)} onDelete={handleOpenDeleteModal}/>
      )}

      {canManageProperties && (
          <>
            <PropertyFormModal
                isOpen={modalState.type === 'form'}
                onClose={handleCloseModal}
                mode={modalState.mode}
                itemType={modalState.itemType}
                item={modalState.item}
            />
            <PropertyDeleteModal
                isOpen={modalState.type === 'delete'}
                onClose={handleCloseModal}
                item={modalState.item}
                itemType={modalState.itemType}
            />
        </>
      )}

    </div>
  );
};

export default Properties;