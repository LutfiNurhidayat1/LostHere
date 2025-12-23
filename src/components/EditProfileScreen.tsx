import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useState, useEffect } from 'react';


interface UserProfile {
  id: string;
  name: string;
  email: string;
  photo?: string;
  username?: string;
  phone?: string;
  about?: string;
  preferredCategories?: string[];
}

interface EditProfileScreenProps {
  user: UserProfile;
  onBack: () => void;
  onSave: (updatedUser: UserProfile) => void;
}

const ITEM_CATEGORIES = [
  'Ponsel',
  'Laptop',
  'Dompet/Tas',
  'Kunci',
  'Kartu Identitas',
  'Dokumen',
  'Pakaian',
  'Lainnya'
];

export function EditProfileScreen({ user, onBack, onSave }: EditProfileScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    about: ''
  });

  useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      username: user.username || '',
      phone: user.phone || '',
      about: user.about || ''
    });
  }
}, [user]);

  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const toggleCategory = (category: string) => {
    const current = formData.preferredCategories || [];
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category];
    handleChange('preferredCategories', updated);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Nama harus minimal 2 karakter';
    }

    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Username harus minimal 3 karakter';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Masukkan nomor telepon yang valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    onSave({
      ...user,
      ...formData,
      photo: newPhoto || user.photo
    });
  };


  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <h1 className="text-gray-900">Ubah Profil</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white overflow-hidden">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">
                     {formData.name?.[0]?.toUpperCase()
                        ?? formData.email?.[0]?.toUpperCase()
                        ?? '?'}
                    </span>

                )}
              </div>
              <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-gray-500 text-sm">Klik kamera untuk mengganti foto</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <h3 className="text-gray-900 mb-4">Informasi Dasar</h3>
          
          {/* Display Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">
              Nama Tampilan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Nama lengkap Anda"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email (read-only) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email (Google)</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-500"
            />
            <p className="text-gray-400 text-xs mt-1">Email tidak dapat diubah</p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Username (opsional)</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="@username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-0">
            <label className="block text-gray-700 text-sm mb-2">Nomor Telepon (opsional)</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="+62 812-3456-7890"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* About Me */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <h3 className="text-gray-900 mb-4">Tentang Saya</h3>
          <textarea
            value={formData.about || ''}
            onChange={(e) => handleChange('about', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            rows={4}
            placeholder="Ceritakan tentang diri Anda (opsional)"
          />
        </div>

        {/* Preferred Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
          <h3 className="text-gray-900 mb-2">Kategori Barang Pilihan</h3>
          <p className="text-gray-500 text-sm mb-4">
            Dapatkan notifikasi tentang barang yang paling Anda pedulikan
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ITEM_CATEGORIES.map((category) => {
              const isSelected = formData.preferredCategories?.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleSave}
        >
          Simpan Perubahan
        </Button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>Profil berhasil diperbarui!</span>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div className="h-20"></div>
    </div>
  );
}