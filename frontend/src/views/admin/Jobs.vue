<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jobs = ref([])
const isLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const selectedStatus = ref('')

const loadJobs = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const params = {}
    if (searchQuery.value) params.q = searchQuery.value
    if (selectedStatus.value) params.status = selectedStatus.value
    
    const response = await axios.get('http://localhost:8080/api/admin/jobs', {
      params,
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.data && response.data.data) {
      jobs.value = response.data.data.jobs || []
    }
  } catch (err) {
    console.error('Error loading jobs:', err)
    error.value = 'Tải danh sách việc làm thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const approveJob = async (jobId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/jobs/${jobId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    loadJobs()
    alert('Duyệt tin tuyển dụng thành công!')
  } catch (err) {
    console.error('Error approving job:', err)
    alert('Duyệt tin tuyển dụng thất bại.')
  }
}

const rejectJob = async (jobId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/jobs/${jobId}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    loadJobs()
    alert('Từ chối tin tuyển dụng thành công!')
  } catch (err) {
    console.error('Error rejecting job:', err)
    alert('Từ chối tin tuyển dụng thất bại.')
  }
}

const deleteJob = async (jobId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa việc làm này không?')) {
    return
  }
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:8080/api/admin/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    jobs.value = jobs.value.filter(j => j.id !== jobId)
    alert('Xóa việc làm thành công!')
  } catch (err) {
    console.error('Error deleting job:', err)
    alert('Xóa việc làm thất bại.')
  }
}

const searchJobs = () => {
  loadJobs()
}

onMounted(() => {
  loadJobs()
})
</script>

<template>
  <div class="admin-jobs">
    <div class="container">
      <div class="jobs-header">
        <h1>Quản lý việc làm</h1>
        <p>Duyệt và quản lý các tin tuyển dụng trên hệ thống</p>
      </div>

      <!-- Search and Filters -->
      <div class="search-filters">
        <div class="filter-grid">
          <div class="filter-group">
            <label for="search">Tìm kiếm</label>
            <input 
              id="search" 
              v-model="searchQuery" 
              type="text" 
              placeholder="Nhập tiêu đề việc làm, công ty hoặc vị trí..."
              @input="searchJobs"
            />
          </div>

          <div class="filter-group">
            <label for="status">Trạng thái</label>
            <select id="status" v-model="selectedStatus" @change="searchJobs">
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Bị từ chối</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="jobs.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">💼</div>
          <h3>Không có việc làm</h3>
          <p>Không tìm thấy việc làm nào phù hợp với tiêu chí tìm kiếm</p>
        </div>
      </div>
      <div v-else class="jobs-list">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="job-header">
            <div class="job-info">
              <div class="job-company-logo">
                {{ job.companyName.charAt(0) }}
              </div>
              <div class="job-details">
                <h4>{{ job.title }}</h4>
                <p class="job-company">{{ job.companyName }}</p>
                <p class="job-meta">{{ job.type }} • {{ job.location }} • {{ job.salary }}</p>
                <span class="job-status" :class="job.status">{{ job.statusLabel }}</span>
              </div>
            </div>
            <div class="job-actions">
              <button class="btn btn-outline">Xem chi tiết</button>
              <button @click="deleteJob(job.id)" class="btn btn-danger">Xóa</button>
            </div>
          </div>

          <div class="job-meta-info">
            <div class="meta-item">
              <span class="label">Ngày đăng</span>
              <span class="value">{{ new Date(job.createdAt).toLocaleDateString('vi-VN') }}</span>
            </div>
            
            <div class="meta-item">
              <span class="label">Hạn nộp</span>
              <span class="value">{{ new Date(job.deadline).toLocaleDateString('vi-VN') }}</span>
            </div>

            <div class="meta-item">
              <span class="label">Lượt xem</span>
              <span class="value">{{ job.viewCount }}</span>
            </div>

            <div class="meta-item">
              <span class="label">Số lượng ứng tuyển</span>
              <span class="value">{{ job.applicationCount }}</span>
            </div>
          </div>

          <div v-if="job.isActive === false" class="job-actions-bottom">
            <button @click="approveJob(job.id)" class="btn btn-primary">Duyệt</button>
            <button @click="deleteJob(job.id)" class="btn btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-jobs {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.jobs-header {
  margin-bottom: 3rem;
}

.jobs-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.jobs-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.search-filters {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 3rem;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
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
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.job-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.job-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.job-company-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f3f4f6;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
}

.job-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.job-company {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.job-meta {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.job-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.job-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.job-status.approved {
  background: #dcfce7;
  color: #166534;
}

.job-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.job-actions {
  display: flex;
  gap: 1rem;
}

.job-meta-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.meta-item {
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

.job-actions-bottom {
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

@media (max-width: 768px) {
  .job-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .job-actions {
    justify-content: flex-start;
  }
  
  .job-actions-bottom {
    justify-content: flex-start;
  }
}
</style>