import { Clock, Bell } from 'lucide-react';
import { Button } from './ui/Button';

interface NoMatchProps {
  onBackHome: () => void;
}

export function NoMatch({ onBackHome }: NoMatchProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-gray-900">Laporan Dikirim</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Illustration */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Clock className="w-16 h-16 text-blue-500" strokeWidth={2} />
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-500" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-2">
            Belum ada laporan yang cocok ditemukan
          </h2>
          <p className="text-gray-600 px-4">
            Jangan khawatir! Laporan Anda tersimpan di sistem kami. Kami akan memberi tahu Anda segera saat laporan yang cocok muncul.
          </p>
        </div>

        {/* Info Cards */}
        <div className="w-full space-y-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Notifikasi Instan</h3>
                <p className="text-gray-600 text-sm">
                  Anda akan menerima notifikasi push saat kecocokan ditemukan
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Aktif selama 30 Hari</h3>
                <p className="text-gray-600 text-sm">
                  Laporan Anda tetap aktif dan dapat dicari selama satu bulan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onBackHome}
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Tip */}
        <div className="mt-8 text-center bg-blue-50 rounded-xl p-4">
          <p className="text-blue-700 text-sm">
            💡 Tips: Periksa kembali secara berkala atau aktifkan notifikasi untuk hasil lebih cepat
          </p>
        </div>
      </div>
    </div>
  );
}