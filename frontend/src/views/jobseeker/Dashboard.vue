<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import axios from 'axios'

const stats = ref({
  totalApplications: 0,
  pendingApplications: 0,
  acceptedApplications: 0,
  rejectedApplications: 0
})
const recentJobs = ref([])
const isLoading = ref(false)

const loadDashboardData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const user = store.user
    
    // Get user ID from user or localStorage
    const userId = user?.id || 1
    
    // Load jobseeker stats
    const statsResponse = await axios.get(`http://localhost:8080/api/analytics/jobseeker/dashboard?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (statsResponse.data && statsResponse.data.data) {
      const data = statsResponse.data.data
      stats.value = {
        totalApplications: data.totalApplications || 0,
        pendingApplications: data.pendingApplications || 0,
        acceptedApplications: data.acceptedApplications || 0,
        rejectedApplications: data.rejectedApplications || 0
      }
      recentJobs.value = data.recommendedJobs || []
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>

<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Xin chào, {{ store.user?.fullName }}!</h1>
        <p>Chào mừng bạn quay trở lại. Dưới đây là tổng quan về hồ sơ và các cơ hội việc làm phù hợp.</p>
      </div>

      <!-- Stats -->
      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <h3>{{ stats.totalApplications }}</h3>
            <p>Tổng ứng tuyển</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-content">
            <h3>{{ stats.pendingApplications }}</h3>
            <p>Đang chờ xử lý</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ stats.acceptedApplications }}</h3>
            <p>Được chấp nhận</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">❌</div>
          <div class="stat-content">
            <h3>{{ stats.rejectedApplications }}</h3>
            <p>Bị từ chối</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-section">
        <h2>Hành động nhanh</h2>
        <div class="actions-grid">
          <router-link to="/cv" class="action-card">
            <div class="action-icon">📄</div>
            <div class="action-content">
              <h3>Quản lý CV</h3>
              <p>Tạo và chỉnh sửa hồ sơ xin việc</p>
            </div>
          </router-link>

          <router-link to="/applications" class="action-card">
            <div class="action-icon">📋</div>
            <div class="action-content">
              <h3>Đơn ứng tuyển</h3>
              <p>Xem và quản lý các đơn ứng tuyển</p>
            </div>
          </router-link>

          <router-link to="/saved-jobs" class="action-card">
            <div class="action-icon">⭐</div>
            <div class="action-content">
              <h3>Việc làm đã lưu</h3>
              <p>Xem các việc làm bạn đã lưu</p>
            </div>
          </router-link>

          <router-link to="/jobs" class="action-card">
            <div class="action-icon">🔍</div>
            <div class="action-content">
              <h3>Tìm việc</h3>
              <p>Duyệt các việc làm mới nhất</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recommended Jobs -->
      <div class="recommended-section">
        <h2>Việc làm đề xuất</h2>
        <div v-if="isLoading" class="loading">Đang tải...</div>
        <div v-else-if="recentJobs.length === 0" class="no-results">
          <p>Chưa có việc làm đề xuất. Hãy cập nhật hồ sơ để nhận được các đề xuất phù hợp hơn.</p>
          <router-link to="/cv" class="btn btn-primary">Cập nhật hồ sơ</router-link>
        </div>
        <div v-else class="jobs-grid">
          <div v-for="job in recentJobs" :key="job.id" class="job-card">
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
            </div>
            <p class="job-description">{{ job.description }}</p>
            <div class="job-actions">
              <router-link :to="`/jobs/${job.id}`" class="btn btn-primary">Xem chi tiết</router-link>
              <button class="btn btn-outline">Lưu việc làm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 2rem 0;
}

.dashboard-header {
  margin-bottom: 3rem;
}

.dashboard-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.dashboard-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
}

.stat-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 2rem;
  color: #1f2937;
}

.stat-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.actions-section {
  margin-bottom: 4rem;
}

.actions-section h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.action-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-decoration: none;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.action-card:hover {
  transform: translateY(-5px);
}

.action-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
}

.action-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.action-content p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.recommended-section {
  margin-bottom: 4rem;
}

.recommended-section h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
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
}

.type,
.experience {
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

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.loading,
.no-results {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.no-results p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .stat-card,
  .action-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stat-icon,
  .action-icon {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }
}
</style>