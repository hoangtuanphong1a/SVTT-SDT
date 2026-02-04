<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const candidates = ref([])
const isLoading = ref(false)
const error = ref('')

const loadCandidates = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/employer/candidates')
    candidates.value = response.data
  } catch (err) {
    console.error('Error loading candidates:', err)
    error.value = 'Tải danh sách ứng viên thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCandidates()
})
</script>

<template>
  <div class="candidates">
    <div class="container">
      <div class="candidates-header">
        <h1>Ứng viên</h1>
        <p>Danh sách ứng viên đã ứng tuyển vào các vị trí của công ty</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="candidates.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>Chưa có ứng viên nào</h3>
          <p>Chưa có ứng viên nào ứng tuyển vào các vị trí của công ty bạn</p>
        </div>
      </div>
      <div v-else class="candidates-list">
        <div v-for="candidate in candidates" :key="candidate.id" class="candidate-card">
          <div class="candidate-header">
            <div class="candidate-info">
              <div class="candidate-avatar">
                {{ candidate.fullName.charAt(0) }}
              </div>
              <div class="candidate-details">
                <h4>{{ candidate.fullName }}</h4>
                <p class="job-title">{{ candidate.appliedJob }}</p>
                <p class="applied-date">Ứng tuyển: {{ new Date(candidate.appliedAt).toLocaleDateString('vi-VN') }}</p>
              </div>
            </div>
            <div class="candidate-status" :class="candidate.status">
              <span class="status-dot"></span>
              <span class="status-text">{{ candidate.statusLabel }}</span>
            </div>
          </div>

          <div class="candidate-details-info">
            <div class="detail-item">
              <span class="label">Email</span>
              <span class="value">{{ candidate.email }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">Số điện thoại</span>
              <span class="value">{{ candidate.phone }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Kinh nghiệm</span>
              <span class="value">{{ candidate.experience }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Học vấn</span>
              <span class="value">{{ candidate.education }}</span>
            </div>

            <div v-if="candidate.coverLetter" class="detail-item">
              <span class="label">Lời nhắn</span>
              <span class="value">{{ candidate.coverLetter }}</span>
            </div>
          </div>

          <div class="candidate-actions">
            <router-link :to="`/employer/candidates/${candidate.id}`" class="btn btn-primary">Xem hồ sơ</router-link>
            <button class="btn btn-outline">Liên hệ</button>
            <button class="btn btn-secondary">Xem CV</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.candidates {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.candidates-header {
  margin-bottom: 3rem;
}

.candidates-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.candidates-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
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
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.candidate-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.candidate-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.candidate-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.candidate-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.candidate-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.job-title {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.applied-date {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.candidate-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.candidate-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.candidate-status.pending .status-dot {
  background-color: #f59e0b;
}

.candidate-status.accepted {
  background: #dcfce7;
  color: #166534;
}

.candidate-status.accepted .status-dot {
  background-color: #22c55e;
}

.candidate-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.candidate-status.rejected .status-dot {
  background-color: #ef4444;
}

.candidate-details-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.value {
  color: #1f2937;
  font-weight: 500;
}

.candidate-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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

@media (max-width: 768px) {
  .candidate-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .candidate-actions {
    justify-content: flex-start;
  }
}
</style>