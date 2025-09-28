import { defineStore } from 'pinia';

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
  showUpgradeModal: boolean;
}

let nextChatId = 1;

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    chats: [],
    currentChatId: null,
    isLoading: false,
    showUpgradeModal: false,
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
    openUpgradeModal() {
      this.showUpgradeModal = true;
    },
    closeUpgradeModal() {
      this.showUpgradeModal = false;
    },
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

      const token = localStorage.getItem('authToken');

      try {
        const response = await fetch('http://localhost:3000/api/ai/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ prompt: text }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 429) {
            // Push the error message and open the upgrade modal
            this.currentChat.messages.push({ text: data.error, sender: 'ai' });
            this.openUpgradeModal();
          } else {
            throw new Error(data.error || 'An error occurred');
          }
        } else {
          this.currentChat.messages.push({ text: data.reply, sender: 'ai' });
        }

      } catch (error: any) {
        console.error("Failed to get response from backend", error);
        this.currentChat.messages.push({ text: error.message || "Sorry, something went wrong.", sender: 'ai' });
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