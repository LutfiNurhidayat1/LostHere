import { MessageCircle } from 'lucide-react';

export interface ChatThread {
  id: string;
  userName: string;
  userAvatar?: string;
  itemType: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface ChatListScreenProps {
  chats: ChatThread[];
  onChatClick: (chatId: string) => void;
  isGuest: boolean;
}

export function ChatListScreen({ chats, onChatClick, isGuest }: ChatListScreenProps) {
  // Guest view
  if (isGuest) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h1 className="text-gray-900">Chat</h1>
          <p className="text-gray-500 mt-1">
            Percakapan Anda
          </p>
        </div>

        {/* Guest Message */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <MessageCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-gray-900 mb-2 text-center">Login Diperlukan</h2>
          <p className="text-gray-500 text-center max-w-sm">
            Anda perlu masuk dengan Google untuk menggunakan fitur chat. Pengguna tamu dapat mengirim laporan tetapi tidak dapat berkomunikasi dengan orang lain.
          </p>
        </div>

        {/* Bottom padding for nav */}
        <div className="h-20"></div>
      </div>
    );
  }

  // Empty state
  if (chats.length === 0) {
    return (
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <h1 className="text-gray-900">Chat</h1>
          <p className="text-gray-500 mt-1">
            Percakapan Anda
          </p>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
            <MessageCircle className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-gray-900 mb-2 text-center">Belum ada chat</h2>
          <p className="text-gray-500 text-center max-w-sm">
            Mulai laporan untuk menemukan kecocokan. Ketika seseorang menemukan kecocokan potensial, Anda dapat chat di sini.
          </p>
        </div>

        {/* Bottom padding for nav */}
        <div className="h-20"></div>
      </div>
    );
  }

  // Chat list
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <h1 className="text-gray-900">Chat</h1>
        <p className="text-gray-500 mt-1">
          {chats.length} {chats.length === 1 ? 'percakapan' : 'percakapan'}
        </p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatClick(chat.id)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                  {chat.userAvatar ? (
                    <img
                      src={chat.userAvatar}
                      alt={chat.userName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg">{chat.userName.charAt(0).toUpperCase()}</span>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900 truncate">{chat.userName}</h3>
                    <span className="text-gray-400 text-xs flex-shrink-0 ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{chat.itemType}</p>
                  <p className="text-gray-600 text-sm truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread Indicator */}
                {chat.unread && (
                  <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div className="h-20"></div>
    </div>
  );
}