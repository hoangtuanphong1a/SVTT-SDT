<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const searchQuery = ref('')
const filters = ref({
  skills: [],
  experience: '',
  education: '',
  location: ''
})
const candidates = ref([])
const isLoading = ref(false)
const error = ref('')

const loadCandidates = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/employer/cv-search', {
      params: {
        q: searchQuery.value,
        skills: filters.value.skills.join(','),
        experience: filters.value.experience,
        education: filters.value.education,
        location: filters.value.location
      }
    })
    candidates.value = response.data
  } catch (err) {
    console.error('Error loading candidates:', err)
    error.value = 'Tìm kiếm ứng viên thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const addSkill = () => {
  filters.value.skills.push('')
}

const removeSkill = (index) => {
  filters.value.skills.splice(index, 1)
}

const searchCandidates = () => {
  loadCandidates()
}

onMounted(() => {
  loadCandidates()
})
</script>

<template>
  <div class="cv-search">
    <div class="container">
      <div class="search-header">
        <h1>Tìm kiếm CV</h1>
        <p>Tìm kiếm và lọc hồ sơ ứng viên theo các tiêu chí phù hợp</p>
      </div>

      <!-- Search Form -->
      <div class="search-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="search">Tìm kiếm</label>
            <input 
              id="search" 
              v-model="searchQuery" 
              type="text" 
              placeholder="Nhập từ khóa tìm kiếm (tên, kỹ năng, vị trí...)"
            />
          </div>

          <div class="form-group">
            <label for="location">Địa điểm</label>
            <input 
              id="location" 
              v-model="filters.location" 
              type="text" 
              placeholder="Nhập địa điểm làm việc mong muốn"
            />
          </div>

          <div class="form-group">
            <label for="experience">Kinh nghiệm</label>
            <select id="experience" v-model="filters.experience">
              <option value="">Tất cả</option>
              <option value="fresher">Fresher</option>
              <option value="1-2">1-2 năm</option>
              <option value="3-5">3-5 năm</option>
              <option value="5+">Trên 5 năm</option>
            </select>
          </div>

          <div class="form-group">
            <label for="education">Học vấn</label>
            <select id="education" v-model="filters.education">
              <option value="">Tất cả</option>
              <option value="high-school">Trung học</option>
              <option value="college">Cao đẳng</option>
              <option value="bachelor">Đại học</option>
              <option value="master">Thạc sĩ</option>
              <option value="phd">Tiến sĩ</option>
            </select>
          </div>
        </div>

        <!-- Skills Filter -->
        <div class="form-section">
          <h3>Kỹ năng</h3>
          <div v-for="(skill, index) in filters.skills" :key="index" class="form-grid">
            <div class="form-group full-width">
              <input v-model="filters.skills[index]" type="text" placeholder="Nhập kỹ năng (VD: JavaScript, React, v.v...)" />
            </div>
            <div class="form-actions">
              <button @click="removeSkill(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addSkill" type="button" class="btn btn-outline">Thêm kỹ năng</button>
        </div>

        <!-- Search Actions -->
        <div class="form-actions">
          <button @click="searchCandidates" class="btn btn-primary">Tìm kiếm</button>
          <button @click="() => { searchQuery = ''; filters = { skills: [], experience: '', education: '', location: '' }; loadCandidates(); }" class="btn btn-outline">Đặt lại</button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="isLoading" class="loading">Đang tìm kiếm...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="candidates.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Không tìm thấy ứng viên</h3>
          <p>Không có ứng viên nào phù hợp với tiêu chí tìm kiếm của bạn</p>
          <button @click="() => { searchQuery = ''; filters = { skills: [], experience: '', education: '', location: '' }; loadCandidates(); }" class="btn btn-primary">Tìm kiếm lại</button>
        </div>
      </div>
      <div v-else class="candidates-list">
        <div v-for="candidate in candidates" :key="candidate.id" class="candidate-card">
          <div class="candidate-header">
            <div class="candidate-info">
              <div class="candidate-avatar">
                {{ candidate.fullName.charAt(0) }}
              </div>
              <div class="candidate-details">
                <h4>{{ candidate.fullName }}</h4>
                <p class="job-title">{{ candidate.currentPosition }}</p>
                <p class="location">{{ candidate.location }}</p>
              </div>
            </div>
            <div class="candidate-actions">
              <router-link :to="`/employer/candidates/${candidate.id}`" class="btn btn-primary">Xem hồ sơ</router-link>
              <button class="btn btn-outline">Liên hệ</button>
            </div>
          </div>

          <div class="candidate-details-info">
            <div class="detail-item">
              <span class="label">Email</span>
              <span class="value">{{ candidate.email }}</span>
            </div>
            
            <div class="detail-item">
              <span class="label">Số điện thoại</span>
              <span class="value">{{ candidate.phone }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Kinh nghiệm</span>
              <span class="value">{{ candidate.experience }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Học vấn</span>
              <span class="value">{{ candidate.education }}</span>
            </div>

            <div class="detail-item">
              <span class="label">Kỹ năng</span>
              <div class="skills-list">
                <span v-for="skill in candidate.skills" :key="skill" class="skill-tag">{{ skill }}</span>
              </div>
            </div>

            <div v-if="candidate.summary" class="detail-item">
              <span class="label">Tóm tắt</span>
              <span class="value">{{ candidate.summary }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cv-search {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.search-header {
  margin-bottom: 3rem;
}

.search-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.search-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.search-form {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-section {
  margin-bottom: 2rem;
}

.form-section h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.25rem;
}

.form-actions {
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

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
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

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.candidate-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.candidate-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.candidate-header {
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

.location {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.candidate-details-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
}

.value {
  color: #1f2937;
  font-weight: 500;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    justify-content: flex-start;
  }
  
  .candidate-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>