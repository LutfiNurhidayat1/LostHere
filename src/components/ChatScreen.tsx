import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react';
import { ChatBubble } from './ui/ChatBubble';
import { supabase } from '../lib/supabase';



interface ChatScreenProps {
  userName?: string;
  itemType?: string;
  reportType?: 'lost' | 'found';
  onBack: () => void;

  //  TAMBAHAN
  threadId: string;
  isTemplateChat?: boolean;
}



interface Message {
  id: string;
  text: string;
  image?: string;
  sender: 'user' | 'other';
  created_at: string; // ISO dari DB
}


export function ChatScreen({
  userName = 'User',
  itemType = 'Item',
  reportType,
  onBack,
  threadId,
  isTemplateChat = false
}: ChatScreenProps) {

  if (!threadId) {
    return null;
  }



  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setCurrentUserId(data.session.user.id);
      }
    });
  }, []);


  useEffect(() => {
    if (!threadId) return;

    let channel: any;

    const setupRealtime = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) return;

      const userId = data.session.user.id;
      setCurrentUserId(userId);

      channel = supabase
        .channel(`chat-${threadId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `thread_id=eq.${threadId}`
          },
          payload => {
            const m = payload.new as any;

            setMessages(prev => {
              if (prev.some(msg => msg.id === m.id)) return prev;

              const sender: Message['sender'] =
                m.sender_id === userId ? 'user' : 'other';

              return [...prev, {
                id: m.id,
                text: m.message,
                sender,
                created_at: m.created_at
              }].sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              );
            });
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, [threadId]);


  const loadMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });

    if (error) return;

    setMessages(
      data.map(m => ({
        id: m.id,
        text: m.message,
        sender: m.sender_id === userId ? 'user' : 'other',
        created_at: m.created_at
      }))
    );
  };



  useEffect(() => {
    if (!threadId || !currentUserId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setMessages(prev => {
        const map = new Map(prev.map(m => [m.id, m]));

        data.forEach(m => {
          map.set(m.id, {
            id: m.id,
            text: m.message,
            sender: m.sender_id === currentUserId ? 'user' : 'other',
            created_at: m.created_at
          });
        });

        return Array.from(map.values()).sort(
          (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
        );
      });

    };

    fetchMessages();
  }, [threadId, currentUserId]);




  const handleSend = async () => {
    if (!inputText.trim() || !currentUserId) return;

    const text = inputText;
    setInputText('');

    // 🔵 tampilkan langsung (optimistic, tapi dengan ID unik)
    const tempId = `temp-${Date.now()}`;

    setMessages(prev => [
      ...prev,
      {
        id: tempId,
        text,
        sender: 'user',
        created_at: new Date().toISOString()
      }
    ]);


    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        thread_id: threadId,
        sender_id: currentUserId,
        message: text
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    // 🔥 replace temp message dengan data asli dari DB
    setMessages(prev =>
      prev.map(m =>
        m.id === tempId
          ? {
              id: data.id,
              text: data.message,
              sender: 'user',
              created_at: data.created_at
            }
          : m
      )
    );

  };








  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage: Message = {
          id: Date.now().toString(),
          text: '',
          image: reader.result as string,
          sender: 'user',
          created_at: new Date().toISOString()
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const isLost = reportType === 'lost';

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <h2 className="text-gray-900">{userName}</h2>
            <p className="text-gray-500 text-sm">{itemType}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Info Banner */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-blue-700 text-sm text-center">
            🔒 Chat ini bersifat pribadi dan aman. Verifikasi barang sebelum membagikan info kontak pribadi.
          </p>
        </div>

        {isTemplateChat && messages.length === 0 && (
          <>
            <ChatBubble
              text="Hai! Saya rasa saya menemukan barang Anda."
              sender="other"
              timestamp=""
            />
            <ChatBubble
              text="Terima kasih! Bisa dijelaskan lebih detail?"
              sender="user"
              timestamp=""
            />
          </>
       )}


        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            text={message.text}
            image={message.image}
            sender={message.sender}
            timestamp={new Date(message.created_at).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          />
        ))}

      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-gray-100 bg-white">
        <div className="flex items-end gap-2">
          <label className="flex-shrink-0">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </div>
          </label>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}