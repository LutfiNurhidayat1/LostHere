import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelect } from './components/CategorySelect';
import { DynamicReportForm } from './components/DynamicReportForm';
import { MatchResult } from './components/MatchResult';
import { NoMatch } from './components/NoMatch';
import { ChatScreen } from './components/ChatScreen';
import { ChatListScreen, type ChatThread } from './components/ChatListScreen';
import { NotificationScreen } from './components/NotificationScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { StorageManagementScreen } from './components/StorageManagementScreen';
import { BottomNav, type NavTab } from './components/BottomNav';
import { supabase } from './lib/supabase';
import { report } from 'process';


export type Screen = 
  | 'login'
  | 'home' 
  | 'category-select-lost'
  | 'category-select-found'
  | 'lost-form' 
  | 'found-form' 
  | 'match-result' 
  | 'no-match' 
  | 'chat-list'
  | 'chat-detail' 
  | 'notifications' 
  | 'history'
  | 'profile'
  | 'edit-profile'
  | 'storage-management';

export interface Report {
  id: string;
  category: string;
  characteristics: string;
  location: string;
  date: string;
  photo?: string;
  status: 'pending' | 'matched' | 'chat-ongoing' | 'completed';
  matchCount?: number;
  user_id: string;
  table: 'lost_reports' | 'found_reports';
}


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

// Storage keys for persistent data


function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [matchedReport, setMatchedReport] = useState<Report | null>(null);


  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Data state - PERSISTENT across all users
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: '1',
      type: 'match-found',
      message: 'A new found item matches your lost laptop report',
      timestamp: '2 hours ago',
      read: false
    }
  ]);

  const requireAuth = (screen: Screen) => {
    const protectedScreens: Screen[] = [
      'profile',
      'edit-profile',
      'chat-list',
      'chat-detail',
      'notifications',
      'storage-management'
    ];

    if (protectedScreens.includes(screen)) {
      if (!user) {
        setCurrentScreen('login');
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('chat-thread-refresh')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        () => {
          fetchChatThreads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);


  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.full_name,
          photo: session.user.user_metadata.avatar_url
        });
        setIsLoggedIn(true);
        setCurrentScreen('home');
      } else {
        setIsLoggedIn(false);
        setCurrentScreen('login');
      }
    });

  return () => subscription.unsubscribe();
}, []);

  

  // Mock chat threads - PERSISTENT across all users
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);

  const fetchChatThreads = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('chat_threads')
      .select('*')
      .or(`user_a.eq.${user.id},user_b.eq.${user.id}`);

    if (!error && data) {
      setChatThreads(
        data.map(t => ({
          id: t.id,
          userName: 'Match User',
          itemType: 'Matched Item',
          lastMessage: '',
          timestamp: '',
          unread: false
        }))
      );
    }
  };

  useEffect(() => {
    fetchChatThreads();
  }, [user]);



  const fetchReports = async () => {
    if (!user) return;

    const { data: lost } = await supabase
      .from('lost_reports')
      .select('*')
      .eq('user_id', user.id);

    const { data: found } = await supabase
      .from('found_reports')
      .select('*')
      .eq('user_id', user.id);

    const merged = [
      ...(lost || []).map(r => ({ ...r, table: 'lost_reports' })),
      ...(found || []).map(r => ({ ...r, table: 'found_reports' }))
      ];

      setAllReports(
        merged.map(r => ({
          ...r,
          table: r.table, // lost_reports / found_reports
          type: r.table === 'lost_reports' ? 'lost' : 'found'
        }))
      );

  };




  useEffect(() => {
    if (!user) return;

    fetchReports();
  }, [user]);
  

  useEffect(() => {
    if (!user) return;

    allReports.forEach((report) => {
      if (report.status === 'pending') {
        checkMatchingAndNotify(
          report,
          report.table === 'lost_reports' ? 'lost' : 'found'
        );
      }
    });
  }, [allReports, user]);

  

  useEffect(() => {
    if (!user && !isGuest && currentScreen !== 'login') {
      setCurrentScreen('login');
    }
  }, [user, isGuest, currentScreen]);


  // Load persistent data on mount
 

  // Save reports whenever they change


  // Save chats whenever they change


  // Save current user whenever it changes
  

  

  // Handle Google login with real user data


  // Handle guest login
  const handleContinueAsGuest = () => {
    setIsGuest(true);
    setIsLoggedIn(false);
    setCurrentScreen('home');

  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentScreen('login');
  };


  // Save profile changes
  const handleSaveProfile = (updatedUser: UserProfile) => {
    setUser({
      ...user!,
      ...updatedUser
    });
  };

  // Navigation handlers
  const handleNavTabChange = (tab: NavTab) => {
    setActiveNavTab(tab);
    
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'chat') {
      setCurrentScreen('chat-list');
    } else if (tab === 'profile') {
      requireAuth('profile') && setCurrentScreen('profile');
    }
  };

  const handleCategorySelect = (category: string, type: 'lost' | 'found') => {
    setSelectedCategory(category);
    setCurrentScreen(type === 'lost' ? 'lost-form' : 'found-form');
  };

  const normalize = (text?: string) =>
  text?.toLowerCase().trim() || '';

  const calculateMatchScore = (a: any, b: any) => {
    let score = 0;

    // 🎯 FIELD UTAMA
    if (normalize(a.brand) && normalize(a.brand) === normalize(b.brand)) {
     score += 3;
    }

   if (normalize(a.model) && normalize(a.model) === normalize(b.model)) {
     score += 3;
   }

   if (normalize(a.color) && normalize(a.color) === normalize(b.color)) {
     score += 2;
   }

   // 📍 lokasi ringan
   if (normalize(a.location) === normalize(b.location)) {
     score += 1;
   }

   // 📝 bonus teks (ringan)
   if (a.characteristics && b.characteristics) {
     const aWords = normalize(a.characteristics).split(/\s+/);
     const bWords = normalize(b.characteristics);

     const common = aWords.filter(
       w => w.length > 4 && bWords.includes(w)
     );

     score += common.length;
   }

   return score;
 };




  const checkMatchingAndNotify = async (data: any, type: 'lost' | 'found') => {
    if (!user) return;
    if (data.status !== 'pending') return;


    const opponentTable =
      type === 'lost' ? 'found_reports' : 'lost_reports';

    const { data: candidates } = await supabase
      .from(opponentTable)
      .select('*')
      .eq('category', data.category)
      .neq('user_id', user.id); 

    if (!candidates || candidates.length === 0) {
      setCurrentScreen('no-match');
      return;
    }

    const matchedReports = candidates.filter((r) => {
      const score = calculateMatchScore(data, r);
      return score >= 2; // 🎯 threshold
    });

    if (matchedReports.length > 0) {
      await supabase.from(type === 'lost' ? 'lost_reports' : 'found_reports')
        .update({ status: 'matched' })
        .eq('id', data.id);

      await supabase.from(opponentTable)
        .update({ status: 'matched' })
        .in('id', matchedReports.map(r => r.id));

      const oppositeType = type === 'lost' ? 'temuan' : 'hilang';

      const opponentReport = matchedReports[0]; // ambil satu lawan utama
        setMatchedReport({
          ...opponentReport,
          table: opponentTable
        });


      const newNotification = {
        id: Date.now().toString(),
        type: 'match-found',
        message: `Ada laporan ${oppositeType} yang sangat cocok dengan laporan ${type} Anda`,
        timestamp: 'Baru saja',
        read: false
      };

      const updatedReport = {
      ...data,
      matchCount: matchedReports.length,
      status: 'matched'
    };

      setCurrentReport(updatedReport);

      setNotifications((prev) => [newNotification, ...prev]);
      setCurrentScreen('match-result');
    } else {
      setCurrentScreen('no-match');
    }
  };

  

  const isDuplicateReport = (
    newReport: Report,
    existingReports: Report[],
    userId: string
  ) => {
    return existingReports.some((r) => {
      if (r.user_id !== userId) return false;

      const sameCategory = r.category === newReport.category;
      const sameLocation = r.location === newReport.location;
      const sameTable = r.table === newReport.table;

      return sameCategory && sameLocation && sameTable;
    });
  };



  const handleSubmitReport = async (data: any, type: 'lost' | 'found') => {
    if (!user) return;

    //  CEK DUPLIKAT
    const tempReport: Report = {
      id: 'temp',
      user_id: user.id,
      category: data.category,
      characteristics: data.characteristics,
      location: data.location,
      date: data.date,
      status: 'pending',
      table: type === 'lost' ? 'lost_reports' : 'found_reports'
    };


    const duplicate = isDuplicateReport(
      tempReport,
      allReports,
      user.id
    );

    if (duplicate) {
      alert(
        'Anda sudah pernah melaporkan barang yang sama.\n' +
        'Laporan tidak disimpan.'
      );
      return;
    }

    // 🔵 INSERT KE SUPABASE
    const tableName =
      type === 'lost' ? 'lost_reports' : 'found_reports';

    const { data: inserted, error } = await supabase
      .from(tableName)
      .insert({
        user_id: user.id,
        category: data.category,
        brand: data.brand || null,
        model: data.model || null,
        color: data.color || null,
        characteristics: data.characteristics,
        location: data.location,
        date: data.date,
        photo: data.photo,
        status: 'pending'
      })

      .select()
      .single();
      
    const insertedWithTable = {
      ...inserted,
      table: tableName
    };

    if (error) {
      alert(error.message);
      return;
    }

    const reportWithType = {
      ...inserted,
      type, // 🔥 PENTING
    };

    const reportForMatching = {
      ...inserted,
      table: tableName,
      type
    };

    setAllReports(prev => [reportWithType, ...prev]);
    setCurrentReport(reportWithType);
    await checkMatchingAndNotify(reportForMatching, type);
  };

  

  const normalizeUsers = (a: string, b: string): [string, string] => {
    if (a === b) {
      throw new Error('Tidak boleh membuat chat dengan diri sendiri');
    }
    return a < b ? [a, b] : [b, a];
  };

  // Handle start chat from match result
  const handleStartChat = async () => {
    if (!currentReport || !matchedReport || !user) return;

    const otherUserId = matchedReport.user_id; // ✅ BENAR

    if (otherUserId === user.id) {
      alert('Tidak bisa chat dengan diri sendiri');
      return;
    }

    const [userA, userB] = normalizeUsers(user.id, otherUserId);

    let { data: thread } = await supabase
      .from('chat_threads')
      .select('*')
      .eq('user_a', userA)
      .eq('user_b', userB)
      .eq('report_id', currentReport.id)
      .maybeSingle();

    if (!thread) {
      const { data: created, error } = await supabase
        .from('chat_threads')
        .insert({
          user_a: userA,
          user_b: userB,
          report_id: currentReport.id
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      thread = created;
    }

    setCurrentChatId(thread.id);
    setCurrentScreen('chat-detail');
  };



  // Handle chat click from chat list
  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId);
    // Mark as read
    setChatThreads(chatThreads.map(c => 
      c.id === chatId ? { ...c, unread: false } : c
    ));
    setCurrentScreen('chat-detail');
  };

  // Storage management
  const handleClearStorage = async () => {
    if (!user) return;

    await supabase.from('lost_reports').delete().eq('user_id', user.id);
    await supabase.from('found_reports').delete().eq('user_id', user.id);
    await supabase.from('chat_messages').delete().eq('sender_id', user.id);
    await supabase.from('chat_threads').delete();

 
    setAllReports([]);
    setChatThreads([]);
    setNotifications([]);
  };

  // Delete report
  const handleDeleteReport = async (reportId: string) => {
    if (!user) {
      alert('Silakan login untuk menghapus laporan');
      return;
    }

    if (!confirm('Hapus laporan ini?')) return;

    const report = allReports.find(r => r.id === reportId);
    if (!report) return;

    // 🔥 DELETE KE TABLE YANG BENAR
    const { error } = await supabase
      .from(report.table) // lost_reports / found_reports
      .delete()
      .eq('id', reportId)
      .eq('user_id', user.id);

    if (error) {
      alert(error.message);
     return;
    }

    // 🔥 UPDATE STATE FRONTEND
    setAllReports(prev => prev.filter(r => r.id !== reportId));
  };


  const handleExportData = () => {
    const data = {
      reports: allReports,
      chats: chatThreads,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `losthere-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Show bottom nav on main screens
  const showBottomNav = 
    currentScreen === 'home' || 
    currentScreen === 'chat-list' || 
    currentScreen === 'profile';

  const unreadChatCount = chatThreads.filter(c => c.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Mobile Frame */}
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden relative" style={{ height: '812px' }}>
        {/* Login Screen */}
        {currentScreen === 'login' && (
          <LoginScreen
            onLoginWithGoogle={async () => {
            await supabase.auth.signInWithOAuth({
            provider: 'google'
          });
        }}
        onContinueAsGuest={handleContinueAsGuest}
      />

        )}

        {/* Home Screen */}
        {currentScreen === 'home' && (
          <HomeScreen
            onReportLost={() => setCurrentScreen('category-select-lost')}
            onReportFound={() => setCurrentScreen('category-select-found')}
            onOpenNotifications={() => setCurrentScreen('notifications')}
            onOpenHistory={() => setCurrentScreen('history')}
            notificationCount={notifications.filter(n => !n.read).length}
          />
        )}

        {/* Category Selection */}
        {currentScreen === 'category-select-lost' && (
          <CategorySelect
            type="lost"
            onBack={() => setCurrentScreen('home')}
            onSelectCategory={(category) => handleCategorySelect(category, 'lost')}
          />
        )}

        {currentScreen === 'category-select-found' && (
          <CategorySelect
            type="found"
            onBack={() => setCurrentScreen('home')}
            onSelectCategory={(category) => handleCategorySelect(category, 'found')}
          />
        )}

        {/* Report Forms */}
        {currentScreen === 'lost-form' && (
          <DynamicReportForm
            type="lost"
            category={selectedCategory}
            onBack={() => setCurrentScreen('category-select-lost')}
            onSubmit={(data) => handleSubmitReport(data, 'lost')}
          />
        )}

        {currentScreen === 'found-form' && (
          <DynamicReportForm
            type="found"
            category={selectedCategory}
            onBack={() => setCurrentScreen('category-select-found')}
            onSubmit={(data) => handleSubmitReport(data, 'found')}
          />
        )}

        {/* Match Results */}
        {currentScreen === 'match-result' && currentReport && (
          <MatchResult
            matchCount={currentReport.matchCount || 0}
            reportType={currentReport.table === 'lost_reports' ? 'lost' : 'found'}
            onStartChat={() => {
              if (isGuest) {
                setCurrentScreen('login');
              } else {
                handleStartChat();
              }
          }}
            onBackHome={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'no-match' && (
          <NoMatch
            onBackHome={() => setCurrentScreen('home')}
          />
        )}

        {/* Chat Screens */}
        {currentScreen === 'chat-list' && (
          <ChatListScreen
            chats={chatThreads}
            onChatClick={handleChatClick}
            isGuest={isGuest}
          />
        )}

        {currentScreen === 'chat-detail' && currentChatId && (
          <ChatScreen
            threadId={currentChatId}
            userName={chatThreads.find(c => c.id === currentChatId)?.userName || 'User'}
            itemType={chatThreads.find(c => c.id === currentChatId)?.itemType || 'Item'}
            reportType={currentReport?.table === 'lost_reports' ? 'lost' : 'found'}
            onBack={() => setCurrentScreen('chat-list')}
          />
        )}


        {/* Notifications */}
        {currentScreen === 'notifications' && (
          <NotificationScreen
            notifications={notifications}
            onBack={() => setCurrentScreen('home')}
            onNotificationClick={() => setCurrentScreen('match-result')}
          />
        )}

        {/* History */}
        {currentScreen === 'history' && (
          <HistoryScreen
            reports={allReports}
            onDeleteReport={handleDeleteReport}
            onBack={() => setCurrentScreen('home')}
            onReportClick={async (report) => {
              if (!user) return;

              const { data: thread } = await supabase
                .from('chat_threads')
                .select('*')
                .or(
                  `and(user_a.eq.${user.id},report_id.eq.${report.id}),
                  and(user_b.eq.${user.id},report_id.eq.${report.id})`
                )
                .maybeSingle();

              if (!thread) {
                alert('Chat belum tersedia');
                return;
              }

              setCurrentChatId(thread.id);
              setCurrentScreen('chat-detail');
            }}

          />

        )}

        {/* Profile */}
        {currentScreen === 'profile' && (
          <ProfileScreen
            isGuest={isGuest}
            user={user}
            reportCount={allReports.length}
            onLoginWithGoogle={() => setCurrentScreen('login')}
            onEditProfile={() => setCurrentScreen('edit-profile')}
            onViewReports={() => setCurrentScreen('history')}
            onNotificationSettings={() => {
              alert('Notification settings coming soon!');
            }}
            onStorageManagement={() => setCurrentScreen('storage-management')}
            onLogout={handleLogout}
          />
        )}

        {/* Edit Profile */}
        {currentScreen === 'edit-profile' && user && (
          <EditProfileScreen
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onSave={(updatedUser) => {
              handleSaveProfile(updatedUser);
              requireAuth('profile') && setCurrentScreen('profile');
            }}
          />
        )}

        


        {/* Storage Management */}
        {currentScreen === 'storage-management' && (
          <StorageManagementScreen
            onBack={() => setCurrentScreen('profile')}
            reportCount={allReports.length}
            chatCount={chatThreads.length}
            onClearStorage={handleClearStorage}
            onExportData={handleExportData}
          />
        )}

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            activeTab={activeNavTab}
            onTabChange={handleNavTabChange}
            unreadChatCount={unreadChatCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
