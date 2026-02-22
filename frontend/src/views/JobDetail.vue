<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const job = ref(null)
const isLoading = ref(false)
const isApplied = ref(false)
const relatedJobs = ref([])

const loadJob = async () => {
  isLoading.value = true
  try {
    const response = await api.get(`/jobs/${route.params.id}`)
    job.value = response.data
    
    // Load related jobs
    try {
      const relatedResponse = await api.get(`/jobs?category=${job.value.category}&limit=4`)
      relatedJobs.value = relatedResponse.data.filter(j => j.id !== job.value.id).slice(0, 4)
    } catch (e) {
      console.error('Error loading related jobs:', e)
    }
  } catch (error) {
    console.error('Error loading job:', error)
  } finally {
    isLoading.value = false
  }
}

const formatSalary = (salary) => {
  if (!salary) return 'Thỏa thuận'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumSignificantDigits: 3 }).format(salary) + '/tháng'
}

const applyForJob = async () => {
  if (!store.isAuthenticated) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }
  
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.role !== 'JOB_SEEKER') {
    store.addNotification({
      type: 'error',
      message: 'Chỉ có ứng viên mới có thể ứng tuyển'
    })
    return
  }
  
  try {
    await api.post(`/jobs/${job.value.id}/apply`)
    isApplied.value = true
    store.addNotification({
      type: 'success',
      message: 'Ứng tuyển thành công!'
    })
    router.push('/my-applications')
  } catch (error) {
    console.error('Error applying for job:', error)
    store.addNotification({
      type: 'error',
      message: error.response?.data?.message || 'Có lỗi xảy ra khi ứng tuyển'
    })
  }
}

const saveJob = async () => {
  if (!store.isAuthenticated) {
    router.push({ path: '/login', query: { redirect: route.fullPath } })
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

const shareJob = () => {
  if (navigator.share) {
    navigator.share({
      title: job.value.title,
      text: `Việc làm ${job.value.title} tại ${job.value.companyName}`,
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    store.addNotification({
      type: 'success',
      message: 'Đã sao chép link việc làm!'
    })
  }
}

const jobTypeColors = {
  'Full-time': { bg: 'bg-green-100', text: 'text-green-700' },
  'Part-time': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Remote': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Internship': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Contract': { bg: 'bg-orange-100', text: 'text-orange-700' }
}

const currentJobTypeColor = computed(() => {
  if (!job.value) return { bg: 'bg-gray-100', text: 'text-gray-700' }
  return jobTypeColors[job.value.type] || { bg: 'bg-gray-100', text: 'text-gray-700' }
})

onMounted(() => {
  loadJob()
})
</script>

<template>
  <div class="job-detail-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Đang tải thông tin việc làm...</p>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!job" class="not-found-container">
      <div class="not-found-icon">🔍</div>
      <h2>Không tìm thấy việc làm</h2>
      <p>Việc làm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
      <router-link to="/jobs" class="btn btn-primary">
        <span>←</span> Quay lại danh sách việc làm
      </router-link>
    </div>

    <!-- Job Detail Content -->
    <div v-else class="job-detail-content">
      <!-- Hero Banner -->
      <div class="job-hero">
        <div class="hero-bg"></div>
        <div class="container">
          <div class="job-hero-content">
            <div class="company-badge" v-if="job.featured">
              <span>🔥</span> Việc làm nổi bật
            </div>
            
            <div class="job-main-info">
              <div class="job-header-left">
                <div class="company-logo-wrapper">
                  <img 
                    v-if="job.companyLogo" 
                    :src="job.companyLogo" 
                    :alt="job.companyName" 
                    class="company-logo"
                  />
                  <div v-else class="company-logo-placeholder">
                    {{ job.companyName?.charAt(0) || 'C' }}
                  </div>
                </div>
                
                <div class="job-title-section">
                  <h1 class="job-title">{{ job.title }}</h1>
                  <router-link :to="`/companies/${job.companyId}`" class="company-name">
                    {{ job.companyName }}
                    <span class="verified-badge" v-if="job.companyVerified">✓</span>
                  </router-link>
                  
                  <div class="job-meta-tags">
                    <span class="meta-tag location">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {{ job.location }}
                    </span>
                    <span class="meta-tag type" :class="[currentJobTypeColor.bg, currentJobTypeColor.text]">
                      {{ job.type }}
                    </span>
                    <span class="meta-tag experience">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      {{ job.experience }}
                    </span>
                    <span class="meta-tag deadline">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      Còn {{ Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24)) }} ngày
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="job-header-right">
                <div class="salary-box">
                  <span class="salary-label">Mức lương</span>
                  <span class="salary-value">{{ formatSalary(job.salary) }}</span>
                </div>
                
                <div class="action-buttons">
                  <button @click="applyForJob" :disabled="isApplied" class="btn btn-apply">
                    <span v-if="isApplied">✓</span>
                    {{ isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay' }}
                  </button>
                  <button @click="saveJob" class="btn btn-save">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                    Lưu việc
                  </button>
                  <button @click="shareJob" class="btn btn-share">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                    </svg>
                    Chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container">
        <div class="job-content-grid">
          <!-- Left Column - Job Details -->
          <div class="job-details-main">
            <!-- Job Description -->
            <section class="detail-section">
              <h2 class="section-title">
                <span class="title-icon">📋</span>
                Mô tả công việc
              </h2>
              <div class="section-content">
                <p v-for="(desc, index) in job.description?.split('\n')" :key="index" class="description-text">
                  {{ desc }}
                </p>
              </div>
            </section>

            <!-- Requirements -->
            <section class="detail-section">
              <h2 class="section-title">
                <span class="title-icon">🎯</span>
                Yêu cầu công việc
              </h2>
              <div class="section-content">
                <ul class="requirements-list">
                  <li v-for="(req, index) in job.requirements" :key="index" class="requirement-item">
                    <span class="check-icon">✓</span>
                    {{ req }}
                  </li>
                </ul>
              </div>
            </section>

            <!-- Benefits -->
            <section class="detail-section">
              <h2 class="section-title">
                <span class="title-icon">🎁</span>
                Quyền lợi
              </h2>
              <div class="section-content">
                <ul class="benefits-list">
                  <li v-for="(benefit, index) in job.benefits" :key="index" class="benefit-item">
                    <span class="star-icon">⭐</span>
                    {{ benefit }}
                  </li>
                </ul>
              </div>
            </section>

            <!-- Working Location -->
            <section class="detail-section">
              <h2 class="section-title">
                <span class="title-icon">📍</span>
                Địa điểm làm việc
              </h2>
              <div class="section-content">
                <div class="location-card">
                  <div class="location-icon">🏢</div>
                  <div class="location-details">
                    <p class="location-address">{{ job.workingAddress }}</p>
                    <p class="location-note" v-if="job.remoteWork">Có thể làm việc từ xa</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column - Sidebar -->
          <div class="job-details-sidebar">
            <!-- Job Overview Card -->
            <div class="sidebar-card overview-card">
              <h3 class="card-title">Tổng quan</h3>
              <div class="overview-list">
                <div class="overview-item">
                  <span class="overview-label">Ngành nghề</span>
                  <span class="overview-value">{{ job.category }}</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Cấp bậc</span>
                  <span class="overview-value">{{ job.level }}</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Số lượng tuyển</span>
                  <span class="overview-value">{{ job.quantity }} người</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Hình thức</span>
                  <span class="overview-value">{{ job.type }}</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Kinh nghiệm</span>
                  <span class="overview-value">{{ job.experience }}</span>
                </div>
                <div class="overview-item">
                  <span class="overview-label">Hạn nộp hồ sơ</span>
                  <span class="overview-value deadline">{{ new Date(job.deadline).toLocaleDateString('vi-VN') }}</span>
                </div>
              </div>
            </div>

            <!-- Company Info Card -->
            <div class="sidebar-card company-card">
              <h3 class="card-title">Thông tin công ty</h3>
              <div class="company-info">
                <div class="company-header">
                  <img 
                    v-if="job.companyLogo" 
                    :src="job.companyLogo" 
                    :alt="job.companyName" 
                    class="company-logo-small"
                  />
                  <div v-else class="company-logo-placeholder-small">
                    {{ job.companyName?.charAt(0) || 'C' }}
                  </div>
                  <div class="company-info-text">
                    <router-link :to="`/companies/${job.companyId}`" class="company-name-link">
                      {{ job.companyName }}
                    </router-link>
                    <span class="company-size" v-if="job.companySize">{{ job.companySize }} nhân viên</span>
                  </div>
                </div>
                <p class="company-description">{{ job.companyDescription?.substring(0, 150) }}...</p>
                <router-link :to="`/companies/${job.companyId}`" class="view-company-btn">
                  Xem trang công ty →
                </router-link>
              </div>
            </div>

            <!-- Quick Actions Card -->
            <div class="sidebar-card actions-card">
              <h3 class="card-title">Thao tác nhanh</h3>
              <div class="quick-actions">
                <button @click="applyForJob" :disabled="isApplied" class="quick-action-btn primary">
                  {{ isApplied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay' }}
                </button>
                <button @click="saveJob" class="quick-action-btn secondary">
                  Lưu việc làm
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Jobs Section -->
        <section class="related-jobs-section" v-if="relatedJobs.length > 0">
          <h2 class="section-title">Việc làm liên quan</h2>
          <div class="related-jobs-grid">
            <div v-for="relatedJob in relatedJobs" :key="relatedJob.id" class="related-job-card">
              <div class="related-job-header">
                <img 
                  v-if="relatedJob.companyLogo" 
                  :src="relatedJob.companyLogo" 
                  :alt="relatedJob.companyName"
                  class="related-company-logo"
                />
                <div v-else class="related-company-logo-placeholder">
                  {{ relatedJob.companyName?.charAt(0) || 'C' }}
                </div>
                <div class="related-job-info">
                  <router-link :to="`/jobs/${relatedJob.id}`" class="related-job-title">
                    {{ relatedJob.title }}
                  </router-link>
                  <span class="related-company-name">{{ relatedJob.companyName }}</span>
                </div>
              </div>
              <div class="related-job-meta">
                <span class="meta-item">{{ relatedJob.location }}</span>
                <span class="meta-item">{{ relatedJob.salary }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Loading & Not Found */
.loading-container,
.not-found-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top-color: #f26b38;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found-container h2 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.not-found-container p {
  color: #6b7280;
  margin-bottom: 2rem;
}

/* Job Hero */
.job-hero {
  position: relative;
  padding: 2.5rem 0 3rem;
  margin-bottom: 2rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  z-index: -1;
}

.job-hero-content {
  position: relative;
}

.company-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f26b38;
  color: white;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.job-main-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.job-header-left {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.company-logo-wrapper {
  flex-shrink: 0;
}

.company-logo {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 12px;
  background: white;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.company-logo-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.job-title-section {
  flex: 1;
}

.job-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.company-name {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 1rem;
  color: #4b5563;
  text-decoration: none;
  margin-bottom: 1rem;
}

.company-name:hover {
  color: #f26b38;
}

.verified-badge {
  color: #10b981;
  font-weight: 700;
}

.job-meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.meta-tag .icon {
  width: 14px;
  height: 14px;
}

.meta-tag.deadline {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}

.job-header-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}

.salary-box {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.salary-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.salary-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #059669;
  margin-top: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn .icon {
  width: 18px;
  height: 18px;
}

.btn-apply {
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
  min-width: 160px;
}

.btn-apply:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(242, 107, 56, 0.4);
}

.btn-apply:disabled {
  background: #10b981;
  cursor: not-allowed;
}

.btn-save,
.btn-share {
  background: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.btn-save:hover,
.btn-share:hover {
  border-color: #f26b38;
  color: #f26b38;
}

/* Main Content Grid */
.job-content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 2rem;
  margin-bottom: 4rem;
}

.job-details-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
  background: white;
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.25rem 0;
}

.title-icon {
  font-size: 1.25rem;
}

.section-content {
  color: #4b5563;
  line-height: 1.7;
}

.description-text {
  margin: 0 0 1rem 0;
}

.description-text:last-child {
  margin-bottom: 0;
}

.requirements-list,
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirement-item,
.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.requirement-item:last-child,
.benefit-item:last-child {
  border-bottom: none;
}

.check-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background: #10b981;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-top: 0.125rem;
}

.star-icon {
  flex-shrink: 0;
}

.location-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

.location-icon {
  font-size: 2rem;
}

.location-address {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.location-note {
  color: #059669;
  font-size: 0.875rem;
  margin: 0;
}

/* Sidebar */
.job-details-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f3f4f6;
}

.overview-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.overview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overview-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.overview-value {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
}

.overview-value.deadline {
  color: #dc2626;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.company-header {
  display: flex;
  gap: 0.875rem;
  align-items: center;
}

.company-logo-small {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  background: #f9fafb;
  padding: 0.25rem;
}

.company-logo-placeholder-small {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.company-info-text {
  display: flex;
  flex-direction: column;
}

.company-name-link {
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
}

.company-name-link:hover {
  color: #f26b38;
}

.company-size {
  font-size: 0.75rem;
  color: #6b7280;
}

.company-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.view-company-btn {
  display: inline-block;
  color: #f26b38;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
}

.view-company-btn:hover {
  text-decoration: underline;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-action-btn {
  width: 100%;
  padding: 0.875rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.quick-action-btn.primary {
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
}

.quick-action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(242, 107, 56, 0.4);
}

.quick-action-btn.secondary {
  background: white;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.quick-action-btn.secondary:hover {
  border-color: #f26b38;
  color: #f26b38;
}

/* Related Jobs */
.related-jobs-section {
  padding: 2rem 0 4rem;
}

.related-jobs-section .section-title {
  margin-bottom: 1.5rem;
}

.related-jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.related-job-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.2s;
}

.related-job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}

.related-job-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.related-company-logo,
.related-company-logo-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
}

.related-company-logo {
  object-fit: contain;
  background: #f9fafb;
  padding: 0.25rem;
}

.related-company-logo-placeholder {
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.related-job-info {
  flex: 1;
}

.related-job-title {
  display: block;
  font-weight: 600;
  color: #1f2937;
  text-decoration: none;
  margin-bottom: 0.25rem;
}

.related-job-title:hover {
  color: #f26b38;
}

.related-company-name {
  font-size: 0.875rem;
  color: #6b7280;
}

.related-job-meta {
  display: flex;
  gap: 1rem;
}

.related-job-meta .meta-item {
  font-size: 0.8125rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 1024px) {
  .job-content-grid {
    grid-template-columns: 1fr;
  }
  
  .job-details-sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .sidebar-card {
    flex: 1;
    min-width: 280px;
  }
  
  .related-jobs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .job-main-info {
    flex-direction: column;
  }
  
  .job-header-left {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .job-header-right {
    align-items: stretch;
    width: 100%;
  }
  
  .salary-box {
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-apply,
  .btn-save,
  .btn-share {
    width: 100%;
  }
  
  .job-meta-tags {
    justify-content: center;
  }
  
  .job-title {
    font-size: 1.5rem;
  }
  
  .sidebar-card {
    min-width: 100%;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #f26b38 0%, #ea580c 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(242, 107, 56, 0.4);
}
</style>
