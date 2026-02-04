<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../store'
import api from '../services/api'

const companies = ref([])
const isLoading = ref(false)
const filters = ref({
  keyword: '',
  industry: '',
  size: ''
})

const loadCompanies = async () => {
  isLoading.value = true
  try {
    const params = { ...filters.value }
    const response = await api.get('/companies', { params })
    companies.value = response.data
  } catch (error) {
    console.error('Error loading companies:', error)
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  loadCompanies()
}

onMounted(() => {
  loadCompanies()
})
</script>

<template>
  <div class="company-list">
    <div class="container">
      <div class="header">
        <h1>Tìm công ty</h1>
        <p>Khám phá các công ty hàng đầu đang tuyển dụng</p>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label for="keyword">Từ khóa</label>
          <input 
            id="keyword" 
            v-model="filters.keyword" 
            type="text" 
            placeholder="Nhập tên công ty..."
            @keyup.enter="applyFilters"
          />
        </div>
        
        <div class="filter-group">
          <label for="industry">Ngành nghề</label>
          <select id="industry" v-model="filters.industry">
            <option value="">Tất cả ngành nghề</option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Tài chính">Tài chính</option>
            <option value="Y tế">Y tế</option>
            <option value="Giáo dục">Giáo dục</option>
            <option value="Bán lẻ">Bán lẻ</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="size">Quy mô</label>
          <select id="size" v-model="filters.size">
            <option value="">Tất cả quy mô</option>
            <option value="1-50">1-50 nhân viên</option>
            <option value="51-200">51-200 nhân viên</option>
            <option value="201-500">201-500 nhân viên</option>
            <option value="500+">Trên 500 nhân viên</option>
          </select>
        </div>

        <button @click="applyFilters" class="btn btn-primary">Tìm kiếm</button>
      </div>

      <!-- Companies -->
      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="companies.length === 0" class="no-results">
        <p>Không tìm thấy công ty nào phù hợp</p>
      </div>
      <div v-else class="companies-grid">
        <div v-for="company in companies" :key="company.id" class="company-card">
          <div class="company-header">
            <img :src="company.logo" :alt="company.name" class="company-logo" />
            <div class="company-info">
              <h3>{{ company.name }}</h3>
              <p class="industry">{{ company.industry }}</p>
              <div class="company-meta">
                <span class="size">{{ company.size }}</span>
                <span class="location">{{ company.location }}</span>
              </div>
            </div>
          </div>
          <div class="company-description">
            <p>{{ company.description }}</p>
          </div>
          <div class="company-actions">
            <router-link :to="`/companies/${company.id}`" class="btn btn-primary">Xem chi tiết</router-link>
            <a :href="company.website" target="_blank" class="btn btn-outline">Website</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company-list {
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

.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.company-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.company-card:hover {
  transform: translateY(-5px);
}

.company-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.company-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  background: #e5e7eb;
  padding: 0.5rem;
}

.company-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.industry {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-weight: 600;
}

.company-meta {
  display: flex;
  gap: 1rem;
}

.size,
.location {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #374151;
}

.company-description {
  margin-bottom: 2rem;
}

.company-description p {
  color: #6b7280;
  line-height: 1.6;
}

.company-actions {
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