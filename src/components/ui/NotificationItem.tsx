import { CheckCircle2, MessageCircle, Package } from 'lucide-react';

interface Notification {
  id: string;
  type: 'match-found' | 'new-message' | 'item-returned';
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const iconMap = {
    'match-found': CheckCircle2,
    'new-message': MessageCircle,
    'item-returned': Package
  };

  const colorMap = {
    'match-found': 'bg-green-100 text-green-600',
    'new-message': 'bg-blue-100 text-blue-600',
    'item-returned': 'bg-purple-100 text-purple-600'
  };

  const Icon = iconMap[notification.type];

  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors ${
        !notification.read ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className={`w-12 h-12 rounded-full ${colorMap[notification.type]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="flex-1 text-left">
        <p className={`${!notification.read ? 'text-gray-900' : 'text-gray-600'} mb-1`}>
          {notification.message}
        </p>
        <span className="text-xs text-gray-400">{notification.timestamp}</span>
      </div>

      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
      )}
    </button>
  );
}
