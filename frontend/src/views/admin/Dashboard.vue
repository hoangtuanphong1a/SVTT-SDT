<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const stats = ref({
  totalUsers: 0,
  totalCompanies: 0,
  totalJobs: 0,
  totalApplications: 0,
  activeUsers: 0,
  pendingCompanies: 0,
  recentActivity: []
})
const isLoading = ref(false)
const error = ref('')

const loadStats = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/admin/stats')
    stats.value = response.data
  } catch (err) {
    console.error('Error loading stats:', err)
    error.value = 'Tải thông tin thống kê thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="admin-dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1>Bảng điều khiển Admin</h1>
        <p>Quản lý hệ thống và theo dõi hoạt động</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="dashboard-content">
        <!-- Stats Overview -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h4>{{ stats.totalUsers }}</h4>
              <p>Người dùng</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🏢</div>
            <div class="stat-info">
              <h4>{{ stats.totalCompanies }}</h4>
              <p>Công ty</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">💼</div>
            <div class="stat-info">
              <h4>{{ stats.totalJobs }}</h4>
              <p>Việc làm</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📝</div>
            <div class="stat-info">
              <h4>{{ stats.totalApplications }}</h4>
              <p>Đơn ứng tuyển</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2>Hành động nhanh</h2>
          <div class="actions-grid">
            <router-link to="/admin/users" class="action-card">
              <div class="action-icon">👥</div>
              <div class="action-info">
                <h4>Quản lý người dùng</h4>
                <p>Quản lý tài khoản người dùng</p>
              </div>
            </router-link>

            <router-link to="/admin/companies" class="action-card">
              <div class="action-icon">🏢</div>
              <div class="action-info">
                <h4>Quản lý công ty</h4>
                <p>Duyệt và quản lý công ty</p>
              </div>
            </router-link>

            <router-link to="/admin/jobs" class="action-card">
              <div class="action-icon">💼</div>
              <div class="action-info">
                <h4>Quản lý việc làm</h4>
                <p>Duyệt và quản lý việc làm</p>
              </div>
            </router-link>

            <router-link to="/admin/reports" class="action-card">
              <div class="action-icon">📊</div>
              <div class="action-info">
                <h4>Báo cáo</h4>
                <p>Xem báo cáo thống kê</p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="recent-activity">
          <h2>Hoạt động gần đây</h2>
          <div class="activity-list">
            <div v-for="activity in stats.recentActivity" :key="activity.id" class="activity-item">
              <div class="activity-icon">{{ activity.icon }}</div>
              <div class="activity-info">
                <h4>{{ activity.title }}</h4>
                <p>{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
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

.loading,
.error-message {
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

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 2rem;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.stat-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #1f2937;
}

.stat-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.quick-actions h2,
.recent-activity h2 {
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
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 2rem;
  text-decoration: none;
  transition: transform 0.2s;
}

.action-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.action-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.action-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  display: flex;
  gap: 1.5rem;
  transition: transform 0.2s;
}

.activity-item:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.activity-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #e3f2fd;
  color: #1976d2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.activity-info p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .action-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .activity-item {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>