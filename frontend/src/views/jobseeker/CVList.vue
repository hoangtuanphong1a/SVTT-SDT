<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const cvs = ref([])
const isLoading = ref(false)
const error = ref('')

const loadCVs = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/jobseeker/cvs')
    cvs.value = response.data
  } catch (err) {
    console.error('Error loading CVs:', err)
    error.value = 'Tải danh sách CV thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const deleteCV = async (cvId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa CV này không?')) {
    return
  }

  try {
    await api.delete(`/jobseeker/cvs/${cvId}`)
    cvs.value = cvs.value.filter(cv => cv.id !== cvId)
    store.addNotification({
      type: 'success',
      message: 'Xóa CV thành công!'
    })
  } catch (err) {
    console.error('Error deleting CV:', err)
    store.addNotification({
      type: 'error',
      message: 'Xóa CV thất bại. Vui lòng thử lại.'
    })
  }
}

onMounted(() => {
  loadCVs()
})
</script>

<template>
  <div class="cv-list">
    <div class="container">
      <div class="cv-header">
        <h1>Hồ sơ xin việc</h1>
        <p>Quản lý các CV của bạn và theo dõi trạng thái ứng tuyển</p>
        <router-link to="/cv/create" class="btn btn-primary">Tạo CV mới</router-link>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="cvs.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">📄</div>
          <h3>Chưa có CV nào</h3>
          <p>Hãy tạo CV đầu tiên của bạn để bắt đầu ứng tuyển</p>
          <router-link to="/cv/create" class="btn btn-primary">Tạo CV ngay</router-link>
        </div>
      </div>
      <div v-else class="cv-grid">
        <div v-for="cv in cvs" :key="cv.id" class="cv-card">
          <div class="cv-header-info">
            <h3>{{ cv.title }}</h3>
            <span class="cv-status" :class="cv.status">{{ cv.status }}</span>
          </div>
          
          <div class="cv-details">
            <div class="cv-meta">
              <span class="cv-date">Tạo: {{ new Date(cv.createdAt).toLocaleDateString('vi-VN') }}</span>
              <span class="cv-updated">Cập nhật: {{ new Date(cv.updatedAt).toLocaleDateString('vi-VN') }}</span>
            </div>
            
            <div class="cv-stats">
              <div class="stat">
                <span class="stat-label">Ứng tuyển</span>
                <span class="stat-value">{{ cv.applicationCount }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Lượt xem</span>
                <span class="stat-value">{{ cv.viewCount }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Tỷ lệ phản hồi</span>
                <span class="stat-value">{{ cv.responseRate }}%</span>
              </div>
            </div>
          </div>

          <div class="cv-actions">
            <router-link :to="`/cv/${cv.id}`" class="btn btn-outline">Xem chi tiết</router-link>
            <router-link :to="`/cv/${cv.id}/edit`" class="btn btn-secondary">Chỉnh sửa</router-link>
            <button @click="deleteCV(cv.id)" class="btn btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-list {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.cv-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.cv-header p {
  margin: 0.5rem 0 0 0;
  color: #6b7280;
  font-size: 1.1rem;
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

.btn-secondary {
  background-color: #374151;
  color: white;
}

.btn-secondary:hover {
  background-color: #1f2937;
}

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.loading,
.error-message,
.no-results {
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

.no-results {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 4rem;
}

.empty-state {
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
  margin: 0 0 2rem 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.cv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.cv-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  border: 1px solid #e5e7eb;
}

.cv-card:hover {
  transform: translateY(-5px);
  border-color: #d1d5db;
}

.cv-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.cv-header-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.cv-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.cv-status.active {
  background: #dcfce7;
  color: #166534;
}

.cv-status.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.cv-status.draft {
  background: #f3f4f6;
  color: #6b7280;
}

.cv-details {
  margin-bottom: 2rem;
}

.cv-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.cv-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.cv-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .cv-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .cv-grid {
    grid-template-columns: 1fr;
  }
  
  .cv-stats {
    grid-template-columns: 1fr;
  }
  
  .cv-actions {
    flex-direction: column;
  }
}
</style>