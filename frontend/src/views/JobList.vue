<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../store'
import api from '../services/api'

const jobs = ref([])
const isLoading = ref(false)
const filters = ref({
  keyword: '',
  location: '',
  type: '',
  experience: ''
})

const loadJobs = async () => {
  isLoading.value = true
  try {
    const params = { ...filters.value }
    const response = await api.get('/jobs', { params })
    jobs.value = response.data
  } catch (error) {
    console.error('Error loading jobs:', error)
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  loadJobs()
}

onMounted(() => {
  loadJobs()
})
</script>

<template>
  <div class="job-list">
    <div class="container">
      <div class="header">
        <h1>Tìm việc làm</h1>
        <p>Khám phá hàng ngàn cơ hội việc làm phù hợp với bạn</p>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label for="keyword">Từ khóa</label>
          <input 
            id="keyword" 
            v-model="filters.keyword" 
            type="text" 
            placeholder="Nhập từ khóa tìm kiếm..."
            @keyup.enter="applyFilters"
          />
        </div>
        
        <div class="filter-group">
          <label for="location">Địa điểm</label>
          <select id="location" v-model="filters.location">
            <option value="">Tất cả địa điểm</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hải Phòng">Hải Phòng</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="type">Loại hình</label>
          <select id="type" v-model="filters.type">
            <option value="">Tất cả loại hình</option>
            <option value="Toàn thời gian">Toàn thời gian</option>
            <option value="Bán thời gian">Bán thời gian</option>
            <option value="Remote">Remote</option>
            <option value="Thực tập">Thực tập</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="experience">Kinh nghiệm</label>
          <select id="experience" v-model="filters.experience">
            <option value="">Tất cả kinh nghiệm</option>
            <option value="Không yêu cầu">Không yêu cầu</option>
            <option value="1 năm">1 năm</option>
            <option value="2 năm">2 năm</option>
            <option value="3 năm">3 năm</option>
            <option value="5 năm">5 năm</option>
          </select>
        </div>

        <button @click="applyFilters" class="btn btn-primary">Tìm kiếm</button>
      </div>

      <!-- Jobs -->
      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="jobs.length === 0" class="no-results">
        <p>Không tìm thấy việc làm nào phù hợp</p>
      </div>
      <div v-else class="jobs-grid">
        <div v-for="job in jobs" :key="job.id" class="job-card">
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
            <button v-if="store.isAuthenticated" class="btn btn-outline">Lưu việc làm</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.job-list {
  padding: 2rem 0;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
}

.filter-group input,
.filter-group select {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #667eea;
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
}
</style>