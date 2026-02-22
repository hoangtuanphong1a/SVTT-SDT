<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import axios from 'axios'

const stats = ref({
  totalJobs: 0,
  activeJobs: 0,
  pendingApplications: 0,
  totalApplications: 0
})
const recentApplications = ref([])
const isLoading = ref(false)

const loadDashboardData = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const user = store.user
    
    // Get company ID from user or localStorage
    const companyId = user?.companyId || 1
    
    // Load employer stats
    const statsResponse = await axios.get(`http://localhost:8080/api/analytics/employer/dashboard?companyId=${companyId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (statsResponse.data && statsResponse.data.data) {
      const data = statsResponse.data.data
      stats.value = {
        totalJobs: data.totalJobs || 0,
        activeJobs: data.activeJobs || 0,
        pendingApplications: data.pendingApplications || 0,
        totalApplications: data.totalApplications || 0
      }
      recentApplications.value = data.recentApplications || []
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
  <div class="employer-dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Xin chào, {{ store.user?.fullName }}!</h1>
        <p>Chào mừng bạn quay trở lại. Dưới đây là tổng quan về công ty và các đơn ứng tuyển.</p>
      </div>

      <!-- Stats -->
      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">💼</div>
          <div class="stat-content">
            <h3>{{ stats.totalJobs }}</h3>
            <p>Tổng số việc làm</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ stats.activeJobs }}</h3>
            <p>Việc làm đang hoạt động</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3>{{ stats.pendingApplications }}</h3>
            <p>Đơn ứng tuyển chờ xử lý</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{ stats.totalApplications }}</h3>
            <p>Tổng số đơn ứng tuyển</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-section">
        <h2>Hành động nhanh</h2>
        <div class="actions-grid">
          <router-link to="/employer/jobs" class="action-card">
            <div class="action-icon">➕</div>
            <div class="action-content">
              <h3>Đăng việc làm</h3>
              <p>Đăng tin tuyển dụng mới</p>
            </div>
          </router-link>

          <router-link to="/employer/applications" class="action-card">
            <div class="action-icon">📋</div>
            <div class="action-content">
              <h3>Quản lý đơn</h3>
              <p>Xem và xử lý đơn ứng tuyển</p>
            </div>
          </router-link>

          <router-link to="/employer/profile" class="action-card">
            <div class="action-icon">🏢</div>
            <div class="action-content">
              <h3>Thông tin công ty</h3>
              <p>Cập nhật thông tin công ty</p>
            </div>
          </router-link>

          <router-link to="/employer/messages" class="action-card">
            <div class="action-icon">💬</div>
            <div class="action-content">
              <h3>Tin nhắn</h3>
              <p>Trò chuyện với ứng viên</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Recent Applications -->
      <div class="applications-section">
        <h2>Đơn ứng tuyển mới nhất</h2>
        <div v-if="isLoading" class="loading">Đang tải...</div>
        <div v-else-if="recentApplications.length === 0" class="no-results">
          <p>Chưa có đơn ứng tuyển nào. Hãy đăng việc làm để nhận được đơn ứng tuyển.</p>
          <router-link to="/employer/jobs" class="btn btn-primary">Đăng việc làm</router-link>
        </div>
        <div v-else class="applications-list">
          <div v-for="app in recentApplications" :key="app.id" class="application-card">
            <div class="application-header">
              <div class="candidate-info">
                <div class="candidate-avatar">
                  {{ app.candidateName.charAt(0) }}
                </div>
                <div class="candidate-details">
                  <h4>{{ app.candidateName }}</h4>
                  <p class="job-title">{{ app.jobTitle }}</p>
                  <p class="applied-date">Ứng tuyển: {{ new Date(app.appliedAt).toLocaleDateString('vi-VN') }}</p>
                </div>
              </div>
              <div class="application-status" :class="app.status">
                <span class="status-dot"></span>
                <span class="status-text">{{ app.statusLabel }}</span>
              </div>
            </div>
            
            <div class="application-actions">
              <router-link :to="`/employer/applications/${app.id}`" class="btn btn-primary">Xem chi tiết</router-link>
              <button class="btn btn-outline">Liên hệ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.employer-dashboard {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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

.applications-section {
  margin-bottom: 4rem;
}

.applications-section h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.no-results {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.no-results p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
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

.loading {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
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
  
  .application-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .application-actions {
    justify-content: flex-start;
  }
}
</style>