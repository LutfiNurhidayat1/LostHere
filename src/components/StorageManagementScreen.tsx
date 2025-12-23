import { useState } from 'react';
import { ArrowLeft, Database, Trash2, Download, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface StorageManagementScreenProps {
  onBack: () => void;
  reportCount: number;
  chatCount: number;
  onClearStorage: () => void;
  onExportData: () => void;
}

export function StorageManagementScreen({
  onBack,
  reportCount,
  chatCount,
  onClearStorage,
  onExportData
}: StorageManagementScreenProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClearStorage = () => {
    onClearStorage();
    setShowConfirmDialog(false);
  };

  const estimatedSize = (reportCount * 2) + (chatCount * 1); // Mock calculation in KB

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-gray-900">Pengelolaan Penyimpanan</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Storage Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Penyimpanan Lokal</h3>
              <p className="text-gray-500 text-sm">Penyimpanan data tingkat perangkat</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Total Laporan</span>
              <span className="text-gray-900">{reportCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Percakapan Chat</span>
              <span className="text-gray-900">{chatCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Ukuran Estimasi</span>
              <span className="text-gray-900">~{estimatedSize} KB</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-4">
          <p className="text-blue-700 text-sm">
            <strong>Catatan:</strong> Semua laporan dan riwayat chat disimpan secara lokal di perangkat Anda. Data ini tetap ada bahkan saat beralih antara akun Google yang berbeda.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Export Data */}
          <button
            onClick={onExportData}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900">Ekspor Data</h3>
                <p className="text-gray-500 text-sm">Unduh laporan Anda sebagai JSON</p>
              </div>
            </div>
          </button>

          {/* Clear Storage */}
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border-2 border-red-200 hover:border-red-400 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="text-red-600">Hapus Semua Penyimpanan</h3>
                <p className="text-gray-500 text-sm">Hapus semua laporan dan chat</p>
              </div>
            </div>
          </button>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-yellow-900 mb-1">Penting</h4>
              <p className="text-yellow-700 text-sm">
                Menghapus penyimpanan akan menghapus semua laporan dan riwayat chat Anda secara permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-gray-900 text-center mb-2">Hapus Semua Penyimpanan?</h2>
            <p className="text-gray-600 text-center mb-6 text-sm">
              Ini akan menghapus permanen semua {reportCount} laporan dan {chatCount} percakapan chat. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleClearStorage}
              >
                Ya, Hapus Semua
              </Button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="w-full px-6 py-3 rounded-2xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div className="h-20"></div>
    </div>
  );
}