import { Home, MessageCircle, User } from 'lucide-react';

export type NavTab = 'home' | 'chat' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadChatCount?: number;
}

export function BottomNav({ activeTab, onTabChange, unreadChatCount = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'home' as NavTab, label: 'Beranda', icon: Home },
    { id: 'chat' as NavTab, label: 'Chat', icon: MessageCircle },
    { id: 'profile' as NavTab, label: 'Profil', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1 py-2 px-6 relative transition-colors"
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                  {tab.id === 'chat' && unreadChatCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      {unreadChatCount > 9 ? '9+' : unreadChatCount}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}