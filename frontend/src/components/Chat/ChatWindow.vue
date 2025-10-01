<template>
  <div class="chat-window" ref="messagesWrapper">
    <ChatMessage
      v-for="(msg, index) in messages"
      :key="index"
      :message="msg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useChatStore } from '../../stores/chat';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import ChatMessage from './ChatMessage.vue';

const chatStore = useChatStore();
const router = useRouter();
const { currentMessages: messages } = storeToRefs(chatStore);

const messagesWrapper = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  if (messagesWrapper.value) {
    messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
  }
};

watch(messages, (newMessages) => {
  // Always scroll to the bottom when messages change
  nextTick(scrollToBottom);

  // Check if the last message is a quota-exceeded message
  const lastMessage = newMessages[newMessages.length - 1];
  if (lastMessage && lastMessage.isQuotaExceeded) {
    // Redirect after a delay to allow the user to read the message
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }
}, { deep: true });

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chat-window {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>