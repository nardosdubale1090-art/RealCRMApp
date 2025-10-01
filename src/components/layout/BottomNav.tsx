import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppearance } from '../../context/AppearanceContext';
import { NavLinkItem } from '../../types';
import { EllipsisHorizontalIcon } from '../shared/Icons';
import Tooltip from '../shared/Tooltip';

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const BottomNav: React.FC = () => {
    const { user } = useAuth();
    const { navLinks, setNavLinks } = useAppearance();

    const [draggedItem, setDraggedItem] = useState<NavLinkItem | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dropIndicator, setDropIndicator] = useState<{ targetId: string; position: 'left' | 'right' | 'top' | 'bottom' } | null>(null);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);
    
    const allVisibleLinks = user 
        ? navLinks.filter(link => link.allowedRoles.includes(user.role))
        : navLinks.filter(link => link.isPublic);

    const hasMore = allVisibleLinks.length > 5;
    const mainLinks = hasMore ? allVisibleLinks.slice(0, 4) : allVisibleLinks;
    const moreLinks = hasMore ? allVisibleLinks.slice(4) : [];

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: NavLinkItem) => {
        setDraggedItem(item);
        setDraggingId(item.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, item: NavLinkItem) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedItem || draggedItem.id === item.id) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const orientation = e.currentTarget.dataset.orientation;

        let position: 'left' | 'right' | 'top' | 'bottom';
        if (orientation === 'horizontal') {
            const midpoint = rect.left + rect.width / 2;
            position = e.clientX < midpoint ? 'left' : 'right';
        } else { // vertical
            const midpoint = rect.top + rect.height / 2;
            position = e.clientY < midpoint ? 'top' : 'bottom';
        }
        
        if (!dropIndicator || dropIndicator.targetId !== item.id || dropIndicator.position !== position) {
            setDropIndicator({ targetId: item.id, position });
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedItem || !dropIndicator) {
            handleDragEnd();
            return;
        }
        
        const fromIndex = navLinks.findIndex(link => link.id === draggedItem.id);
        let toIndex = navLinks.findIndex(link => link.id === dropIndicator.targetId);

        if (fromIndex === -1 || toIndex === -1) {
            handleDragEnd();
            return;
        }
        
        if (dropIndicator.position === 'right' || dropIndicator.position === 'bottom') {
            toIndex++;
        }

        if (fromIndex < toIndex) {
            toIndex--;
        }
        
        if (fromIndex !== toIndex) {
            const reorderedLinks = reorder(navLinks, fromIndex, toIndex);
            setNavLinks(reorderedLinks);
        }
        handleDragEnd();
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggingId(null);
        setDropIndicator(null);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-secondary border-t border-border z-20">
            <nav 
                className="flex items-center justify-around h-full"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={() => setDropIndicator(null)}
            >
                {mainLinks.map(link => (
                    <div
                        key={`bottom-${link.id}`}
                        className="flex-1 h-full flex items-center justify-center relative"
                        onDragOver={(e) => handleDragOver(e, link)}
                        data-orientation="horizontal"
                    >
                        {dropIndicator?.targetId === link.id && dropIndicator.position === 'left' && (
                            <div className="h-10 drag-indicator-horizontal" />
                        )}
                        <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, link)}
                            onDragEnd={handleDragEnd}
                            className={`w-full h-full cursor-move ${draggingId === link.id ? 'dragging' : ''}`}
                        >
                            <NavLink
                                to={link.href}
                                end={link.href === '/'}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                className={({ isActive }) => 
                                    `flex flex-col items-center justify-center w-full h-full transition-colors ${
                                        isActive ? 'text-primary' : 'text-text-secondary'
                                    }`
                                }
                            >
                                <link.icon className="h-6 w-6 mb-1" />
                                <span className="text-xs font-medium">{link.name.split(' ')[0]}</span>
                            </NavLink>
                        </div>
                        {dropIndicator?.targetId === link.id && dropIndicator.position === 'right' && (
                            <div className="h-10 drag-indicator-horizontal" />
                        )}
                    </div>
                ))}
                {hasMore && (
                     <div ref={moreMenuRef} className="flex-1 h-full flex items-center justify-center relative">
                        {isMoreMenuOpen && (
                            <div className="absolute bottom-full right-0 mb-2 w-56 bg-card rounded-md shadow-lg ring-1 ring-border focus:outline-none transition-all duration-200 ease-out z-20 origin-bottom-right">
                                <div className="py-1" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDropIndicator(null)}>
                                    {moreLinks.map(link => (
                                        <div 
                                            key={`more-mobile-${link.id}`}
                                            className="relative px-2 py-1"
                                            onDragOver={(e) => handleDragOver(e, link)}
                                            data-orientation="vertical"
                                        >
                                            {dropIndicator?.targetId === link.id && dropIndicator.position === 'top' && (
                                                <div className="mb-1 drag-indicator-vertical" />
                                            )}
                                            <div
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, link)}
                                                onDragEnd={handleDragEnd}
                                                className={`w-full cursor-move rounded-md transition-colors duration-200 group ${draggingId === link.id ? 'dragging' : ''}`}
                                            >
                                                <NavLink
                                                    to={link.href}
                                                    end={link.href === '/'}
                                                    onClick={() => setIsMoreMenuOpen(false)}
                                                    draggable={false}
                                                    onDragStart={(e) => e.preventDefault()}
                                                    className={({ isActive }) => `flex items-center w-full px-4 py-2 text-sm rounded-md ${ isActive ? 'text-primary bg-gray-700/50' : 'text-text-secondary'} group-hover:bg-gray-700/50 group-hover:text-text-primary`}
                                                >
                                                    <link.icon className="h-5 w-5 mr-3" />
                                                    {link.name}
                                                </NavLink>
                                            </div>
                                            {dropIndicator?.targetId === link.id && dropIndicator.position === 'bottom' && (
                                                <div className="mt-1 drag-indicator-vertical" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                         <button onClick={() => setIsMoreMenuOpen(o => !o)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isMoreMenuOpen ? 'text-primary' : 'text-text-secondary'}`}>
                            <EllipsisHorizontalIcon className="h-6 w-6 mb-1" />
                            <span className="text-xs font-medium">More</span>
                        </button>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default BottomNav;