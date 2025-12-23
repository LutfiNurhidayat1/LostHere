import { ArrowLeft } from 'lucide-react';
import { Card } from './ui/Card';
import type { Report } from '../App';

interface HistoryScreenProps {
  reports: Report[];
  onBack: () => void;
  onReportClick: (report: Report) => void;
  onDeleteReport: (id: string) => void; // ⬅️ WAJIB
}

export function HistoryScreen({ reports, onBack, onReportClick, onDeleteReport }: HistoryScreenProps) {
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
          <h1 className="text-gray-900">Riwayat Laporan</h1>
        </div>
      </div>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {reports.length > 0 ? (
          <div className="space-y-4 pb-20">
            {reports.map((report) => (
              <div key={report.id} className="relative">
                <Card
                  report={report}
                  onClick={() => onReportClick(report)}
                />

                {/* Tombol hapus */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ⛔ penting
                    onDeleteReport(report.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-50 hover:bg-red-100"
                title="Hapus laporan"
              >
                🗑️
              </button>
            </div>
          ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Belum ada laporan</h3>
            <p className="text-gray-500 text-sm text-center px-6">
              Laporan barang hilang dan barang temuan Anda akan muncul di sini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}