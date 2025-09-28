<template>
  <div class="chat-input-area">
    <div class="input-wrapper">
      <textarea
        v-model="inputText"
        @input="adjustTextareaHeight"
        @keydown.enter.prevent="sendMessage"
        placeholder="Ask anything or start voice input..."
        rows="1"
        ref="textarea"
        :disabled="isLoading"
      ></textarea>
      <button @click="toggleListen" :class="['tool-btn', 'mic-btn', { 'is-listening': isListening }]" :disabled="!hasVoiceQuota || isLoading" title="Voice to Text">
        <span class="icon">🎤</span>
      </button>
      <button @click="sendMessage" class="send-btn" :disabled="isLoading" title="Send">
        <span class="icon">➤</span>
      </button>
    </div>
    <p v-if="!hasVoiceQuota" class="quota-exceeded-msg">You have used all your voice-to-text minutes for this period.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from '../../stores/chat';
import { useUserStore } from '../../stores/user';
import { storeToRefs } from 'pinia';

const inputText = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);
const isListening = ref(false);
let listenStartTime: number | null = null;

const chatStore = useChatStore();
const userStore = useUserStore();
const { hasVoiceQuota } = storeToRefs(userStore);
const { isLoading } = storeToRefs(chatStore);

// Safely initialize SpeechRecognition
const recognition: SpeechRecognition | null = ('webkitSpeechRecognition' in window)
  ? new window.webkitSpeechRecognition()
  : null;

if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    let final_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }
    }
    inputText.value += final_transcript;
    adjustTextareaHeight();
  };

  recognition.onend = () => {
    if (isListening.value) {
      isListening.value = false;
      if (listenStartTime) {
        const durationSeconds = (Date.now() - listenStartTime) / 1000;
        userStore.incrementVoiceUsage(durationSeconds);
        listenStartTime = null;
      }
    }
  };
}

const toggleListen = () => {
  if (!recognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }
  if (!hasVoiceQuota.value) {
    alert("You've run out of voice-to-text minutes.");
    return;
  }

  if (isListening.value) {
    recognition.stop();
  } else {
    listenStartTime = Date.now();
    recognition.start();
    isListening.value = true;
  }
};

const adjustTextareaHeight = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  }
};

const sendMessage = () => {
  if (inputText.value.trim() && !isLoading.value) {
    chatStore.sendMessage(inputText.value.trim());
    inputText.value = '';
    adjustTextareaHeight();
  }
};
</script>

<style scoped>
.chat-input-area {
  padding: 15px 20px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  position: relative;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border-radius: 25px;
  padding: 5px 10px;
}

textarea {
  flex-grow: 1;
  border: none;
  background: none;
  resize: none;
  padding: 10px;
  font-size: 1rem;
  max-height: 150px;
  overflow-y: auto;
  outline: none;
}

textarea:disabled {
  background-color: #f0f2f5;
}

.tool-btn, .send-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 1.2rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.tool-btn:hover, .send-btn:hover {
  background-color: #e0e0e0;
}

.tool-btn:disabled, .send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mic-btn {
  color: #666;
}

.mic-btn.is-listening {
  color: #d93025;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(217, 48, 37, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(217, 48, 37, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(217, 48, 37, 0);
  }
}

.send-btn {
  color: #6c5ce7;
}

.send-btn .icon {
    display: inline-block;
    transform: rotate(-90deg);
}

.quota-exceeded-msg {
  font-size: 0.8rem;
  color: #d93025;
  text-align: center;
  padding-top: 5px;
}
</style>