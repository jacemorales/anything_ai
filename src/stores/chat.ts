import { defineStore } from 'pinia';
import { GeminiService } from '../services/GeminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  currentChatId: number | null;
  isLoading: boolean;
}

let nextChatId = 1;

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chats: [],
    currentChatId: null,
    isLoading: false,
  }),
  getters: {
    currentChat: (state) => {
      return state.chats.find(c => c.id === state.currentChatId);
    },
    currentMessages: (state) => {
      const chat = state.chats.find(c => c.id === state.currentChatId);
      return chat ? chat.messages : [];
    },
  },
  actions: {
    startNewChat() {
      const newChat: Chat = {
        id: nextChatId++,
        title: `Chat ${nextChatId - 1}`,
        messages: [{ text: "Hello! I'm Anything AI. How can I help you today?", sender: 'ai' }],
      };
      this.chats.push(newChat);
      this.currentChatId = newChat.id;
    },
    async sendMessage(text: string) {
      if (!this.currentChat) return;

      this.currentChat.messages.push({ text, sender: 'user' });
      this.isLoading = true;

      try {
        const response = await GeminiService.generateContent(text);
        this.currentChat.messages.push(response);
      } catch (error) {
        console.error("Failed to get response from GeminiService", error);
        this.currentChat.messages.push({ text: "Sorry, something went wrong.", sender: 'ai' });
      } finally {
        this.isLoading = false;
      }
    },
    switchChat(chatId: number) {
      this.currentChatId = chatId;
    },
    deleteChat(chatId: number) {
      this.chats = this.chats.filter(c => c.id !== chatId);
      if (this.currentChatId === chatId) {
        this.currentChatId = this.chats[0]?.id || null;
      }
    },
    renameChat(chatId: number, newTitle: string) {
      const chat = this.chats.find(c => c.id === chatId);
      if (chat) {
        chat.title = newTitle;
      }
    }
  },
});