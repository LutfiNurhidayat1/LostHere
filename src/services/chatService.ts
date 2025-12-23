// src/services/chatService.ts
import type { Report } from '../App';
import type { ChatThread } from '../components/ChatListScreen';

export const createChatThreadFromReport = (
  report: Report
): ChatThread => ({
  id: report.id,
  userName: 'Match User',
  itemType: `${report.type} ${report.category}`,
  lastMessage: 'Chat started',
  timestamp: 'Just now',
  unread: false
});
