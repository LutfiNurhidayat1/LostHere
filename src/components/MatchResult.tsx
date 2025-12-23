import { CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';

interface MatchResultProps {
  matchCount: number;
  reportType: 'lost' | 'found';
  onStartChat: () => void;
  onBackHome: () => void;
}

export function MatchResult({
  matchCount,
  reportType,
  onStartChat,
  onBackHome
}: MatchResultProps) {
  const isLost = reportType === 'lost';

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-6">
        <h1 className="text-gray-900">Kecocokan Ditemukan!</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Success Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" strokeWidth={2} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-20 animate-pulse"></div>
        </div>

        {/* Match Information */}
        <div className="text-center mb-8">
          <h2 className="text-gray-900 mb-2">
            Kami menemukan {matchCount} {matchCount === 1 ? 'kecocokan' : 'kecocokan'} yang mungkin
          </h2>
          <p className="text-gray-600 px-4">
            {isLost 
              ? 'Seseorang mungkin telah menemukan barang Anda. Mulai chat untuk memverifikasi dan mengatur pengambilan.'
              : 'Barang temuan Anda cocok dengan laporan barang hilang. Mulai chat untuk membantu mengembalikannya.'}
          </p>
        </div>

        {/* Info Card */}
        <div className="w-full bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Verifikasi Aman</h3>
              <p className="text-gray-600 text-sm">
                Chat secara pribadi untuk memverifikasi detail barang. Tidak ada informasi pribadi yang dibagikan sampai Anda memilih untuk berbagi.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={onStartChat}
          >
            {isLost ? 'Mulai Chat dengan Penemu' : 'Mulai Chat dengan Pemilik'}
          </Button>
          
          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={onBackHome}
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Privacy Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs px-4">
            Detail laporan Anda tetap pribadi. Hanya Anda dan pengguna yang cocok yang dapat berkomunikasi.
          </p>
        </div>
      </div>
    </div>
  );
}