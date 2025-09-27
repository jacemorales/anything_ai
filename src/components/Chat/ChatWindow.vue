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
import ChatMessage from './ChatMessage.vue';

const chatStore = useChatStore();
const { currentMessages: messages } = storeToRefs(chatStore);

const messagesWrapper = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  if (messagesWrapper.value) {
    messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
  }
};

watch(messages, () => {
  nextTick(scrollToBottom);
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