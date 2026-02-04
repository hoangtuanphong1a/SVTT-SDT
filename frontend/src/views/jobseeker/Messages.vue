<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const conversations = ref([])
const selectedConversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const isLoading = ref(false)
const error = ref('')

const loadConversations = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/jobseeker/conversations')
    conversations.value = response.data
  } catch (err) {
    console.error('Error loading conversations:', err)
    error.value = 'Tải danh sách cuộc trò chuyện thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const loadMessages = async (conversationId) => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get(`/jobseeker/conversations/${conversationId}/messages`)
    messages.value = response.data
    selectedConversation.value = conversations.value.find(c => c.id === conversationId)
  } catch (err) {
    console.error('Error loading messages:', err)
    error.value = 'Tải tin nhắn thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedConversation.value) {
    return
  }

  try {
    await api.post(`/jobseeker/conversations/${selectedConversation.value.id}/messages`, {
      content: newMessage.value
    })
    
    newMessage.value = ''
    loadMessages(selectedConversation.value.id) // Reload messages
  } catch (err) {
    console.error('Error sending message:', err)
    store.addNotification({
      type: 'error',
      message: 'Gửi tin nhắn thất bại. Vui lòng thử lại.'
    })
  }
}

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  loadMessages(conversation.id)
}

onMounted(() => {
  loadConversations()
})
</script>

<template>
  <div class="messages">
    <div class="container">
      <div class="messages-header">
        <h1>Tin nhắn</h1>
        <p>Trò chuyện với nhà tuyển dụng về các cơ hội việc làm</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="messages-layout">
        <!-- Conversations List -->
        <div class="conversations-sidebar">
          <div class="conversations-header">
            <h3>Cuộc trò chuyện</h3>
          </div>
          <div class="conversations-list">
            <div 
              v-for="conversation in conversations" 
              :key="conversation.id" 
              class="conversation-item"
              :class="{ active: selectedConversation?.id === conversation.id }"
              @click="selectConversation(conversation)"
            >
              <div class="conversation-info">
                <div class="company-avatar">
                  {{ conversation.companyName.charAt(0) }}
                </div>
                <div class="conversation-details">
                  <h4>{{ conversation.companyName }}</h4>
                  <p class="job-title">{{ conversation.jobTitle }}</p>
                  <p class="last-message">{{ conversation.lastMessage }}</p>
                </div>
              </div>
              <div class="conversation-meta">
                <span class="message-time">{{ new Date(conversation.lastMessageAt).toLocaleDateString('vi-VN') }}</span>
                <span v-if="conversation.unreadCount > 0" class="unread-badge">{{ conversation.unreadCount }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="messages-content">
          <div v-if="!selectedConversation" class="empty-state">
            <div class="empty-icon">💬</div>
            <h3>Chọn một cuộc trò chuyện</h3>
            <p>Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu trò chuyện</p>
          </div>
          
          <div v-else class="message-thread">
            <div class="message-header">
              <div class="thread-info">
                <div class="company-avatar large">
                  {{ selectedConversation.companyName.charAt(0) }}
                </div>
                <div class="thread-details">
                  <h3>{{ selectedConversation.companyName }}</h3>
                  <p class="job-title">{{ selectedConversation.jobTitle }}</p>
                </div>
              </div>
            </div>

            <div class="messages-list">
              <div v-for="message in messages" :key="message.id" class="message">
                <div class="message-avatar">
                  {{ message.senderType === 'employer' ? selectedConversation.companyName.charAt(0) : store.user?.fullName?.charAt(0) }}
                </div>
                <div class="message-content">
                  <div class="message-bubble" :class="{ 'sent': message.senderType === 'jobseeker' }">
                    <p>{{ message.content }}</p>
                    <span class="message-time">{{ new Date(message.createdAt).toLocaleTimeString('vi-VN') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="message-input">
              <input 
                v-model="newMessage" 
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="Nhập tin nhắn..."
              />
              <button @click="sendMessage" class="btn btn-primary">Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.messages {
  padding: 2rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.messages-header {
  margin-bottom: 3rem;
}

.messages-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.messages-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.loading,
.error-message {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
}

.messages-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  height: 70vh;
}

.conversations-sidebar {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.conversations-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.conversations-header h3 {
  margin: 0;
  color: #1f2937;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversation-item:hover {
  background-color: #f9fafb;
}

.conversation-item.active {
  background-color: #eff6ff;
  border-left: 4px solid #667eea;
}

.conversation-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.company-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.company-avatar.large {
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
}

.conversation-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.job-title {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.last-message {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.conversation-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.message-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.unread-badge {
  background: #ef4444;
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.messages-content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.message-thread {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thread-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.thread-details h3 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.message-bubble {
  background: #eff6ff;
  color: #1f2937;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message-bubble.sent {
  background: #667eea;
  color: white;
  margin-left: auto;
}

.message-bubble p {
  margin: 0;
  line-height: 1.4;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.8;
  align-self: flex-end;
}

.message-input {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
}

.message-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
}

.message-input input:focus {
  border-color: #667eea;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

@media (max-width: 1024px) {
  .messages-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .conversations-sidebar {
    height: 300px;
  }
  
  .messages-content {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .message-bubble {
    max-width: 80%;
  }
}
</style>