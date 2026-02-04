<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const applications = ref([])
const isLoading = ref(false)
const error = ref('')

const loadApplications = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/jobseeker/applications')
    applications.value = response.data
  } catch (err) {
    console.error('Error loading applications:', err)
    error.value = 'Tải danh sách ứng tuyển thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const cancelApplication = async (applicationId) => {
  if (!confirm('Bạn có chắc chắn muốn hủy đơn ứng tuyển này không?')) {
    return
  }

  try {
    await api.delete(`/jobseeker/applications/${applicationId}`)
    applications.value = applications.value.filter(app => app.id !== applicationId)
    store.addNotification({
      type: 'success',
      message: 'Hủy đơn ứng tuyển thành công!'
    })
  } catch (err) {
    console.error('Error canceling application:', err)
    store.addNotification({
      type: 'error',
      message: 'Hủy đơn ứng tuyển thất bại. Vui lòng thử lại.'
    })
  }
}

onMounted(() => {
  loadApplications()
})
</script>

<template>
  <div class="applications">
    <div class="container">
      <div class="applications-header">
        <h1>Đơn ứng tuyển</h1>
        <p>Theo dõi trạng thái các đơn ứng tuyển của bạn</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="applications.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>Chưa có đơn ứng tuyển nào</h3>
          <p>Hãy bắt đầu tìm kiếm việc làm và ứng tuyển để có đơn ứng tuyển đầu tiên</p>
          <router-link to="/jobs" class="btn btn-primary">Tìm việc ngay</router-link>
        </div>
      </div>
      <div v-else class="applications-list">
        <div v-for="app in applications" :key="app.id" class="application-card">
          <div class="application-header">
            <div class="job-info">
              <h3>{{ app.jobTitle }}</h3>
              <p class="company">{{ app.companyName }}</p>
              <p class="job-details">{{ app.jobType }} • {{ app.jobLocation }}</p>
            </div>
            <div class="application-status" :class="app.status">
              <span class="status-dot"></span>
              <span class="status-text">{{ app.statusLabel }}</span>
            </div>
          </div>

          <div class="application-details">
            <div class="detail-item">
              <span class="label">Ngày ứng tuyển</span>
              <span class="value">{{ new Date(app.appliedAt).toLocaleDateString('vi-VN') }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">CV sử dụng</span>
              <span class="value">{{ app.cvTitle }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Lời nhắn</span>
              <span class="value">{{ app.coverLetter || 'Không có' }}</span>
            </div>

            <div v-if="app.responseAt" class="detail-item">
              <span class="label">Ngày phản hồi</span>
              <span class="value">{{ new Date(app.responseAt).toLocaleDateString('vi-VN') }}</span>
            </div>

            <div v-if="app.responseMessage" class="detail-item">
              <span class="label">Phản hồi</span>
              <span class="value response">{{ app.responseMessage }}</span>
            </div>
          </div>

          <div class="application-actions">
            <router-link :to="`/jobs/${app.jobId}`" class="btn btn-outline">Xem việc làm</router-link>
            <router-link :to="`/cv/${app.cvId}`" class="btn btn-outline">Xem CV</router-link>
            <button 
              v-if="app.status === 'pending'" 
              @click="cancelApplication(app.id)" 
              class="btn btn-danger"
            >
              Hủy ứng tuyển
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.applications {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.applications-header {
  margin-bottom: 3rem;
}

.applications-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.applications-header p {
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
  margin: 0 0 2rem 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.application-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.application-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.application-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.job-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.company {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-weight: 600;
}

.job-details {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.application-status {
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

.application-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.application-status.pending .status-dot {
  background-color: #f59e0b;
}

.application-status.accepted {
  background: #dcfce7;
  color: #166534;
}

.application-status.accepted .status-dot {
  background-color: #22c55e;
}

.application-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.application-status.rejected .status-dot {
  background-color: #ef4444;
}

.application-status.cancelled {
  background: #f3f4f6;
  color: #6b7280;
}

.application-status.cancelled .status-dot {
  background-color: #9ca3af;
}

.application-details {
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

.response {
  color: #6b7280;
  font-style: italic;
}

.application-actions {
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

@media (max-width: 768px) {
  .application-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .application-actions {
    flex-direction: column;
  }
}
</style>