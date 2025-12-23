import { User, FileText, Bell, LogOut, ChevronRight, Edit, Database } from 'lucide-react';
import { Button } from './ui/Button';

interface UserProfile {
  name: string;
  email: string;
  photo?: string;
}

interface ProfileScreenProps {
  isGuest: boolean;
  user?: UserProfile;
  reportCount: number;
  onLoginWithGoogle: () => void;
  onEditProfile: () => void;
  onViewReports: () => void;
  onNotificationSettings: () => void;
  onStorageManagement: () => void;
  onLogout: () => void;
}

export function ProfileScreen({
  isGuest,
  user,
  reportCount,
  onLoginWithGoogle,
  onEditProfile,
  onViewReports,
  onNotificationSettings,
  onStorageManagement,
  onLogout
}: ProfileScreenProps) {

  if (!isGuest && !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Memuat profil...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-gray-900">Profil</h1>
        <p className="text-gray-500 mt-1">
          {isGuest ? 'Akun Tamu' : 'Kelola akun Anda'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
              {isGuest ? (
                <User className="w-10 h-10" />
              ) : user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl">
                  {user?.name?.[0]?.toUpperCase()
                    ?? user?.email?.[0]?.toUpperCase()
                    ?? '?'}
                </span>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1">
              {isGuest ? (
                <>
                  <h2 className="text-gray-900 mb-1">Pengguna Tamu</h2>
                  <p className="text-gray-500 text-sm">
                    Akses terbatas
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-gray-900 mb-1">{user?.name}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </>
              )}
            </div>
          </div>

          {/* Guest Login Prompt */}
          {isGuest && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm mb-3">
                Masuk untuk membuka fitur chat dan menyimpan profil Anda
              </p>
              <Button
                variant="primary"
                size="medium"
                fullWidth
                onClick={onLoginWithGoogle}
              >
                Masuk dengan Google
              </Button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {/* Edit Profile - only for logged in users */}
          {!isGuest && (
            <button
              onClick={onEditProfile}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Edit className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-900">Ubah Profil</h3>
                  <p className="text-gray-500 text-sm">Perbarui informasi Anda</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {/* View Reports */}
          <button
            onClick={onViewReports}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900">Laporan Saya</h3>
                <p className="text-gray-500 text-sm">
                  {reportCount} {reportCount === 1 ? 'laporan' : 'laporan'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Notification Settings */}
          {!isGuest && (
            <button
              onClick={onNotificationSettings}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-gray-900">Notifikasi</h3>
                  <p className="text-gray-500 text-sm">Kelola notifikasi</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {/* Storage Management */}
          <button
            onClick={onStorageManagement}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-gray-900">Pengelolaan Penyimpanan</h3>
                <p className="text-gray-500 text-sm">Kelola data lokal</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        {!isGuest && (
          <div className="mt-8">
            <button
              onClick={onLogout}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border-2 border-red-200 hover:border-red-400 hover:shadow-md transition-all flex items-center justify-center gap-3 text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Keluar</span>
            </button>
          </div>
        )}

        {/* App Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs mb-1">LostHere v1.0</p>
          <p className="text-gray-400 text-xs">Sistem Barang Hilang Kampus</p>
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-20"></div>
    </div>
  );
}