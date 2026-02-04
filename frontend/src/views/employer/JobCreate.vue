<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../../store'
import api from '../../services/api'

const router = useRouter()

const jobData = ref({
  title: '',
  description: '',
  requirements: '',
  benefits: '',
  type: 'full-time',
  location: '',
  salary: '',
  experience: '',
  education: '',
  skills: [],
  deadline: '',
  status: 'active'
})

const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const addSkill = () => {
  jobData.value.skills.push('')
}

const removeSkill = (index) => {
  jobData.value.skills.splice(index, 1)
}

const createJob = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    const response = await api.post('/employer/jobs', jobData.value)
    success.value = true
    store.addNotification({
      type: 'success',
      message: 'Tạo việc làm thành công!'
    })
    
    // Redirect to jobs list after 2 seconds
    setTimeout(() => {
      router.push('/employer/jobs')
    }, 2000)
  } catch (err) {
    console.error('Error creating job:', err)
    error.value = err.response?.data?.message || 'Tạo việc làm thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="job-create">
    <div class="container">
      <div class="job-header">
        <h1>Đăng việc làm mới</h1>
        <p>Tạo tin tuyển dụng để tìm kiếm ứng viên phù hợp</p>
      </div>

      <form @submit.prevent="createJob" class="job-form">
        <!-- Job Information -->
        <div class="form-section">
          <h2>Thông tin việc làm</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="title">Tiêu đề việc làm</label>
              <input 
                id="title" 
                v-model="jobData.title" 
                type="text" 
                placeholder="Nhập tiêu đề việc làm (VD: Frontend Developer)"
                required
              />
            </div>

            <div class="form-group">
              <label for="type">Loại hình công việc</label>
              <select id="type" v-model="jobData.type" required>
                <option value="full-time">Toàn thời gian</option>
                <option value="part-time">Bán thời gian</option>
                <option value="remote">Làm việc từ xa</option>
                <option value="internship">Thực tập</option>
                <option value="contract">Hợp đồng</option>
              </select>
            </div>

            <div class="form-group">
              <label for="location">Địa điểm làm việc</label>
              <input 
                id="location" 
                v-model="jobData.location" 
                type="text" 
                placeholder="Nhập địa điểm làm việc"
                required
              />
            </div>

            <div class="form-group">
              <label for="salary">Mức lương</label>
              <input 
                id="salary" 
                v-model="jobData.salary" 
                type="text" 
                placeholder="VD: 15-25 triệu"
                required
              />
            </div>

            <div class="form-group">
              <label for="experience">Kinh nghiệm</label>
              <input 
                id="experience" 
                v-model="jobData.experience" 
                type="text" 
                placeholder="VD: 2-3 năm"
              />
            </div>

            <div class="form-group">
              <label for="education">Học vấn</label>
              <input 
                id="education" 
                v-model="jobData.education" 
                type="text" 
                placeholder="VD: Cử nhân Công nghệ thông tin"
              />
            </div>

            <div class="form-group">
              <label for="deadline">Hạn nộp hồ sơ</label>
              <input 
                id="deadline" 
                v-model="jobData.deadline" 
                type="date"
                required
              />
            </div>

            <div class="form-group">
              <label for="status">Trạng thái</label>
              <select id="status" v-model="jobData.status" required>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Job Description -->
        <div class="form-section">
          <h2>Mô tả công việc</h2>
          <div class="form-group full-width">
            <label for="description">Mô tả công việc</label>
            <textarea 
              id="description" 
              v-model="jobData.description" 
              rows="6" 
              placeholder="Mô tả chi tiết về công việc, trách nhiệm và nhiệm vụ..."
              required
            ></textarea>
          </div>
        </div>

        <!-- Requirements -->
        <div class="form-section">
          <h2>Yêu cầu công việc</h2>
          <div class="form-group full-width">
            <label for="requirements">Yêu cầu ứng viên</label>
            <textarea 
              id="requirements" 
              v-model="jobData.requirements" 
              rows="6" 
              placeholder="Mô tả các yêu cầu về kỹ năng, kinh nghiệm, bằng cấp..."
            ></textarea>
          </div>
        </div>

        <!-- Benefits -->
        <div class="form-section">
          <h2>Phúc lợi</h2>
          <div class="form-group full-width">
            <label for="benefits">Phúc lợi và đãi ngộ</label>
            <textarea 
              id="benefits" 
              v-model="jobData.benefits" 
              rows="4" 
              placeholder="Mô tả các phúc lợi, đãi ngộ mà công ty cung cấp..."
            ></textarea>
          </div>
        </div>

        <!-- Skills -->
        <div class="form-section">
          <h2>Kỹ năng yêu cầu</h2>
          <div v-for="(skill, index) in jobData.skills" :key="index" class="form-grid">
            <div class="form-group full-width">
              <label>Kỹ năng</label>
              <input v-model="jobData.skills[index]" type="text" placeholder="Nhập kỹ năng yêu cầu" />
            </div>
            <div class="form-actions">
              <button @click="removeSkill(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addSkill" type="button" class="btn btn-outline">Thêm kỹ năng</button>
        </div>

        <!-- Error and Success Messages -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="success" class="success-message">
          Tạo việc làm thành công! Đang chuyển hướng...
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" :disabled="isLoading" class="btn btn-primary">
            {{ isLoading ? 'Đang tạo...' : 'Tạo việc làm' }}
          </button>
          <router-link to="/employer/jobs" class="btn btn-outline">Hủy</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.job-create {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.job-header {
  margin-bottom: 3rem;
}

.job-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.job-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.job-form {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 3rem;
}

.form-section h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
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
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
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

.btn-primary:hover:not(:disabled) {
  background-color: #5a67d8;
}

.btn-primary:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
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

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
  margin-bottom: 2rem;
}

.success-message {
  background: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .job-form {
    padding: 2rem 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    justify-content: flex-start;
  }
}
</style>