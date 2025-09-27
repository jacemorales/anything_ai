<template>
  <div :class="['message-container', message.sender === 'user' ? 'user-message' : 'ai-message']">
    <div class="bubble">
      <div class="message-content" v-html="formattedText"></div>
      <div v-if="message.sender === 'ai' && message.isTyping" class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
    <div class="message-tools" v-if="!message.isTyping && !message.isQuotaExceeded">
      <button class="tool-btn" @click="copyToClipboard" title="Copy">📋</button>
      <button class="tool-btn" v-if="message.sender === 'user'" @click="resendMessage" title="Resend">🔄</button>
    </div>
    <div v-if="message.isQuotaExceeded" class="upgrade-prompt">
      <button @click="goToSubscriptions" class="upgrade-btn">Upgrade Plan</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
  isQuotaExceeded?: boolean;
}

const props = defineProps<{
  message: Message;
}>();

const router = useRouter();

const formattedText = computed(() => {
  // A simple formatter for demonstration.
  // In a real app, you might use a library like marked.js for markdown.
  return props.message.text.replace(/\n/g, '<br>');
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.message.text);
  // Add some user feedback here
};

const resendMessage = () => {
  // Emit an event to resend the message
};

const goToSubscriptions = () => {
  router.push('/');
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.user-message {
  align-self: flex-end;
  align-items: flex-end;
}

.ai-message {
  align-self: flex-start;
  align-items: flex-start;
}

.bubble {
  padding: 12px 18px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.5;
}

.user-message .bubble {
  background-color: #6c5ce7;
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.ai-message .bubble {
  background-color: #ffffff;
  color: #1a1a1a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-bottom-left-radius: 4px;
}

.message-content {
  font-size: 1rem;
}

.message-tools {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.message-container:hover .message-tools {
  opacity: 1;
}

.tool-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
}

.tool-btn:hover {
  color: #000;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #999;
  border-radius: 50%;
  display: inline-block;
  animation: wave 1.3s infinite;
}

.typing-indicator span:nth-of-type(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-of-type(3) {
  animation-delay: 0.4s;
}

@keyframes wave {
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-8px);
  }
}

.upgrade-prompt {
  margin-top: 10px;
}

.upgrade-btn {
  background-color: #fdab42;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upgrade-btn:hover {
  background-color: #f39c12;
}
</style>