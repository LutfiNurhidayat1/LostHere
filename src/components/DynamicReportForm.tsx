import { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';
import { Select } from './ui/Select';

interface SubmitReportPayload {
  category: string;
  brand?: string;
  model?: string;
  color?: string;
  characteristics: string;
  location: string;
  date: string;
  photo?: string | null;
}


interface DynamicReportFormProps {
  type: 'lost' | 'found';
  category: string;
  onBack: () => void;
  onSubmit: (data: SubmitReportPayload) => void;
}

type FieldConfig =
  | {
      id: string;
      label: string;
      type: 'text';
      placeholder?: string;
      required?: boolean;
    }
  | {
      id: string;
      label: string;
      type: 'textarea';
      placeholder?: string;
      required?: boolean;
      rows?: number;
    }
  | {
      id: string;
      label: string;
      type: 'select';
      options: string[];
      required?: boolean;
    };


// Field configurations for each category
const categoryFields: Record<string, FieldConfig[]> = {

  'phone': [
    { id: 'brand', label: 'Merek', type: 'text', placeholder: 'mis., Apple, Samsung, Xiaomi', required: true },
    { id: 'model', label: 'Model / Seri', type: 'text', placeholder: 'mis., iPhone 14 Pro, Galaxy S23', required: true },
    { id: 'color', label: 'Warna', type: 'text', placeholder: 'mis., Space Gray, Midnight Blue', required: true },
    { id: 'caseColor', label: 'Warna Casing (Opsional)', type: 'text', placeholder: 'mis., Transparan, Hitam' },
    { id: 'imei', label: 'IMEI (Opsional, untuk verifikasi)', type: 'text', placeholder: 'Hanya 4 digit terakhir' },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Pelindung layar, goresan, stiker, dll.', required: true, rows: 3 }
  ],
  'laptop': [
    { id: 'brand', label: 'Merek', type: 'text', placeholder: 'mis., Apple, Dell, Lenovo', required: true },
    { id: 'model', label: 'Model / Seri', type: 'text', placeholder: 'mis., MacBook Pro M2, ThinkPad X1', required: true },
    { id: 'color', label: 'Warna', type: 'text', placeholder: 'mis., Space Gray, Hitam', required: true },
    { id: 'screenSize', label: 'Ukuran Layar', type: 'text', placeholder: 'mis., 13 inci, 15 inci' },
    { id: 'serialNumber', label: 'Nomor Seri (Opsional, tersamar)', type: 'text', placeholder: 'Hanya 4 karakter terakhir' },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Stiker, goresan, detail tas laptop, dll.', required: true, rows: 3 }
  ],
  'wallet': [
    { id: 'itemType', label: 'Jenis', type: 'select', options: ['Dompet', 'Ransel', 'Tas Jinjing', 'Tas Tangan', 'Tas Selempang', 'Pouch'], required: true },
    { id: 'color', label: 'Warna', type: 'text', placeholder: 'mis., Hitam, Coklat, Biru Dongker', required: true },
    { id: 'material', label: 'Bahan', type: 'select', options: ['Kulit', 'Kanvas', 'Nilon', 'Poliester', 'Plastik', 'Lainnya'], required: true },
    { id: 'brand', label: 'Merek (Opsional)', type: 'text', placeholder: 'mis., Herschel, Fossil' },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Gantungan kunci, stiker, tambalan, pola keausan, dll.', required: true, rows: 3 }
  ],
  'keys': [
    { id: 'keyType', label: 'Jenis Kunci', type: 'select', options: ['Kunci Motor', 'Kunci Mobil', 'Kunci Rumah', 'Kunci Loker', 'Kunci Gembok', 'Kunci Kantor', 'Lainnya'], required: true },
    { id: 'keychainDescription', label: 'Deskripsi Gantungan Kunci', type: 'textarea', placeholder: 'Jelaskan gantungan kunci, liontin, atau tempat kunci', required: true, rows: 2 },
    { id: 'numberOfKeys', label: 'Jumlah Kunci', type: 'select', options: ['1', '2', '3', '4', '5+'], required: true },
    { id: 'color', label: 'Warna / Tampilan', type: 'text', placeholder: 'mis., Kunci perak dengan gantungan merah', required: true },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Bentuk kunci, merek, aksesoris, dll.', required: true, rows: 2 }
  ],
  'id-card': [
    { id: 'idType', label: 'Jenis Identitas', type: 'select', options: ['KTP (Kartu Identitas)', 'KTM (Kartu Mahasiswa)', 'SIM (Surat Izin Mengemudi)', 'Paspor', 'ID Karyawan', 'Lainnya'], required: true },
    { id: 'nameOnId', label: 'Nama di Kartu', type: 'text', placeholder: 'Nama depan atau inisial saja', required: true },
    { id: 'institution', label: 'Institusi / Penerbit', type: 'text', placeholder: 'mis., Nama universitas, Instansi pemerintah', required: true },
    { id: 'idNumber', label: 'Nomor Identitas (Opsional, untuk verifikasi)', type: 'text', placeholder: 'Hanya 4 digit terakhir' },
    { id: 'color', label: 'Warna / Tampilan', type: 'text', placeholder: 'mis., Kartu biru, sampul plastik', required: true },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Bekas selotip, retak, stiker, detail tempat kartu, dll.', required: true, rows: 3 }
  ],
  'document': [
    { id: 'documentType', label: 'Jenis Dokumen', type: 'select', options: ['Sertifikat', 'Surat', 'Kontrak', 'Formulir', 'Kuitansi', 'Buku', 'Buku Catatan', 'Map', 'Lainnya'], required: true },
    { id: 'documentTitle', label: 'Judul / Subjek Dokumen', type: 'text', placeholder: 'mis., Akta Kelahiran, Catatan Kuliah', required: true },
    { id: 'color', label: 'Warna / Sampul', type: 'text', placeholder: 'mis., Map biru, Buku coklat', required: true },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Stempel, tanda tangan, tulisan tangan, kondisi map, dll.', required: true, rows: 3 }
  ],
  'clothing': [
    { id: 'clothingType', label: 'Jenis Pakaian', type: 'select', options: ['Jaket', 'Sweater', 'Kemeja', 'Celana', 'Topi', 'Sepatu', 'Syal', 'Sarung Tangan', 'Lainnya'], required: true },
    { id: 'brand', label: 'Merek (Opsional)', type: 'text', placeholder: 'mis., Nike, Uniqlo, Zara' },
    { id: 'color', label: 'Warna / Pola', type: 'text', placeholder: 'mis., Biru dongker, Garis-garis, Bunga', required: true },
    { id: 'size', label: 'Ukuran (Opsional)', type: 'text', placeholder: 'mis., M, L, XL' },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Logo, tambalan, noda, fitur unik, dll.', required: true, rows: 3 }
  ],
  'other': [
    { id: 'itemName', label: 'Nama Barang', type: 'text', placeholder: 'mis., Botol Minum, Payung, Kacamata', required: true },
    { id: 'description', label: 'Deskripsi', type: 'textarea', placeholder: 'Jelaskan barang secara detail', required: true, rows: 3 },
    { id: 'color', label: 'Warna', type: 'text', placeholder: 'Warna utama barang', required: true },
    { id: 'characteristics', label: 'Ciri Khusus', type: 'textarea', placeholder: 'Fitur unik, merek, kondisi, dll.', required: true, rows: 3 }
  ]
};

const categoryLabels: { [key: string]: string } = {
  'phone': 'Ponsel',
  'laptop': 'Laptop',
  'wallet': 'Dompet / Tas',
  'keys': 'Kunci',
  'id-card': 'Kartu Identitas',
  'document': 'Dokumen',
  'clothing': 'Pakaian',
  'other': 'Barang Lainnya'
};

export function DynamicReportForm({ type, category, onBack, onSubmit }: DynamicReportFormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    location: '',
    date: '',
    time: ''
  });
  const [photo, setPhoto] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { brand, model, color, ...rest } = formData;

    const characteristicsText = Object.entries(rest)
      .filter(([key, value]) => key !== 'date' && key !== 'time' && value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    onSubmit({
      category,
      brand: brand || '',
      model: model || '',
      color: color || '',
      characteristics: characteristicsText,
      location: formData.location,
      date: formData.date,
      photo
    });
  };



  const isLost = type === 'lost';
  const fields = categoryFields[category as keyof typeof categoryFields] || categoryFields['other'];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <button
          onClick={onBack}
          className="mb-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-gray-900">
          {isLost ? 'Laporkan Barang Hilang ' : 'Laporkan Barang Temuan '}{categoryLabels[category]}
        </h1>
        <p className="text-gray-500 mt-1">
          Isi detail untuk membantu pencocokan
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-5">
          {/* Dynamic Fields Based on Category */}
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <Select
                  key={field.id}
                  label={field.label}
                  value={formData[field.id] || ''}
                  onChange={(value) => handleChange(field.id, value)}
                  options={field.options || []}
                  placeholder={`Select ${field.label.toLowerCase()}`}
                  required={field.required}
                />
              );
            } else if (field.type === 'textarea') {
              return (
                <FormField
                  key={field.id}
                  label={field.label}
                  value={formData[field.id] || ''}
                  onChange={(value) => handleChange(field.id, value)}
                  placeholder={field.placeholder}
                  multiline
                  rows={field.rows || 3}
                  required={field.required}
                />
              );
            } else {
              return (
                <FormField
                  key={field.id}
                  label={field.label}
                  value={formData[field.id] || ''}
                  onChange={(value) => handleChange(field.id, value)}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              );
            }
          })}

          {/* Common Fields for All Categories */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-gray-900 mb-4">Detail Lokasi & Waktu</h3>
            
            <div className="space-y-5">
              <FormField
                label={isLost ? 'Lokasi Hilang' : 'Lokasi Ditemukan'}
                value={formData.location}
                onChange={(value) => handleChange('location', value)}
                placeholder="mis., Perpustakaan Lantai 3, Kantin Utama"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Tanggal"
                  type="date"
                  value={formData.date}
                  onChange={(value) => handleChange('date', value)}
                  required
                />
                <FormField
                  label="Waktu"
                  type="time"
                  value={formData.time}
                  onChange={(value) => handleChange('time', value)}
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-gray-700 mb-2">
              Foto (Opsional)
            </label>
            <p className="text-gray-500 text-sm mb-3">
              Foto membantu verifikasi saat chat
            </p>
            {!photo ? (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">
                    Ketuk untuk mengunggah foto
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img src={photo} alt="Pratinjau unggahan" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pb-6">
          <Button type="submit" variant="primary" size="large" fullWidth>
            Kirim Laporan
          </Button>
        </div>
      </form>
    </div>
  );
}