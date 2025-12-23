import { Clock, CheckCircle2, MessageCircle, Package } from 'lucide-react';
import type { Report } from '../../App';

interface CardProps {
  report: Report;
  onClick: () => void;
}

const categoryLabels: { [key: string]: string } = {
  'phone': 'Phone',
  'laptop': 'Laptop',
  'wallet': 'Wallet / Bag',
  'keys': 'Keys',
  'id-card': 'ID Card',
  'document': 'Document',
  'clothing': 'Clothing',
  'other': 'Other Item'
};

export function Card({ report, onClick }: CardProps) {
  const statusConfig = {
    pending: {
      label: 'Pending Match',
      color: 'bg-yellow-100 text-yellow-700',
      icon: Clock
    },
    matched: {
      label: 'Match Found',
      color: 'bg-green-100 text-green-700',
      icon: CheckCircle2
    },
    'chat-ongoing': {
      label: 'Chat Ongoing',
      color: 'bg-blue-100 text-blue-700',
      icon: MessageCircle
    },
    completed: {
      label: 'Completed',
      color: 'bg-purple-100 text-purple-700',
      icon: Package
    }
  };

  const config = statusConfig[report.status];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs ${
              report.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {report.type === 'lost' ? 'Lost' : 'Found'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${config.color}`}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
          </div>
          <h3 className="text-gray-900 mb-1">
            {categoryLabels[report.category] || report.category} - {report.color}
          </h3>
          <p className="text-gray-600 text-sm">
            {report.brand && report.model ? `${report.brand} ${report.model}` : report.model || 'Details in report'}
          </p>
        </div>
        {report.photo && (
          <img
            src={report.photo}
            alt="Item"
            className="w-16 h-16 rounded-xl object-cover ml-4"
          />
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          📍 {report.location}
        </span>
        <span className="text-gray-400">
          {new Date(report.date).toLocaleDateString()}
        </span>
      </div>

      {report.matchCount && report.matchCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-green-600">
            ✓ {report.matchCount} potential {report.matchCount === 1 ? 'match' : 'matches'} found
          </p>
        </div>
      )}
    </button>
  );
}