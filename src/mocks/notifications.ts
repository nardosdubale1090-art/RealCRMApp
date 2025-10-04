// /src/mocks/notifications.ts

import { Notification } from '../types';

export const mockNotifications: Notification[] = [
  // Unread notifications
  {
    id: 'N001',
    type: 'Client Message',
    message: 'sent you a message regarding "Modern Downtown Apartment".',
    relatedUser: 'John Doe',
    timestamp: '5m ago',
    isRead: false,
  },
  {
    id: 'N002',
    type: 'New Deal',
    message: 'A new deal "Villa Purchase" has been initiated.',
    relatedUser: 'Alice Johnson',
    timestamp: '30m ago',
    isRead: false,
  },
  {
    id: 'N003',
    type: 'Task Assigned',
    message: 'assigned you a task: "Follow up with Jane Smith".',
    relatedUser: 'Charlie Brown',
    timestamp: '2h ago',
    isRead: false,
  },
  // Read notifications
  {
    id: 'N004',
    type: 'System Update',
    message: 'The reporting module has been updated with new analytics features.',
    timestamp: '1d ago',
    isRead: true,
  },
  {
    id: 'N005',
    type: 'Task Assigned',
    message: 'assigned you a task: "Prepare documents for C004".',
    relatedUser: 'Charlie Brown',
    timestamp: '2d ago',
    isRead: true,
  },
  {
    id: 'N006',
    type: 'New Deal',
    message: 'A new deal "Downtown Apt Sale" has been initiated.',
    relatedUser: 'Bob Williams',
    timestamp: '3d ago',
    isRead: true,
  },
];