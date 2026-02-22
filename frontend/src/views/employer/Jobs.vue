<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import axios from 'axios'

const jobs = ref([])
const isLoading = ref(false)
const error = ref('')

const loadJobs = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:8080/api/jobs', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.data && response.data.data) {
      jobs.value = response.data.data.content || response.data.data || []
    }
  } catch (err) {
    console.error('Error loading jobs:', err)
    error.value = 'Tải danh sách việc làm thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const deleteJob = async (jobId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa việc làm này không?')) {
    return
  }

  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:8080/api/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    jobs.value = jobs.value.filter(job => job.id !== jobId)
    alert('Xóa việc làm thành công!')
  } catch (err) {
    console.error('Error deleting job:', err)
    alert('Xóa việc làm thất bại.')
  }
}

onMounted(() => {
  loadJobs()
})
</script>

<template>
  <div class="employer-jobs">
    <div class="container">
      <div class="jobs-header">
        <h1>Việc làm của công ty</h1>
        <p>Quản lý các tin tuyển dụng và theo dõi đơn ứng tuyển</p>
        <router-link to="/employer/jobs/create" class="btn btn-primary">Đăng việc làm mới</router-link>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="jobs.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">💼</div>
          <h3>Chưa có việc làm nào</h3>
          <p>Hãy đăng việc làm đầu tiên để tìm kiếm ứng viên phù hợp</p>
          <router-link to="/employer/jobs/create" class="btn btn-primary">Đăng việc làm</router-link>
        </div>
      </div>
      <div v-else class="jobs-list">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="job-header">
            <div class="job-info">
              <h3>{{ job.title }}</h3>
              <div class="job-meta">
                <span class="type">{{ job.type }}</span>
                <span class="location">{{ job.location }}</span>
                <span class="salary">{{ job.salary }}</span>
              </div>
            </div>
            <div class="job-status" :class="job.status">
              <span class="status-dot"></span>
              <span class="status-text">{{ job.statusLabel }}</span>
            </div>
          </div>
          
          <div class="job-details">
            <div class="detail-item">
              <span class="label">Ngày đăng</span>
              <span class="value">{{ new Date(job.createdAt).toLocaleDateString('vi-VN') }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">Hạn nộp</span>
              <span class="value">{{ new Date(job.deadline).toLocaleDateString('vi-VN') }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Số lượng ứng tuyển</span>
              <span class="value">{{ job.applicationCount }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Lượt xem</span>
              <span class="value">{{ job.viewCount }}</span>
            </div>
          </div>

          <div class="job-actions">
            <router-link :to="`/employer/jobs/${job.id}`" class="btn btn-outline">Xem chi tiết</router-link>
            <router-link :to="`/employer/jobs/${job.id}/edit`" class="btn btn-secondary">Chỉnh sửa</router-link>
            <button @click="deleteJob(job.id)" class="btn btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.employer-jobs {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.jobs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.jobs-header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.jobs-header p {
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

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.job-header {
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
}

.job-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.type,
.location,
.salary {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

.job-status {
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

.job-status.active {
  background: #dcfce7;
  color: #166534;
}

.job-status.active .status-dot {
  background-color: #22c55e;
}

.job-status.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.job-status.inactive .status-dot {
  background-color: #ef4444;
}

.job-status.expired {
  background: #f3f4f6;
  color: #6b7280;
}

.job-status.expired .status-dot {
  background-color: #9ca3af;
}

.job-details {
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

.job-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .jobs-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .job-actions {
    justify-content: flex-start;
  }
}
</style>