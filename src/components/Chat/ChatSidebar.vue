<template>
  <aside :class="['sidebar', { 'is-open': isOpen }]">
    <div class="sidebar-header">
      <h1 class="logo">Anything AI</h1>
      <button @click="$emit('toggle-sidebar')" class="toggle-btn">
        <span class="icon">{{ isOpen ? '‹' : '›' }}</span>
      </button>
    </div>
    <button @click="startNewChat" class="new-chat-btn">
      <span class="icon">+</span> New Chat
    </button>
    <ul class="chat-list">
      <li
        v-for="chat in chats"
        :key="chat.id"
        :class="{ active: chat.id === currentChatId }"
        @click="switchChat(chat.id)"
        class="chat-item"
      >
        <span class="chat-icon">💬</span>
        <span class="chat-title">{{ chat.title || `Chat ${chat.id}` }}</span>
        <div class="chat-actions">
          <button @click.stop="editChat(chat)" class="action-btn" title="Edit">✏️</button>
          <button @click.stop="deleteChat(chat.id)" class="action-btn" title="Delete">🗑️</button>
        </div>
      </li>
    </ul>
    <div class="sidebar-footer">
      <span class="version">v2.0.0</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useChatStore } from '../../stores/chat';
import { storeToRefs } from 'pinia';

defineProps<{
  isOpen: boolean;
}>();

defineEmits(['toggle-sidebar']);

const chatStore = useChatStore();
const { chats, currentChatId } = storeToRefs(chatStore);

const startNewChat = () => chatStore.startNewChat();
const switchChat = (id: number) => chatStore.switchChat(id);
const deleteChat = (id: number) => {
  if (confirm('Are you sure you want to delete this chat?')) {
    chatStore.deleteChat(id);
  }
};
const editChat = (chat: { id: number, title: string }) => {
  const newTitle = prompt('Enter new chat title:', chat.title);
  if (newTitle && newTitle.trim()) {
    chatStore.renameChat(chat.id, newTitle.trim());
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #1a1a1a;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  padding: 20px;
  transition: width 0.3s ease;
  flex-shrink: 0;
}

.sidebar.is-open {
  width: 280px;
}

.sidebar:not(.is-open) {
  width: 80px;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    z-index: 1000;
    left: -280px;
    transition: left 0.3s ease;
  }
  .sidebar.is-open {
    left: 0;
  }
}


.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.toggle-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
}

.new-chat-btn {
  background-color: #6c5ce7;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  transition: background-color 0.2s;
}

.new-chat-btn:hover {
  background-color: #5a4cdb;
}

.chat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.chat-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-item.active {
  background-color: #6c5ce7;
}

.chat-icon {
  margin-right: 12px;
}

.chat-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-actions {
  display: none;
  position: absolute;
  right: 10px;
  gap: 8px;
}

.chat-item:hover .chat-actions {
  display: flex;
}

.action-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.action-btn:hover {
  opacity: 1;
}

.sidebar-footer {
  margin-top: auto;
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: #888;
}
</style>