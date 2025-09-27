<template>
  <div class="chat-layout">
    <ChatSidebar :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main class="chat-main">
      <ChatWindow />
      <ChatInput />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useChatStore } from '../stores/chat';
import ChatSidebar from '../components/Chat/ChatSidebar.vue';
import ChatWindow from '../components/Chat/ChatWindow.vue';
import ChatInput from '../components/Chat/ChatInput.vue';

const isSidebarOpen = ref(true);
const chatStore = useChatStore();

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onMounted(() => {
  if (!chatStore.currentChat) {
    chatStore.startNewChat();
  }
});
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  overflow: hidden;
}

.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 768px) {
  .chat-layout {
    position: relative;
  }
}
</style>