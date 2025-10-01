import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppearance } from '../../context/AppearanceContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavLinkItem } from '../../types';
import Tooltip from '../shared/Tooltip';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useAuth();
    const { layout, navLinks, setNavLinks, isSidebarCollapsed } = useAppearance();
    const isMobile = useMediaQuery('(max-width: 767px)');

    const [draggedItem, setDraggedItem] = useState<NavLinkItem | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dropIndicator, setDropIndicator] = useState<{ targetId: string; position: 'top' | 'bottom' } | null>(null);

    const visibleLinks = user 
        ? navLinks.filter(link => link.allowedRoles.includes(user.role))
        : navLinks.filter(link => link.isPublic);

    const handleLinkClick = () => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: NavLinkItem) => {
        setDraggedItem(item);
        setDraggingId(item.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: NavLinkItem) => {
        e.preventDefault();
        if (!draggedItem || draggedItem.id === item.id) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const position = e.clientY < midpoint ? 'top' : 'bottom';
        
        if (!dropIndicator || dropIndicator.targetId !== item.id || dropIndicator.position !== position) {
            setDropIndicator({ targetId: item.id, position });
        }
    };
    
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      if (!draggedItem || !dropIndicator) return;
      
      const fromIndex = navLinks.findIndex(link => link.id === draggedItem.id);
      let toIndex = navLinks.findIndex(link => link.id === dropIndicator.targetId);

      if (fromIndex === -1 || toIndex === -1) return;
      
      if (dropIndicator.position === 'bottom') {
        toIndex++;
      }

      if (fromIndex < toIndex) {
        toIndex--;
      }
      
      if (fromIndex !== toIndex) {
          const reorderedLinks = reorder(navLinks, fromIndex, toIndex);
          setNavLinks(reorderedLinks);
      }
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggingId(null);
        setDropIndicator(null);
    };
    
    if (layout === 'horizontal' && !isMobile) {
        return null;
    }

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            <aside className={`bg-secondary flex-shrink-0 flex flex-col fixed top-20 bottom-0 left-0 z-40 transform transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-14' : 'w-48'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <nav 
                    className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragLeave={() => setDropIndicator(null)}
                >
                    {visibleLinks.map((link) => (
                        <div
                            key={link.id}
                            className="relative"
                            onDragOver={(e) => handleDragOver(e, link)}
                        >
                            {dropIndicator?.targetId === link.id && dropIndicator.position === 'top' && (
                                <div className="mb-1 drag-indicator-vertical" />
                            )}
                            <Tooltip content={link.name} position="right" disabled={!isSidebarCollapsed}>
                                <div
                                    draggable={!isSidebarCollapsed}
                                    onDragStart={(e) => handleDragStart(e, link)}
                                    onDragEnd={handleDragEnd}
                                    className={`cursor-move ${draggingId === link.id ? 'dragging' : ''}`}
                                 >
                                    <NavLink
                                        to={link.href}
                                        end={link.href === '/'}
                                        onClick={handleLinkClick}
                                        draggable={false}
                                        onDragStart={(e) => e.preventDefault()}
                                        className={({ isActive }) =>
                                            `flex items-center pl-[9px] pr-2 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 w-full overflow-hidden ${
                                                isActive
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'text-text-secondary hover:bg-gray-700/50 hover:text-white'
                                            }`
                                        }
                                    >
                                        <link.icon className="h-5 w-5 flex-shrink-0 mr-3" />
                                        <span className={`whitespace-nowrap transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{link.name}</span>
                                    </NavLink>
                                </div>
                            </Tooltip>
                            {dropIndicator?.targetId === link.id && dropIndicator.position === 'bottom' && (
                                <div className="mt-1 drag-indicator-vertical" />
                            )}
                        </div>
                    ))}
                </nav>
                <div className="p-4 border-t border-border flex-shrink-0">
                    <p className={`text-xs text-text-secondary text-center whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        © 2024 RE-CRM Pro.
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;