import { Search } from 'lucide-react';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Button } from './ui/Button';

interface LoginScreenProps {
  onLoginWithGoogle: (userData: any) => void;
  onContinueAsGuest: () => void;
}

export function LoginScreen({ onLoginWithGoogle, onContinueAsGuest }: LoginScreenProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
            <Search className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-30"></div>
        </div>

        {/* Title */}
        <h1 className="text-gray-900 mb-2 text-center">LostHere</h1>
        <p className="text-gray-500 text-center mb-12">
          Masuk untuk melanjutkan
        </p>

        {/* Login Buttons */}
        <div className="w-full space-y-4 max-w-sm">
          <GoogleLoginButton
            onSuccess={onLoginWithGoogle}
            onError={(error) => console.error('Login error:', error)}
          />

          <Button
            variant="outline"
            size="large"
            fullWidth
            onClick={onContinueAsGuest}
          >
            Lanjut sebagai Tamu
          </Button>
        </div>

        {/* Info Text */}
        <div className="mt-8 text-center px-4 max-w-sm">
          <p className="text-gray-500 text-sm">
            Pengguna tamu dapat mengirim laporan tetapi harus masuk untuk menggunakan fitur chat.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-gray-400 text-xs">
          LostHere v1.0 - Sistem Barang Hilang Kampus
        </p>
      </div>
    </div>
  );
}