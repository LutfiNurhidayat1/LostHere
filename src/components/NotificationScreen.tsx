import { ArrowLeft } from 'lucide-react';
import { NotificationItem } from './ui/NotificationItem';

interface Notification {
  id: string;
  type: 'match-found' | 'new-message' | 'item-returned';
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationScreenProps {
  notifications: Notification[];
  onBack: () => void;
  onNotificationClick: (notification: Notification) => void;
}

export function NotificationScreen({
  notifications,
  onBack,
  onNotificationClick
}: NotificationScreenProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-gray-900">Notifikasi</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto pb-20">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick(notification)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Belum ada notifikasi</h3>
            <p className="text-gray-500 text-sm text-center">
              Kami akan memberi tahu Anda saat menemukan kecocokan potensial untuk laporan Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}