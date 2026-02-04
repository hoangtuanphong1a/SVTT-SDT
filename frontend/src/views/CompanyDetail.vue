<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import api from '../services/api'

const route = useRoute()
const company = ref(null)
const jobs = ref([])
const isLoading = ref(false)

const loadCompany = async () => {
  isLoading.value = true
  try {
    const response = await api.get(`/companies/${route.params.id}`)
    company.value = response.data
    
    // Load jobs from this company
    const jobsResponse = await api.get(`/companies/${route.params.id}/jobs`)
    jobs.value = jobsResponse.data
  } catch (error) {
    console.error('Error loading company:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCompany()
})
</script>

<template>
  <div class="company-detail">
    <div class="container">
      <div v-if="isLoading" class="loading">Đang tải...</div>
      
      <div v-else-if="!company" class="not-found">
        <h2>Không tìm thấy công ty</h2>
        <p>Công ty bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <router-link to="/companies" class="btn btn-primary">Quay lại danh sách công ty</router-link>
      </div>

      <div v-else class="company-content">
        <!-- Company Header -->
        <div class="company-header">
          <div class="company-info">
            <img :src="company.logo" :alt="company.name" class="company-logo" />
            <div class="company-details">
              <h1>{{ company.name }}</h1>
              <p class="industry">{{ company.industry }}</p>
              <div class="company-meta">
                <span class="size">{{ company.size }}</span>
                <span class="location">{{ company.location }}</span>
                <span class="website">
                  <a :href="company.website" target="_blank">{{ company.website }}</a>
                </span>
              </div>
            </div>
          </div>
          <div class="company-actions">
            <a :href="company.website" target="_blank" class="btn btn-primary">Truy cập website</a>
            <button class="btn btn-outline">Theo dõi công ty</button>
          </div>
        </div>

        <!-- Company Details -->
        <div class="company-details">
          <div class="details-grid">
            <div class="detail-section">
              <h3>Giới thiệu công ty</h3>
              <div class="content">
                <p v-for="desc in company.description.split('\n')" :key="desc">{{ desc }}</p>
              </div>
            </div>

            <div class="detail-section">
              <h3>Thông tin chi tiết</h3>
              <div class="content">
                <div class="info-grid">
                  <div class="info-item">
                    <strong>Địa chỉ:</strong>
                    <span>{{ company.address }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Quy mô:</strong>
                    <span>{{ company.size }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Thành lập:</strong>
                    <span>{{ company.foundedYear }}</span>
                  </div>
                  <div class="info-item">
                    <strong>Doanh thu:</strong>
                    <span>{{ company.revenue }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Company Culture -->
          <div class="culture-section">
            <h3>Văn hóa công ty</h3>
            <div class="culture-grid">
              <div v-for="culture in company.culture" :key="culture" class="culture-item">
                <span class="culture-icon">✓</span>
                <span class="culture-text">{{ culture }}</span>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div class="benefits-section">
            <h3>Phúc lợi</h3>
            <div class="benefits-grid">
              <div v-for="benefit in company.benefits" :key="benefit" class="benefit-item">
                <span class="benefit-icon">🎁</span>
                <span class="benefit-text">{{ benefit }}</span>
              </div>
            </div>
          </div>

          <!-- Jobs from this company -->
          <div class="jobs-section" v-if="jobs.length > 0">
            <h3>Việc làm tại {{ company.name }}</h3>
            <div class="jobs-grid">
              <div v-for="job in jobs" :key="job.id" class="job-card">
                <div class="job-header">
                  <h3>{{ job.title }}</h3>
                  <span class="salary">{{ job.salary }}</span>
                </div>
                <div class="job-meta">
                  <span class="type">{{ job.type }}</span>
                  <span class="experience">{{ job.experience }}</span>
                  <span class="location">{{ job.location }}</span>
                </div>
                <p class="job-description">{{ job.description }}</p>
                <div class="job-actions">
                  <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">Xem chi tiết</router-link>
                  <button v-if="store.isAuthenticated" class="btn btn-outline">Ứng tuyển</button>
                </div>
              </div>
            </div>
            <div class="view-all-jobs">
              <router-link :to="`/jobs?company=${company.id}`" class="btn btn-outline">Xem tất cả việc làm</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-detail {
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

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.company-info {
  display: flex;
  gap: 2rem;
}

.company-logo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  background: #e5e7eb;
  padding: 1rem;
}

.company-details h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.industry {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-weight: 600;
  font-size: 1.1rem;
}

.company-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.size,
.location {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

.website a {
  color: #667eea;
  text-decoration: none;
}

.website a:hover {
  text-decoration: underline;
}

.company-actions {
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

.btn-primary:hover {
  background-color: #5a67d8;
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

.culture-section,
.benefits-section {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.culture-section h3,
.benefits-section h3 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.culture-grid,
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.culture-item,
.benefit-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.375rem;
}

.culture-icon,
.benefit-icon {
  font-size: 1.25rem;
}

.culture-text,
.benefit-text {
  color: #374151;
  font-weight: 500;
}

.jobs-section {
  margin-bottom: 4rem;
}

.jobs-section h3 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.job-card:hover {
  transform: translateY(-5px);
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

.job-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.type,
.experience,
.location {
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

.view-all-jobs {
  text-align: center;
  padding: 2rem;
}

@media (max-width: 768px) {
  .company-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .culture-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>