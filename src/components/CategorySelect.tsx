import { ArrowLeft, Smartphone, Laptop, Wallet, Key, CreditCard, FileText, Shirt, Package } from 'lucide-react';

interface CategorySelectProps {
  onBack: () => void;
  onSelectCategory: (category: string) => void;
  type: 'lost' | 'found';
}

const categories = [
  { id: 'phone', label: 'Ponsel', icon: Smartphone, color: 'from-blue-500 to-blue-600' },
  { id: 'laptop', label: 'Laptop', icon: Laptop, color: 'from-purple-500 to-purple-600' },
  { id: 'wallet', label: 'Dompet / Tas', icon: Wallet, color: 'from-pink-500 to-pink-600' },
  { id: 'keys', label: 'Kunci', icon: Key, color: 'from-yellow-500 to-yellow-600' },
  { id: 'id-card', label: 'Kartu Identitas', icon: CreditCard, color: 'from-green-500 to-green-600' },
  { id: 'document', label: 'Dokumen', icon: FileText, color: 'from-indigo-500 to-indigo-600' },
  { id: 'clothing', label: 'Pakaian', icon: Shirt, color: 'from-red-500 to-red-600' },
  { id: 'other', label: 'Barang Lainnya', icon: Package, color: 'from-gray-500 to-gray-600' }
];

export function CategorySelect({ onBack, onSelectCategory, type }: CategorySelectProps) {
  const isLost = type === 'lost';

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
        <h1 className="text-gray-900">Pilih Kategori</h1>
        <p className="text-gray-500 mt-1">
          {isLost ? 'Barang apa yang hilang?' : 'Barang apa yang ditemukan?'}
        </p>
      </div>

      {/* Category Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center gap-3"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-gray-900 text-center text-sm">
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}