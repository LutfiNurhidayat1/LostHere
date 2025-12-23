import { Search, Bell, Clock } from 'lucide-react';
import { Button } from './ui/Button';

interface HomeScreenProps {
  onReportLost: () => void;
  onReportFound: () => void;
  onOpenNotifications: () => void;
  onOpenHistory: () => void;
  notificationCount?: number;
}

export function HomeScreen({
  onReportLost,
  onReportFound,
  onOpenNotifications,
  onOpenHistory,
  notificationCount = 0
}: HomeScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-gray-900">LostHere</h1>
            <p className="text-gray-500 mt-1">Membantu Anda menemukan yang penting</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenHistory}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Clock className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Illustration */}
        <div className="mb-12 relative">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Search className="w-24 h-24 text-blue-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20"></div>
          <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20"></div>
        </div>

        {/* Main Action Buttons */}
        <div className="w-full space-y-4">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onReportLost}
          >
            Laporkan Barang Hilang
          </Button>
          
          <Button
            variant="secondary"
            size="large"
            fullWidth
            onClick={onReportFound}
          >
            Laporkan Barang Temuan
          </Button>
        </div>

        {/* Info Text */}
        <div className="mt-8 text-center px-4">
          <p className="text-gray-500 text-sm">
            Laporan Anda bersifat pribadi dan aman. Kami akan memberi tahu Anda saat menemukan potensi kecocokan.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-gray-400 text-xs">
          LostHere v1.0
        </p>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-20"></div>
    </div>
  );
}