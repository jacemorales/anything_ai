<template>
  <div class="chat-layout">
    <ChatSidebar :is-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />
    <main class="chat-main">
      <ChatWindow />
      <ChatInput />
    </main>
    <Modal v-if="showUpgradeModal" @close="chatStore.closeUpgradeModal">
      <SubscriptionView :is-modal="true" @plan-selected="handlePlanSelected" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useChatStore } from '../stores/chat';
import { storeToRefs } from 'pinia';
import ChatSidebar from '../components/Chat/ChatSidebar.vue';
import ChatWindow from '../components/Chat/ChatWindow.vue';
import ChatInput from '../components/Chat/ChatInput.vue';
import Modal from '../components/Modal.vue';
import SubscriptionView from './SubscriptionView.vue';

const isSidebarOpen = ref(true);
const chatStore = useChatStore();
const { showUpgradeModal } = storeToRefs(chatStore);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handlePlanSelected = () => {
    // Here you might want to refresh user data or perform other actions
    chatStore.closeUpgradeModal();
}

onMounted(() => {
  // A user should already be authenticated to see this page.
  // We can start a new chat if they don't have one.
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