<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const analytics = ref({
  totalUsers: 0,
  totalCompanies: 0,
  totalJobs: 0,
  totalApplications: 0,
  monthlyStats: [],
  topCompanies: [],
  topJobs: [],
  userGrowth: []
})
const isLoading = ref(false)
const error = ref('')

const loadAnalytics = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/admin/analytics')
    analytics.value = response.data
  } catch (err) {
    console.error('Error loading analytics:', err)
    error.value = 'Tải thông tin thống kê thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadAnalytics()
})
</script>

<template>
  <div class="admin-analytics">
    <div class="container">
      <div class="analytics-header">
        <h1>Thống kê & Phân tích</h1>
        <p>Phân tích dữ liệu và hiệu suất hệ thống</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="analytics-content">
        <!-- Overview Stats -->
        <div class="stats-overview">
          <h2>Tổng quan</h2>
          <div class="overview-grid">
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <h4>{{ analytics.totalUsers }}</h4>
                <p>Người dùng</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">🏢</div>
              <div class="stat-info">
                <h4>{{ analytics.totalCompanies }}</h4>
                <p>Công ty</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">💼</div>
              <div class="stat-info">
                <h4>{{ analytics.totalJobs }}</h4>
                <p>Việc làm</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">📝</div>
              <div class="stat-info">
                <h4>{{ analytics.totalApplications }}</h4>
                <p>Đơn ứng tuyển</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Stats -->
        <div class="monthly-stats">
          <h2>Thống kê theo tháng</h2>
          <div class="stats-chart">
            <div v-for="stat in analytics.monthlyStats" :key="stat.month" class="chart-bar">
              <div class="bar-value">{{ stat.users }}</div>
              <div class="bar-container">
                <div class="bar-fill" :style="{ height: `${(stat.users / Math.max(...analytics.monthlyStats.map(s => s.users))) * 100}%` }"></div>
              </div>
              <div class="bar-label">{{ stat.month }}</div>
            </div>
          </div>
        </div>

        <!-- Top Companies -->
        <div class="top-sections">
          <div class="top-companies">
            <h2>Công ty hàng đầu</h2>
            <div class="companies-list">
              <div v-for="company in analytics.topCompanies" :key="company.id" class="company-item">
                <div class="company-info">
                  <div class="company-logo">{{ company.name.charAt(0) }}</div>
                  <div class="company-details">
                    <h4>{{ company.name }}</h4>
                    <p>{{ company.jobCount }} việc làm</p>
                  </div>
                </div>
                <div class="company-stats">
                  <span class="stat-value">{{ company.applicationCount }}</span>
                  <span class="stat-label">Đơn ứng tuyển</span>
                </div>
              </div>
            </div>
          </div>

          <div class="top-jobs">
            <h2>Việc làm phổ biến</h2>
            <div class="jobs-list">
              <div v-for="job in analytics.topJobs" :key="job.id" class="job-item">
                <div class="job-info">
                  <h4>{{ job.title }}</h4>
                  <p>{{ job.companyName }}</p>
                </div>
                <div class="job-stats">
                  <span class="stat-value">{{ job.applicationCount }}</span>
                  <span class="stat-label">Ứng tuyển</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Growth -->
        <div class="user-growth">
          <h2>Tăng trưởng người dùng</h2>
          <div class="growth-chart">
            <div v-for="growth in analytics.userGrowth" :key="growth.month" class="growth-item">
              <div class="growth-label">{{ growth.month }}</div>
              <div class="growth-bar">
                <div class="growth-fill" :style="{ width: `${(growth.users / Math.max(...analytics.userGrowth.map(g => g.users))) * 100}%` }"></div>
              </div>
              <div class="growth-value">{{ growth.users }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-analytics {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.analytics-header {
  margin-bottom: 3rem;
}

.analytics-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.analytics-header p {
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

.analytics-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.stats-overview h2,
.monthly-stats h2,
.top-companies h2,
.top-jobs h2,
.user-growth h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.overview-grid {
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

.monthly-stats {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.stats-chart {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  height: 300px;
  padding: 1rem;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.bar-value {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.bar-container {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar-fill {
  width: 100%;
  background: #667eea;
  border-radius: 0.25rem 0.25rem 0 0;
}

.bar-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.top-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.top-companies,
.top-jobs {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.companies-list,
.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.company-item,
.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  transition: transform 0.2s;
}

.company-item:hover,
.job-item:hover {
  transform: translateX(2px);
  border-color: #d1d5db;
}

.company-info,
.job-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.company-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
}

.company-details h4,
.job-info h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.company-details p,
.job-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.company-stats,
.job-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.user-growth {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.growth-chart {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.growth-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.growth-label {
  width: 80px;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
}

.growth-bar {
  flex: 1;
  height: 20px;
  background: #f3f4f6;
  border-radius: 9999px;
  overflow: hidden;
}

.growth-fill {
  height: 100%;
  background: #667eea;
  transition: width 0.3s ease;
}

.growth-value {
  width: 60px;
  text-align: right;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stat-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .top-sections {
    grid-template-columns: 1fr;
  }
  
  .growth-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .growth-label {
    width: auto;
  }
  
  .growth-bar {
    width: 100%;
  }
  
  .growth-value {
    width: auto;
    text-align: left;
  }
}
</style>