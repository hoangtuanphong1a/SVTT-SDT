<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const savedJobs = ref([])
const isLoading = ref(false)
const error = ref('')

const loadSavedJobs = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/jobseeker/saved-jobs')
    savedJobs.value = response.data
  } catch (err) {
    console.error('Error loading saved jobs:', err)
    error.value = 'Tải danh sách việc làm đã lưu thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const unsaveJob = async (jobId) => {
  try {
    await api.delete(`/jobseeker/saved-jobs/${jobId}`)
    savedJobs.value = savedJobs.value.filter(job => job.id !== jobId)
    store.addNotification({
      type: 'success',
      message: 'Bỏ lưu việc làm thành công!'
    })
  } catch (err) {
    console.error('Error unsave job:', err)
    store.addNotification({
      type: 'error',
      message: 'Bỏ lưu việc làm thất bại. Vui lòng thử lại.'
    })
  }
}

onMounted(() => {
  loadSavedJobs()
})
</script>

<template>
  <div class="saved-jobs">
    <div class="container">
      <div class="saved-jobs-header">
        <h1>Việc làm đã lưu</h1>
        <p>Danh sách các việc làm bạn đã lưu để ứng tuyển sau</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="savedJobs.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h3>Chưa có việc làm nào được lưu</h3>
          <p>Hãy tìm kiếm việc làm và lưu lại những công việc bạn quan tâm</p>
          <router-link to="/jobs" class="btn btn-primary">Tìm việc ngay</router-link>
        </div>
      </div>
      <div v-else class="jobs-grid">
        <div v-for="job in savedJobs" :key="job.id" class="job-card">
          <div class="job-header">
            <h3>{{ job.title }}</h3>
            <span class="salary">{{ job.salary }}</span>
          </div>
          <div class="job-company">
            <span>{{ job.companyName }}</span>
            <span class="location">{{ job.location }}</span>
          </div>
          <div class="job-meta">
            <span class="type">{{ job.type }}</span>
            <span class="experience">{{ job.experience }}</span>
            <span class="saved-date">Lưu: {{ new Date(job.savedAt).toLocaleDateString('vi-VN') }}</span>
          </div>
          <p class="job-description">{{ job.description }}</p>
          <div class="job-actions">
            <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">Xem chi tiết</router-link>
            <button @click="unsaveJob(job.id)" class="btn btn-outline">Bỏ lưu</button>
            <router-link :to="`/jobs/${job.id}`" class="btn btn-secondary">Ứng tuyển</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.saved-jobs {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.saved-jobs-header {
  margin-bottom: 3rem;
}

.saved-jobs-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.saved-jobs-header p {
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

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
  transform: translateY(-5px);
  border-color: #d1d5db;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.job-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.salary {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
}

.job-company {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #6b7280;
}

.location {
  font-weight: 600;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.type,
.experience,
.saved-date {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

.job-description {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.job-actions {
  display: flex;
  gap: 1rem;
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
  .job-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>