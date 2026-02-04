<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../../store'
import api from '../../services/api'

const route = useRoute()
const router = useRouter()

const cvData = ref({
  title: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  dateOfBirth: '',
  gender: '',
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  languages: [],
  summary: ''
})

const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const loadCV = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get(`/jobseeker/cvs/${route.params.id}`)
    cvData.value = response.data
  } catch (err) {
    console.error('Error loading CV:', err)
    error.value = 'Tải thông tin CV thất bại. Vui lòng thử lại.'
    router.push('/cv')
  } finally {
    isLoading.value = false
  }
}

const updateCV = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    await api.put(`/jobseeker/cvs/${route.params.id}`, cvData.value)
    success.value = true
    store.addNotification({
      type: 'success',
      message: 'Cập nhật CV thành công!'
    })
    
    // Redirect to CV list after 2 seconds
    setTimeout(() => {
      router.push('/cv')
    }, 2000)
  } catch (err) {
    console.error('Error updating CV:', err)
    error.value = err.response?.data?.message || 'Cập nhật CV thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const addEducation = () => {
  cvData.value.education.push({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeEducation = (index) => {
  cvData.value.education.splice(index, 1)
}

const addExperience = () => {
  cvData.value.experience.push({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  })
}

const removeExperience = (index) => {
  cvData.value.experience.splice(index, 1)
}

const addSkill = () => {
  cvData.value.skills.push('')
}

const removeSkill = (index) => {
  cvData.value.skills.splice(index, 1)
}

const addCertification = () => {
  cvData.value.certifications.push({
    name: '',
    issuer: '',
    date: '',
    description: ''
  })
}

const removeCertification = (index) => {
  cvData.value.certifications.splice(index, 1)
}

const addLanguage = () => {
  cvData.value.languages.push({
    language: '',
    level: ''
  })
}

const removeLanguage = (index) => {
  cvData.value.languages.splice(index, 1)
}

onMounted(() => {
  loadCV()
})
</script>

<template>
  <div class="cv-edit">
    <div class="container">
      <div class="cv-header">
        <h1>Chỉnh sửa hồ sơ xin việc</h1>
        <p>Cập nhật thông tin để CV của bạn luôn được cập nhật</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      
      <form v-else @submit.prevent="updateCV" class="cv-form">
        <!-- Basic Information -->
        <div class="form-section">
          <h2>Thông tin cơ bản</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="title">Tiêu đề CV</label>
              <input 
                id="title" 
                v-model="cvData.title" 
                type="text" 
                placeholder="Nhập tiêu đề CV (VD: Frontend Developer)"
                required
              />
            </div>

            <div class="form-group">
              <label for="fullName">Họ và tên</label>
              <input 
                id="fullName" 
                v-model="cvData.fullName" 
                type="text" 
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                id="email" 
                v-model="cvData.email" 
                type="email" 
                placeholder="Nhập email"
                required
              />
            </div>

            <div class="form-group">
              <label for="phone">Số điện thoại</label>
              <input 
                id="phone" 
                v-model="cvData.phone" 
                type="tel" 
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div class="form-group">
              <label for="address">Địa chỉ</label>
              <input 
                id="address" 
                v-model="cvData.address" 
                type="text" 
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            <div class="form-group">
              <label for="dateOfBirth">Ngày sinh</label>
              <input 
                id="dateOfBirth" 
                v-model="cvData.dateOfBirth" 
                type="date"
                required
              />
            </div>

            <div class="form-group">
              <label for="gender">Giới tính</label>
              <select id="gender" v-model="cvData.gender" required>
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Personal Summary -->
        <div class="form-section">
          <h2>Tóm tắt bản thân</h2>
          <div class="form-group full-width">
            <label for="summary">Mô tả ngắn về bản thân</label>
            <textarea 
              id="summary" 
              v-model="cvData.summary" 
              rows="4" 
              placeholder="Nhập tóm tắt về bản thân, kỹ năng nổi bật, mục tiêu nghề nghiệp..."
            ></textarea>
          </div>
        </div>

        <!-- Education -->
        <div class="form-section">
          <h2>Học vấn</h2>
          <div v-for="(edu, index) in cvData.education" :key="index" class="form-grid">
            <div class="form-group">
              <label>Trường học</label>
              <input v-model="edu.school" type="text" placeholder="Tên trường" />
            </div>

            <div class="form-group">
              <label>Bằng cấp</label>
              <input v-model="edu.degree" type="text" placeholder="VD: Cử nhân, Thạc sĩ" />
            </div>

            <div class="form-group">
              <label>Chuyên ngành</label>
              <input v-model="edu.field" type="text" placeholder="Chuyên ngành học" />
            </div>

            <div class="form-group">
              <label>Thời gian học</label>
              <div class="date-range">
                <input v-model="edu.startDate" type="date" />
                <span>đến</span>
                <input v-model="edu.endDate" type="date" />
              </div>
            </div>

            <div class="form-group full-width">
              <label>Mô tả</label>
              <textarea v-model="edu.description" rows="2" placeholder="Mô tả thành tích, hoạt động..."></textarea>
            </div>

            <div class="form-actions">
              <button @click="removeEducation(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addEducation" type="button" class="btn btn-outline">Thêm học vấn</button>
        </div>

        <!-- Experience -->
        <div class="form-section">
          <h2>Kinh nghiệm làm việc</h2>
          <div v-for="(exp, index) in cvData.experience" :key="index" class="form-grid">
            <div class="form-group">
              <label>Công ty</label>
              <input v-model="exp.company" type="text" placeholder="Tên công ty" />
            </div>

            <div class="form-group">
              <label>Vị trí</label>
              <input v-model="exp.position" type="text" placeholder="Vị trí công việc" />
            </div>

            <div class="form-group">
              <label>Thời gian làm việc</label>
              <div class="date-range">
                <input v-model="exp.startDate" type="date" />
                <span>đến</span>
                <input v-model="exp.endDate" type="date" />
              </div>
            </div>

            <div class="form-group full-width">
              <label>Mô tả công việc</label>
              <textarea v-model="exp.description" rows="3" placeholder="Mô tả trách nhiệm, thành tích..."></textarea>
            </div>

            <div class="form-actions">
              <button @click="removeExperience(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addExperience" type="button" class="btn btn-outline">Thêm kinh nghiệm</button>
        </div>

        <!-- Skills -->
        <div class="form-section">
          <h2>Kỹ năng</h2>
          <div v-for="(skill, index) in cvData.skills" :key="index" class="form-grid">
            <div class="form-group full-width">
              <label>Kỹ năng</label>
              <input v-model="cvData.skills[index]" type="text" placeholder="Nhập kỹ năng" />
            </div>
            <div class="form-actions">
              <button @click="removeSkill(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addSkill" type="button" class="btn btn-outline">Thêm kỹ năng</button>
        </div>

        <!-- Certifications -->
        <div class="form-section">
          <h2>Chứng chỉ</h2>
          <div v-for="(cert, index) in cvData.certifications" :key="index" class="form-grid">
            <div class="form-group">
              <label>Tên chứng chỉ</label>
              <input v-model="cert.name" type="text" placeholder="Tên chứng chỉ" />
            </div>

            <div class="form-group">
              <label>Cấp bởi</label>
              <input v-model="cert.issuer" type="text" placeholder="Tổ chức cấp" />
            </div>

            <div class="form-group">
              <label>Ngày cấp</label>
              <input v-model="cert.date" type="date" />
            </div>

            <div class="form-group full-width">
              <label>Mô tả</label>
              <textarea v-model="cert.description" rows="2" placeholder="Mô tả chi tiết..."></textarea>
            </div>

            <div class="form-actions">
              <button @click="removeCertification(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addCertification" type="button" class="btn btn-outline">Thêm chứng chỉ</button>
        </div>

        <!-- Languages -->
        <div class="form-section">
          <h2>Ngôn ngữ</h2>
          <div v-for="(lang, index) in cvData.languages" :key="index" class="form-grid">
            <div class="form-group">
              <label>Ngôn ngữ</label>
              <input v-model="lang.language" type="text" placeholder="Tên ngôn ngữ" />
            </div>

            <div class="form-group">
              <label>Trình độ</label>
              <input v-model="lang.level" type="text" placeholder="VD: Cơ bản, Trung cấp, Cao cấp" />
            </div>

            <div class="form-actions">
              <button @click="removeLanguage(index)" type="button" class="btn btn-danger">Xóa</button>
            </div>
          </div>
          <button @click="addLanguage" type="button" class="btn btn-outline">Thêm ngôn ngữ</button>
        </div>

        <!-- Error and Success Messages -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="success" class="success-message">
          Cập nhật CV thành công! Đang chuyển hướng...
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="submit" :disabled="isLoading" class="btn btn-primary">
            {{ isLoading ? 'Đang cập nhật...' : 'Cập nhật CV' }}
          </button>
          <router-link to="/cv" class="btn btn-outline">Hủy</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.cv-edit {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.cv-header {
  margin-bottom: 3rem;
}

.cv-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.cv-header p {
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

.cv-form {
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

.date-range {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.date-range span {
  color: #6b7280;
  font-size: 0.875rem;
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

.success-message {
  background: #dcfce7;
  color: #166534;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .cv-form {
    padding: 2rem 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .date-range {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .form-actions {
    justify-content: flex-start;
  }
}
</style>