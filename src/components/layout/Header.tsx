// /src/component/layout/Header.tsx

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Bars3Icon, Cog6ToothIcon, BuildingStorefrontIcon, EllipsisHorizontalIcon, SidebarCollapseIcon, SidebarExpandIcon, XMarkIcon } from '../shared/Icons';
import { useAuth } from '../../hooks/useAuth';
import { useAppearance } from '../../context/AppearanceContext';
import { useNotifications } from '../../context/NotificationContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavLinkItem } from '../../types';
import NotificationDropdown from './NotificationDropdown';
import Tooltip from '../shared/Tooltip';

interface HeaderProps {
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { layout, mobileLayout, navLinks, setNavLinks, isSidebarCollapsed, setIsSidebarCollapsed } = useAppearance();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [draggedItem, setDraggedItem] = useState<NavLinkItem | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dropIndicator, setDropIndicator] = useState<{ targetId: string; position: 'left' | 'right' | 'top' | 'bottom' } | null>(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const moreDropdownRef = useRef<HTMLDivElement>(null);
    
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    const location = useLocation();
    const [visibleNavLinks, setVisibleNavLinks] = useState<NavLinkItem[]>([]);
    const [overflowNavLinks, setOverflowNavLinks] = useState<NavLinkItem[]>([]);
    const [isNavCalculated, setIsNavCalculated] = useState(false);
    const navContainerRef = useRef<HTMLElement>(null);
    const measurementContainerRef = useRef<HTMLUListElement>(null);
    const moreButtonMeasurementRef = useRef<HTMLLIElement>(null);

    const userVisibleLinks = useMemo(() => user 
        ? navLinks.filter(link => link.allowedRoles.includes(user.role))
        : navLinks.filter(link => link.isPublic), [user, navLinks]);
        
    const showHamburger = isMobile && mobileLayout === 'sidebar';

    useEffect(() => {
        const shouldLockScroll = isMobile && (isMobileSearchOpen || isNotificationsOpen);
        if (shouldLockScroll) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile, isMobileSearchOpen, isNotificationsOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsUserDropdownOpen(false);
            }

            const portalRoot = document.getElementById('portal-root');
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node) &&
                (!portalRoot || !portalRoot.contains(event.target as Node))
            ) {
                 setIsNotificationsOpen(false);
            }
            
            if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
                setIsMoreDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (overflowNavLinks.length === 0) {
            setIsMoreDropdownOpen(false);
        }
    }, [overflowNavLinks]);

    useLayoutEffect(() => {
        if (layout !== 'horizontal' || isMobile) {
            setVisibleNavLinks(userVisibleLinks);
            setOverflowNavLinks([]);
            setIsNavCalculated(true);
            return;
        }

        const calculateLinks = () => {
            const container = navContainerRef.current;
            const measurementContainer = measurementContainerRef.current;
            if (!container || !measurementContainer || !moreButtonMeasurementRef.current) return;

            const navItemsToMeasure = Array.from(measurementContainer.children).slice(0, -1) as HTMLLIElement[];
            
            if (navItemsToMeasure.length === 0 || container.offsetWidth === 0) {
                setVisibleNavLinks(userVisibleLinks);
                setOverflowNavLinks([]);
                setIsNavCalculated(true);
                return;
            };

            const containerWidth = container.offsetWidth;
            const moreButtonWidth = moreButtonMeasurementRef.current.offsetWidth;
            const itemWidths = navItemsToMeasure.map(el => el.offsetWidth);
            
            const gap = 4;
            let totalWidth = itemWidths.reduce((sum, width) => sum + width + gap, -gap);

            if (totalWidth <= containerWidth) {
                setVisibleNavLinks(userVisibleLinks);
                setOverflowNavLinks([]);
            } else {
                const availableWidth = containerWidth - (moreButtonWidth + gap);
                let currentWidth = 0;
                let visibleCount = 0;
                
                for (let i = 0; i < itemWidths.length; i++) {
                    const itemWidth = itemWidths[i];
                    const widthWithGap = i > 0 ? itemWidth + gap : itemWidth;
                    if (currentWidth + widthWithGap <= availableWidth) {
                        currentWidth += widthWithGap;
                        visibleCount++;
                    } else {
                        break;
                    }
                }
                
                const overflowCount = userVisibleLinks.length - visibleCount;
                if (overflowCount === 1 && visibleCount > 0) {
                    visibleCount--;
                }
                
                setVisibleNavLinks(userVisibleLinks.slice(0, visibleCount));
                setOverflowNavLinks(userVisibleLinks.slice(visibleCount));
            }
            setIsNavCalculated(true);
        };

        setIsNavCalculated(false);
        
        const timerId = setTimeout(calculateLinks, 0);

        const resizeObserver = new ResizeObserver(calculateLinks);
        
        const containerToObserve = navContainerRef.current;
        if (containerToObserve) {
            resizeObserver.observe(containerToObserve);
        }

        return () => {
            clearTimeout(timerId);
            if (containerToObserve) {
                resizeObserver.unobserve(containerToObserve);
            }
        };

    }, [userVisibleLinks, layout, isMobile]);

    const isMoreMenuActive = useMemo(() => {
      return overflowNavLinks.some(link => {
          const isEnd = link.href === '/';
          return isEnd ? location.pathname === link.href : location.pathname.startsWith(link.href);
      });
    }, [overflowNavLinks, location.pathname]);

    const handleDragStart = (e: React.DragEvent<HTMLElement>, item: NavLinkItem) => {
        setDraggedItem(item);
        setDraggingId(item.id);
        e.dataTransfer.effectAllowed = 'move';
    };
    
    const handleDragEnd = () => {
        setDraggedItem(null);
        setDraggingId(null);
        setDropIndicator(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>, item: NavLinkItem) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggedItem || draggedItem.id === item.id) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const orientation = e.currentTarget.dataset.orientation;

        let position: 'left' | 'right' | 'top' | 'bottom';
        if (orientation === 'horizontal') {
            const midpoint = rect.left + rect.width / 2;
            position = e.clientX < midpoint ? 'left' : 'right';
        } else {
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
        if (!draggedItem || !dropIndicator) return;
        
        const fromIndex = navLinks.findIndex(link => link.id === draggedItem.id);
        let toIndex = navLinks.findIndex(link => link.id === dropIndicator.targetId);

        if (fromIndex === -1 || toIndex === -1) return;
        
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
    
    return (
        <header className={`bg-secondary/80 backdrop-blur-sm sticky top-0 h-20 flex items-center justify-between border-b border-border flex-shrink-0 z-30 transition-all duration-300 ${
            layout === 'vertical' && !isMobile ? 'pr-4 sm:pr-6 pl-4 sm:pl-2' : 'px-4 sm:px-6'
        }`}>
            {/* SEARCH OVERLAY FOR MOBILE */}
            {isMobile && isMobileSearchOpen && (
                <div className="absolute inset-0 bg-secondary h-full flex items-center px-4 z-50 animate-fade-in" style={{ animationDuration: '200ms' }}>
                    <div className="relative w-full">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary/70" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                        />
                    </div>
                    <button onClick={() => setIsMobileSearchOpen(false)} className="ml-2 p-2 text-text-secondary flex-shrink-0" aria-label="Close search">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
            )}
            
            <div className={`w-full flex items-center justify-between transition-opacity ${isMobile && isMobileSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex items-center min-w-0">
                    {/* Sidebar Toggle for Desktop Vertical Layout */}
                    {layout === 'vertical' && !isMobile && user && (
                        <Tooltip content={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} position="right">
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="mr-4 p-2 rounded-lg text-text-secondary hover:bg-gray-700/50 hover:text-white"
                                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            >
                                {isSidebarCollapsed ? <SidebarExpandIcon className="h-6 w-6" /> : <SidebarCollapseIcon className="h-6 w-6" />}
                            </button>
                        </Tooltip>
                    )}

                    {/* Mobile Hamburger */}
                    {showHamburger && user && (
                        <button onClick={() => setIsSidebarOpen(true)} className="mr-3 p-1 text-text-secondary hover:text-text-primary" aria-label="Open sidebar">
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    )}
                    
                    <Link to="/" className="flex items-center shrink min-w-0 pr-4">
                        <BuildingStorefrontIcon className="h-8 w-8 text-primary flex-shrink-0"/>
                        <h1 className={`font-bold ml-2 whitespace-nowrap overflow-hidden text-ellipsis ${isMobile ? 'text-xl' : 'text-2xl'}`}>RE-CRM Pro</h1>
                    </Link>
                </div>
                
                {(layout === 'horizontal' && !isMobile) && (
                    <nav 
                        ref={navContainerRef}
                        className={`flex-1 flex justify-center min-w-0 transition-opacity duration-200 px-6 ${isNavCalculated ? 'opacity-100' : 'opacity-0'}`}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onDragLeave={() => setDropIndicator(null)}
                    >
                        <div className="flex items-center">
                            <div className="flex items-center space-x-1">
                                {visibleNavLinks.map(link => (
                                    <div 
                                        key={link.id} 
                                        className="flex items-center relative"
                                        onDragOver={(e) => handleDragOver(e, link)}
                                        data-orientation="horizontal"
                                    >
                                        {dropIndicator?.targetId === link.id && dropIndicator.position === 'left' && (
                                            <div className="h-6 drag-indicator-horizontal" />
                                        )}
                                        <div
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, link)}
                                            onDragEnd={handleDragEnd}
                                            className={`nav-item cursor-move ${draggingId === link.id ? 'dragging' : ''}`}
                                        >
                                            <NavLink
                                                to={link.href}
                                                end={link.href === '/'}
                                                draggable={false}
                                                onDragStart={(e) => e.preventDefault()}
                                                className={({ isActive }) => `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${ isActive ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-gray-700/50 hover:text-white'}`}
                                            >
                                                <link.icon className="h-5 w-5 mr-2" />
                                                {link.name}
                                            </NavLink>
                                        </div>
                                        {dropIndicator?.targetId === link.id && dropIndicator.position === 'right' && (
                                            <div className="h-6 drag-indicator-horizontal" />
                                        )}
                                    </div>
                                ))}
                                {overflowNavLinks.length > 0 && (
                                    <div className="relative" ref={moreDropdownRef}>
                                        <button
                                            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                isMoreMenuActive || isMoreDropdownOpen
                                                ? 'bg-primary text-white shadow-md' 
                                                : 'text-text-secondary hover:bg-gray-700/50 hover:text-white'
                                            }`}
                                        >
                                            <EllipsisHorizontalIcon className="h-5 w-5 mr-1" /> More
                                        </button>
                                        <div className={`absolute left-0 mt-2 w-56 origin-top-left bg-card rounded-md shadow-lg ring-1 ring-border focus:outline-none transition-all duration-200 ease-out z-20 ${isMoreDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                            <div className="py-1" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragLeave={() => setDropIndicator(null)}>
                                            {overflowNavLinks.map(link => (
                                                <div 
                                                    key={link.id}
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
                                                            onClick={() => setIsMoreDropdownOpen(false)}
                                                            draggable={false}
                                                            onDragStart={(e) => e.preventDefault()}
                                                            className={({ isActive }) => `flex items-center w-full px-4 py-2 text-sm rounded-md ${ isActive ? 'text-primary bg-primary/10' : 'text-text-secondary'} group-hover:bg-gray-700/50 group-hover:text-text-primary`}
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
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                )}
                
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="relative hidden md:block">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-text-secondary/70" />
                        </span>
                        <input type="text" placeholder="Search properties..." className="w-48 sm:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow" />
                    </div>
                    
                    <button
                        onClick={() => setIsMobileSearchOpen(true)}
                        className="p-2 rounded-full md:hidden text-text-secondary hover:text-text-primary hover:bg-gray-700/50"
                        aria-label="Open search"
                    >
                        <MagnifyingGlassIcon className="h-6 w-6" />
                    </button>

                    {user ? (
                        <>
                            <div className="relative" ref={notificationsRef}>
                                <Tooltip content={unreadCount > 0 ? `${unreadCount} unread notifications` : 'No new notifications'} position="bottom">
                                    <button
                                        onClick={() => setIsNotificationsOpen(o => !o)}
                                        className="relative text-text-secondary hover:text-text-primary p-2 rounded-full hover:bg-gray-700/50"
                                        aria-label={`${unreadCount} unread notifications`}
                                    >
                                        <BellIcon className="h-6 w-6" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-0 -right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-secondary">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>
                                </Tooltip>
                                {isNotificationsOpen && (
                                    <NotificationDropdown
                                        notifications={notifications}
                                        onMarkAsRead={(id) => {
                                            markAsRead(id);
                                        }}
                                        onMarkAllAsRead={() => {
                                            markAllAsRead();
                                        }}
                                        onViewAll={() => setIsNotificationsOpen(false)}
                                        isMobile={isMobile}
                                        onClose={() => setIsNotificationsOpen(false)}
                                    />
                                )}
                            </div>

                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-primary rounded-full"
                                >
                                    <UserCircleIcon className="h-10 w-10 text-text-secondary" />
                                </button>
                                <div className={`absolute right-0 mt-2 w-56 origin-top-right bg-card rounded-md shadow-xl ring-1 ring-border ring-opacity-5 focus:outline-none transition-all duration-200 ease-out z-20 ${isUserDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                    <div className="py-1">
                                        <div className="px-4 py-3 border-b border-border">
                                            <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                                            <p className="text-xs text-text-secondary truncate">{user.role}</p>
                                        </div>
                                        <Link to="/settings" onClick={() => setIsUserDropdownOpen(false)} className="w-full text-left flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-700/50 hover:text-text-primary">
                                            <Cog6ToothIcon className="h-5 w-5 mr-3" /> Settings
                                        </Link>
                                        <button onClick={() => { logout(); setIsUserDropdownOpen(false); }} className="w-full text-left flex items-center px-4 py-2 text-sm text-text-secondary hover:bg-gray-700/50 hover:text-text-primary">
                                            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" /> Sign out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <Link to="/login" className="px-3 sm:px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-700/50 rounded-lg transition-colors">Login</Link>
                            <Link to="/register" className="px-3 sm:px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
            {(layout === 'horizontal' && !isMobile) && (
                <ul ref={measurementContainerRef} className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none flex items-center space-x-1" aria-hidden="true">
                    {userVisibleLinks.map(link => (
                         <li key={`${link.id}-measure`} className="flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap">
                             <link.icon className="h-5 w-5 mr-2" />
                             {link.name}
                         </li>
                    ))}
                     <li ref={moreButtonMeasurementRef} className="flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap">
                        <EllipsisHorizontalIcon className="h-5 w-5 mr-1" />
                        <span>More</span>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Header;