// /src/pages/notifications/Notifications.tsx

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../types';
import { useNotifications } from '../../context/NotificationContext';
import { BanknotesIcon, BriefcaseIcon, EnvelopeIcon, MegaphoneIcon, CheckBadgeIcon, ArrowLeftIcon } from '../../components/shared/Icons';

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
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1 flex-shrink-0" title="Unread"></div>
                )}
            </div>
        </li>
    );
}

const Notifications: React.FC = () => {
    const navigate = useNavigate();
    const { notifications, markAsRead, markAllAsRead } = useNotifications();

    const { unread, read } = useMemo(() => {
        const unread = notifications.filter(n => !n.isRead);
        const read = notifications.filter(n => n.isRead);
        return { unread, read };
    }, [notifications]);

    const hasUnread = unread.length > 0;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                     <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 rounded-full text-text-secondary hover:bg-gray-700/50 hover:text-text-primary transition-colors"
                        aria-label="Go back"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
                </div>
                {hasUnread && (
                    <button
                        onClick={markAllAsRead}
                        className="text-sm font-medium text-primary hover:text-primary-hover hover:underline self-start sm:self-auto"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="bg-card rounded-xl shadow-soft border border-border/50">
                {notifications.length === 0 ? (
                    <div className="text-center py-16">
                        <CheckBadgeIcon className="h-16 w-16 mx-auto text-text-secondary/50" />
                        <p className="mt-4 text-lg text-text-secondary">You're all caught up!</p>
                        <p className="text-sm text-text-secondary/80">No new notifications.</p>
                    </div>
                ) : (
                    <>
                        {unread.length > 0 && (
                            <div className="p-4 sm:p-6">
                                <h2 className="px-2 text-sm font-bold text-text-secondary uppercase tracking-wider">New</h2>
                                <ul className="space-y-2 mt-2">
                                    {unread.map(notification => (
                                        <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                                    ))}
                                </ul>
                            </div>
                        )}
                        {read.length > 0 && (
                            <div className={`p-4 sm:p-6 ${unread.length > 0 ? 'border-t border-border' : ''}`}>
                                <h2 className="px-2 text-sm font-bold text-text-secondary uppercase tracking-wider">Earlier</h2>
                                <ul className="space-y-2 mt-2">
                                    {read.map(notification => (
                                        <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Notifications;