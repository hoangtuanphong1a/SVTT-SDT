<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import api from '../services/api'

const route = useRoute()
const job = ref(null)
const isLoading = ref(false)
const isApplied = ref(false)

const loadJob = async () => {
  isLoading.value = true
  try {
    const response = await api.get(`/jobs/${route.params.id}`)
    job.value = response.data
  } catch (error) {
    console.error('Error loading job:', error)
  } finally {
    isLoading.value = false
  }
}

const applyForJob = async () => {
  if (!store.isAuthenticated) {
    // Redirect to login
    return
  }
  
  try {
    await api.post(`/jobs/${job.value.id}/apply`)
    isApplied.value = true
    store.addNotification({
      type: 'success',
      message: 'Ứng tuyển thành công!'
    })
  } catch (error) {
    console.error('Error applying for job:', error)
    store.addNotification({
      type: 'error',
      message: 'Có lỗi xảy ra khi ứng tuyển'
    })
  }
}

const saveJob = async () => {
  if (!store.isAuthenticated) {
    // Redirect to login
    return
  }
  
  try {
    await api.post(`/jobs/${job.value.id}/save`)
    store.addNotification({
      type: 'success',
      message: 'Lưu việc làm thành công!'
    })
  } catch (error) {
    console.error('Error saving job:', error)
    store.addNotification({
      type: 'error',
      message: 'Có lỗi xảy ra khi lưu việc làm'
    })
  }
}

onMounted(() => {
  loadJob()
})
</script>

<template>
  <div class="job-detail">
    <div class="container">
      <div v-if="isLoading" class="loading">Đang tải...</div>
      
      <div v-else-if="!job" class="not-found">
        <h2>Không tìm thấy việc làm</h2>
        <p>Việc làm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <router-link to="/jobs" class="btn btn-primary">Quay lại danh sách việc làm</router-link>
      </div>

      <div v-else class="job-content">
        <!-- Job Header -->
        <div class="job-header">
          <div class="job-info">
            <h1>{{ job.title }}</h1>
            <div class="job-meta">
              <span class="company">{{ job.companyName }}</span>
              <span class="location">{{ job.location }}</span>
              <span class="type">{{ job.type }}</span>
              <span class="experience">{{ job.experience }}</span>
            </div>
            <div class="job-salary">
              <span class="salary">{{ job.salary }}</span>
            </div>
          </div>
          <div class="job-actions">
            <button @click="applyForJob" :disabled="isApplied" class="btn btn-primary">
              {{ isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay' }}
            </button>
            <button @click="saveJob" class="btn btn-outline">Lưu việc làm</button>
          </div>
        </div>

        <!-- Job Details -->
        <div class="job-details">
          <div class="details-grid">
            <div class="detail-section">
              <h3>Mô tả công việc</h3>
              <div class="content">
                <p v-for="desc in job.description.split('\n')" :key="desc">{{ desc }}</p>
              </div>
            </div>

            <div class="detail-section">
              <h3>Yêu cầu công việc</h3>
              <div class="content">
                <ul>
                  <li v-for="requirement in job.requirements" :key="requirement">{{ requirement }}</li>
                </ul>
              </div>
            </div>

            <div class="detail-section">
              <h3>Quyền lợi</h3>
              <div class="content">
                <ul>
                  <li v-for="benefit in job.benefits" :key="benefit">{{ benefit }}</li>
                </ul>
              </div>
            </div>

            <div class="detail-section">
              <h3>Thông tin công việc</h3>
              <div class="content">
                <div class="info-grid">
                  <div class="info-item">
                    <strong>Ngành nghề:</strong>
                    <span>{{ job.category }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Cấp bậc:</strong>
                    <span>{{ job.level }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Số lượng tuyển:</strong>
                    <span>{{ job.quantity }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Hạn nộp hồ sơ:</strong>
                    <span>{{ new Date(job.deadline).toLocaleDateString('vi-VN') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div class="company-info">
            <h3>Thông tin công ty</h3>
            <div class="company-card">
              <div class="company-header">
                <img :src="job.companyLogo" :alt="job.companyName" class="company-logo" />
                <div class="company-details">
                  <h4>{{ job.companyName }}</h4>
                  <p>{{ job.companyDescription }}</p>
                </div>
              </div>
              <div class="company-stats">
                <div class="stat">
                  <span class="label">Quy mô</span>
                  <span class="value">{{ job.companySize }}</span>
                </div>
                <div class="stat">
                  <span class="label">Địa chỉ</span>
                  <span class="value">{{ job.companyAddress }}</span>
                </div>
                <div class="stat">
                  <span class="label">Website</span>
                  <span class="value">{{ job.companyWebsite }}</span>
                </div>
              </div>
              <router-link :to="`/companies/${job.companyId}`" class="btn btn-outline">Xem công ty</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.job-detail {
  padding: 2rem 0;
}

.loading,
.not-found {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.not-found h2 {
  margin-bottom: 1rem;
  color: #1f2937;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.job-info h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.company,
.location,
.type,
.experience {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

.job-salary {
  margin-bottom: 1rem;
}

.salary {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1.25rem;
}

.job-actions {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a67d8;
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
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

.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.detail-section {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.detail-section h3 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.content p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #6b7280;
}

.content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.content li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #6b7280;
}

.content li:last-child {
  border-bottom: none;
}

.content li::before {
  content: '✓';
  color: #10b981;
  font-weight: bold;
  margin-right: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item strong {
  color: #374151;
  font-weight: 600;
}

.info-item span {
  color: #6b7280;
}

.company-info {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.company-info h3 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.company-card {
  padding: 2rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.company-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.company-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  background: #e5e7eb;
  padding: 0.5rem;
}

.company-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.company-details p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.company-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: white;
  padding: 1rem;
  border-radius: 0.375rem;
  text-align: center;
}

.label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 600;
  color: #1f2937;
}

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .company-stats {
    grid-template-columns: 1fr;
  }
}
</style>