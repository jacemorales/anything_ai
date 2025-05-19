<template>
        <div class="app">
            <aside class="sidebar">
                <div class="logo">
                    <h1>Anything AI</h1>
                </div>
                <button @click="startNewChat" class="new-chat">
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
              <button @click.stop="editChat(chat)" class="action-btn edit-btn" title="Edit Chat">
                ✏️
              </button>
              <button @click.stop="deleteChat(chat.id)" class="action-btn delete-btn" title="Delete Chat">
                🗑️
              </button>
            </div>
                    </li>
                </ul>
        <div class="version">v1.3.3</div>
            </aside>

            <main class="chat-container">
                <div class="messages-wrapper" ref="messagesWrapper">
                    <div 
                        v-for="(msg, i) in currentMessages" 
                        :key="i" 
            class="message-container"
                    >
            <div :class="['bubble', msg.sender === 'user_search' ? 'user-bubble' : 'ai-bubble']">
                        <div class="message-content" :class="{ 'typing-animation': msg.sender === 'ai_results' && msg.isTyping }">
                        {{ msg.text }}
              </div>
            </div>
            <div class="tools">
              <button 
                v-if="msg.sender === 'ai_results'" 
                @click="copyToClipboard(msg.text, i)" 
                class="tool-btn"
                title="Copy to clipboard"
              >
                <span class="tool-icon">📋</span>
              </button>
              <button 
                v-if="msg.sender === 'user_search'" 
                @click="resendMessage(msg.text, i)" 
                class="tool-btn"
                title="Resend message"
              >
                <span class="tool-icon">🔄</span>
              </button>
            </div>
            <div v-if="msg.status" class="tools-status" :class="{ 'fade-out': msg.statusTimeout }">
              {{ msg.status }}
                    </div>
                    </div>
                        </div>
                        
                <div class="input-container">
                    <textarea
                        v-model="input"
                        @keydown="handleKey"
                        placeholder="Ask anything..."
                        rows="1"
                        style="overflow: hidden"
                    ></textarea>
                    <button @click="clearChat" class="clear-btn">
                        <span class="icon">🗑️</span>
                        Clear Chat
                    </button>
                </div>
            </main>
        </div>
</template>

  <script setup lang="ts">
  import { ref, computed, onMounted, watch, nextTick } from 'vue'
  
  interface Message {
    text: string
    sender: 'user_search' | 'ai_results'
    isTyping?: boolean
    status?: string
    statusTimeout?: boolean
  }
  
  interface Chat {
    id: number
    messages: Message[]
    title?: string
  }
  
  let chatIdCounter = 1
  const input = ref('')
  const chats = ref<Chat[]>([])
  const currentChatId = ref<number | null>(null)
  const messagesWrapper = ref<HTMLElement | null>(null)
  
                const startNewChat = () => {
    const id = chatIdCounter++
    chats.value.push({ id, messages: [], title: `Chat ${id}` })
    currentChatId.value = id
    addMessage("Hello! I'm Anything AI powered by Gemini. How can I help you today?", 'ai_results')
  }
  
                const currentMessages = computed(() => {
    return chats.value.find(c => c.id === currentChatId.value)?.messages || []
  })

  const addMessage = async (text: string, sender: 'user_search' | 'ai_results') => {
    const chat = chats.value.find(c => c.id === currentChatId.value)
                    if (chat) {
      const message: Message = { text, sender, isTyping: sender === 'ai_results' }
      chat.messages.push(message)
                        
      await nextTick()
      scrollToBottom()

                        if (sender === 'ai_results') {
        const wrapper = messagesWrapper.value
        const messageElement = wrapper?.lastElementChild?.querySelector('.message-content')
                            if (messageElement) {
          messageElement.textContent = ''
          messageElement.classList.add('typing-animation')
  
          const cursor = document.createElement('span')
          cursor.className = 'cursor'
          messageElement.appendChild(cursor)
  
          let i = 0
                                const typeWriter = () => {
                                    if (i < text.length) {
              try {
                const charNode = document.createTextNode(text.charAt(i))
                if (messageElement && cursor && messageElement.contains(cursor)) {
                  messageElement.insertBefore(charNode, cursor)
                  i++
                  // Calculate delay to complete in 2 seconds
                  const delay = 2000 / text.length
                  setTimeout(typeWriter, delay)
                } else {
                  // If cursor is not found, just append the text
                  messageElement.textContent = text
                  messageElement.classList.remove('typing-animation')
                  scrollToBottom()
                }
              } catch (err) {
                // Fallback if insertion fails
                messageElement.textContent = text
                messageElement.classList.remove('typing-animation')
                scrollToBottom()
              }
                                    } else {
              if (cursor && messageElement.contains(cursor)) {
                cursor.remove()
              }
              messageElement.classList.remove('typing-animation')
              scrollToBottom()
            }
          }
          typeWriter()
        }
      }
    }
  }

                const scrollToBottom = () => {
                    if (messagesWrapper.value) {
      messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight
    }
  }
  
  const switchChat = (id: number) => {
    currentChatId.value = id
  }

                const clearChat = () => {
    const chat = chats.value.find(c => c.id === currentChatId.value)
    if (chat) chat.messages = []
    addMessage("Hello! I'm Anything AI powered by Gemini. How can I help you today?", 'ai_results')
    
  }
  
  const handleKey = async (e: KeyboardEvent) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const text = input.value.trim()
      if (!text) return
  
      await addMessage(text, 'user_search')
      input.value = ''
      const loadingMessage = 'Thinking...'
      await addMessage(loadingMessage, 'ai_results')
  
      try {
        console.log('Sending request to Gemini API...')
        const response = await fetch(`${import.meta.env.VITE_G}?key=${import.meta.env.VITE_}tCI6XE0g`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: text
              }]
            }]
          }),
        })

                            if (!response.ok) {
          const errorData = await response.json()
          console.error('API Error:', errorData)
          throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        const chat = chats.value.find(c => c.id === currentChatId.value)
                                if (chat) {
          chat.messages.pop() // remove "Thinking..."
          await addMessage(reply || 'I had trouble understanding. Please try again.', 'ai_results')
        }
      } catch (err: any) {
        const chat = chats.value.find(c => c.id === currentChatId.value)
                            if (chat) {
          chat.messages.pop()
          await addMessage(`Error: ${err.message}`, 'ai_results')
                            }
                        }

      saveToStorage()
    }
                    }

                watch(currentMessages, () => {
    nextTick(scrollToBottom)
  }, { deep: true })
  
                onMounted(() => {
    const saved = localStorage.getItem('chatHistory')
                    if (saved) {
      const parsed = JSON.parse(saved)
      chats.value = parsed.chats || []
      currentChatId.value = parsed.currentChatId || chats.value[0]?.id
      chatIdCounter = chats.value.length + 1
                    } else {
      startNewChat()
                    }
    scrollToBottom()
  })

                const saveToStorage = () => {
                    localStorage.setItem('chatHistory', JSON.stringify({
                        chats: chats.value,
                        currentChatId: currentChatId.value
    }))
  }
  
  watch(chats, saveToStorage, { deep: true })
  
  const editChat = (chat: Chat) => {
    const newTitle = prompt('Enter new chat title:', chat.title || `Chat ${chat.id}`)
    if (newTitle && newTitle.trim()) {
      chat.title = newTitle.trim()
      saveToStorage()
    }
  }
  
  const deleteChat = (chatId: number) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      const index = chats.value.findIndex(c => c.id === chatId)
      if (index !== -1) {
        chats.value.splice(index, 1)
        if (currentChatId.value === chatId) {
          currentChatId.value = chats.value[0]?.id || null
          if (!currentChatId.value) {
            startNewChat()
          }
        }
        saveToStorage()
      }
    }
  }
  
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      const chat = chats.value.find(c => c.id === currentChatId.value)
      if (chat) {
        chat.messages[index].status = 'Copied!'
        setTimeout(() => {
          if (chat.messages[index]) {
            chat.messages[index].statusTimeout = true
            setTimeout(() => {
              if (chat.messages[index]) {
                chat.messages[index].status = undefined
                chat.messages[index].statusTimeout = false
              }
            }, 300)
          }
        }, 1000)
      }
    } catch (err) {
      const chat = chats.value.find(c => c.id === currentChatId.value)
      if (chat) {
        chat.messages[index].status = 'Failed to copy'
        setTimeout(() => {
          if (chat.messages[index]) {
            chat.messages[index].statusTimeout = true
            setTimeout(() => {
              if (chat.messages[index]) {
                chat.messages[index].status = undefined
                chat.messages[index].statusTimeout = false
              }
            }, 300)
          }
        }, 1000)
      }
    }
  }
  
  const resendMessage = async (text: string, index: number) => {
    const chat = chats.value.find(c => c.id === currentChatId.value)
    if (chat) {
      chat.messages[index].status = 'Reloading...'
    }
    
    const loadingMessage = 'Thinking...'
    await addMessage(loadingMessage, 'ai_results')

    try {
      console.log('Sending request to Gemini API...')
      const response = await fetch(`${import.meta.env.VITE_G}?key=${import.meta.env.VITE_}tCI6XE0g`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: text
            }]
          }]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`)
      }
      
      const data = await response.json()
      console.log('API Response:', data)
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (chat) {
        chat.messages.pop() // remove "Thinking..."
        await addMessage(reply || 'I had trouble understanding. Please try again.', 'ai_results')
        chat.messages[index].status = 'Reloaded!'
        setTimeout(() => {
          if (chat.messages[index]) {
            chat.messages[index].statusTimeout = true
            setTimeout(() => {
              if (chat.messages[index]) {
                chat.messages[index].status = undefined
                chat.messages[index].statusTimeout = false
              }
            }, 300)
          }
        }, 1000)
      }
    } catch (err: any) {
      if (chat) {
        chat.messages.pop()
        await addMessage(`Error: ${err.message}`, 'ai_results')
        chat.messages[index].status = 'Failed to reload'
        setTimeout(() => {
          if (chat.messages[index]) {
            chat.messages[index].statusTimeout = true
            setTimeout(() => {
              if (chat.messages[index]) {
                chat.messages[index].status = undefined
                chat.messages[index].statusTimeout = false
              }
            }, 300)
          }
        }, 1000)
      }
    }

    saveToStorage()
  }
    </script>

  <style scoped>
  .chat-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .chat-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .chat-title {
    margin-left: 10px;
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
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .action-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .edit-btn, .delete-btn {
    font-size: 14px;
  }
  
  .message-container {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }
  
  .bubble {
    padding: 10px 15px;
    border-radius: 10px;
    max-width: 80%;
  }
  
  .user-bubble {
    background-color: #2d2d2d;
    margin-left: auto;
  }
  
  .ai-bubble {
    background-color: #fafafa;
    margin-right: auto;
    color: #000000;
  }
  
  .tools {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  
  .tool-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tool-icon {
    font-size: 16px;
  }
  
  .tool-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
  
  .tool-btn:active {
    transform: scale(0.95);
  }
  
  .user-bubble + .tools {
    justify-content: flex-end;
  }
  
  .ai-bubble + .tools {
    justify-content: flex-start;
  }
  
  .tools-status {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .tools-status.fade-out {
    opacity: 0;
  }
  
  .user-bubble + .tools + .tools-status {
    text-align: right;
  }
  
  .ai-bubble + .tools + .tools-status {
    text-align: left;
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #1a1a1a;
    padding: 20px;
    width: 260px;
  }
  
  .version {
    margin-top: auto;
    padding: 10px;
    color: #666;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  @media (max-width:950px) {
  .sidebar {
    display: none;
  }
}
  </style>
  
