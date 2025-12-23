interface ChatBubbleProps {
  text: string;
  image?: string;
  sender: 'user' | 'other';
  timestamp: string;
}

export function ChatBubble({ text, image, sender, timestamp }: ChatBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Message Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          {image && (
            <img
              src={image}
              alt="Shared"
              className="rounded-xl mb-2 max-w-full"
            />
          )}
          {text && <p className="break-words">{text}</p>}
        </div>

        {/* Timestamp */}
        <span className="text-xs text-gray-400 mt-1 px-1">
          {timestamp}
        </span>
      </div>
    </div>
  );
}
