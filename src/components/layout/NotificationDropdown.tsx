import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Notification } from '../../types';
import { BanknotesIcon, BriefcaseIcon, EnvelopeIcon, MegaphoneIcon, CheckBadgeIcon, XMarkIcon } from '../shared/Icons';
import Tooltip from '../shared/Tooltip';

interface NotificationDropdownProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
  isMobile: boolean;
  onClose: () => void;
}

const iconMap: { [key in Notification['type']]: React.ComponentType<{className?: string}> } = {
    'New Deal': BanknotesIcon,
    'Task Assigned': BriefcaseIcon,
    'Client Message': EnvelopeIcon,
    'System Update': MegaphoneIcon,
};

const iconColorMap: { [key in Notification['type']]: string } = {
    'New Deal': 'bg-green-500/10 text-green-400',
    'Task Assigned': 'bg-pink-500/10 text-pink-400',
    'Client Message': 'bg-blue-500/10 text-blue-400',
    'System Update': 'bg-indigo-500/10 text-indigo-400',
};

const NotificationList: React.FC<{
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
}> = ({ notifications, onMarkAsRead }) => {
    const { unread, read } = useMemo(() => {
        const unread = notifications.filter(n => !n.isRead);
        const read = notifications.filter(n => n.isRead);
        return { unread, read };
    }, [notifications]);

    if (notifications.length === 0) {
        return (
            <div className="text-center py-12">
                <CheckBadgeIcon className="h-12 w-12 mx-auto text-text-secondary/50" />
                <p className="mt-2 text-sm text-text-secondary">You're all caught up!</p>
            </div>
        );
    }

    return (
        <>
            {unread.length > 0 && (
                <div className="p-2">
                    <h4 className="px-2 py-1 text-xs font-bold text-text-secondary uppercase tracking-wider">New</h4>
                    <ul className="space-y-1 mt-1">
                        {unread.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
                        ))}
                    </ul>
                </div>
            )}
            {read.length > 0 && (
                <div className={`p-2 ${unread.length > 0 ? 'border-t border-border' : ''}`}>
                    <h4 className="px-2 py-1 text-xs font-bold text-text-secondary uppercase tracking-wider">Earlier</h4>
                    <ul className="space-y-1 mt-1">
                        {read.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};


const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onMarkAsRead, onMarkAllAsRead, onViewAll, isMobile, onClose }) => {
    
    const hasUnread = useMemo(() => notifications.some(n => !n.isRead), [notifications]);

    if (isMobile) {
        const portalRoot = document.getElementById('portal-root');
        if (!portalRoot) return null;

        return ReactDOM.createPortal(
            <>
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
                    style={{ animationDuration: '300ms' }}
                    aria-hidden="true"
                ></div>
                <div 
                    className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 grid grid-rows-[auto_1fr_auto] bg-background animate-slide-in-from-right" 
                    style={{ animationDuration: '300ms' }}
                >
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                        <div className="flex items-center space-x-2">
                            {hasUnread && (
                                <button
                                    onClick={onMarkAllAsRead}
                                    className="text-xs font-medium text-primary hover:text-primary-hover hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                            <button onClick={onClose} className="p-1 text-text-secondary hover:text-text-primary" aria-label="Close notifications">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Content */}
                    <div className="overflow-y-auto min-h-0">
                        <NotificationList notifications={notifications} onMarkAsRead={onMarkAsRead} />
                    </div>
                    
                    {/* Mobile Footer */}
                    <div className="p-4 border-t border-border">
                        <Link
                            to="/notifications"
                            onClick={onViewAll}
                            className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors shadow-md hover:shadow-lg"
                        >
                            View All Notifications
                        </Link>
                    </div>
                </div>
            </>,
            portalRoot
        );
    }
    
    // Desktop View
    return (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 origin-top-right bg-card rounded-xl shadow-xl ring-1 ring-border focus:outline-none animate-fade-in-up z-50" style={{ animationDuration: '200ms' }}>
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                {hasUnread && (
                    <button
                        onClick={onMarkAllAsRead}
                        className="text-xs font-medium text-primary hover:text-primary-hover hover:underline"
                    >
                        Mark all as read
                    </button>
                )}
            </div>
            
            <div className="max-h-96 overflow-y-auto">
                <NotificationList notifications={notifications} onMarkAsRead={onMarkAsRead} />
            </div>

            <div className="p-2 border-t border-border">
                <Link
                    to="/notifications"
                    onClick={onViewAll}
                    className="block w-full text-center px-4 py-2 text-sm font-semibold text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                    View all notifications
                </Link>
            </div>
        </div>
    );
};

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
    const Icon = iconMap[notification.type];
    const iconColor = iconColorMap[notification.type];

    return (
        <li>
            <div 
                onClick={() => onMarkAsRead(notification.id)}
                className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-primary/10 hover:bg-primary/20' : 'hover:bg-gray-700/50'
                }`}
            >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="text-sm text-text-primary">
                        {notification.relatedUser && <span className="font-semibold">{notification.relatedUser}</span>} {notification.message}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">{notification.timestamp}</p>
                </div>
                {!notification.isRead && (
                    <Tooltip content="Unread" position="left">
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                    </Tooltip>
                )}
            </div>
        </li>
    );
}

export default NotificationDropdown;
