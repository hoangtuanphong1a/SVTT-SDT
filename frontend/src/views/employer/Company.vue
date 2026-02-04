<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const company = ref({
  name: '',
  description: '',
  industry: '',
  size: '',
  website: '',
  address: '',
  phone: '',
  email: '',
  logo: ''
})
const isLoading = ref(false)
const isEditing = ref(false)
const error = ref('')
const success = ref(false)

const loadCompany = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/employer/company')
    company.value = response.data
  } catch (error) {
    console.error('Error loading company:', error)
  } finally {
    isLoading.value = false
  }
}

const updateCompany = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    await api.put('/employer/company', company.value)
    success.value = true
    isEditing.value = false
    store.addNotification({
      type: 'success',
      message: 'Cập nhật thông tin công ty thành công!'
    })
  } catch (err) {
    console.error('Error updating company:', err)
    error.value = err.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadCompany()
})
</script>

<template>
  <div class="company">
    <div class="container">
      <div class="company-header">
        <h1>Thông tin công ty</h1>
        <p>Quản lý thông tin công ty và cài đặt tuyển dụng</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      
      <div v-else class="company-content">
        <!-- Company Card -->
        <div class="company-card">
          <div class="company-logo">
            <div class="logo-placeholder" v-if="!company.logo">
              {{ company.name?.charAt(0) || 'C' }}
            </div>
            <img v-else :src="company.logo" :alt="company.name" class="logo-image" />
            <div class="logo-actions" v-if="isEditing">
              <button class="btn btn-outline">Thay đổi logo</button>
            </div>
          </div>

          <div class="company-info">
            <div class="info-grid">
              <div class="info-item">
                <label>Tên công ty</label>
                <span v-if="!isEditing">{{ company.name }}</span>
                <input v-else v-model="company.name" type="text" />
              </div>

              <div class="info-item">
                <label>Email</label>
                <span v-if="!isEditing">{{ company.email }}</span>
                <input v-else v-model="company.email" type="email" />
              </div>

              <div class="info-item">
                <label>Số điện thoại</label>
                <span v-if="!isEditing">{{ company.phone }}</span>
                <input v-else v-model="company.phone" type="tel" />
              </div>

              <div class="info-item">
                <label>Website</label>
                <span v-if="!isEditing">{{ company.website }}</span>
                <input v-else v-model="company.website" type="url" />
              </div>

              <div class="info-item">
                <label>Ngành nghề</label>
                <span v-if="!isEditing">{{ company.industry }}</span>
                <input v-else v-model="company.industry" type="text" />
              </div>

              <div class="info-item">
                <label>Quy mô công ty</label>
                <span v-if="!isEditing">{{ company.size }}</span>
                <select v-else v-model="company.size">
                  <option value="1-10">1-10 nhân viên</option>
                  <option value="11-50">11-50 nhân viên</option>
                  <option value="51-200">51-200 nhân viên</option>
                  <option value="201-500">201-500 nhân viên</option>
                  <option value="500+">Trên 500 nhân viên</option>
                </select>
              </div>

              <div class="info-item full-width">
                <label>Địa chỉ</label>
                <span v-if="!isEditing">{{ company.address }}</span>
                <input v-else v-model="company.address" type="text" />
              </div>

              <div class="info-item full-width">
                <label>Mô tả công ty</label>
                <span v-if="!isEditing">{{ company.description }}</span>
                <textarea v-else v-model="company.description" rows="4"></textarea>
              </div>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              Cập nhật thông tin công ty thành công!
            </div>

            <div class="company-actions">
              <button v-if="!isEditing" @click="isEditing = true" class="btn btn-primary">
                Chỉnh sửa thông tin
              </button>
              <div v-else class="edit-actions">
                <button @click="updateCompany" :disabled="isLoading" class="btn btn-primary">
                  {{ isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi' }}
                </button>
                <button @click="isEditing = false" class="btn btn-outline">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Settings -->
        <div class="company-settings">
          <h2>Cài đặt tuyển dụng</h2>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-info">
                <h3>Quy trình tuyển dụng</h3>
                <p>Thiết lập quy trình phỏng vấn và đánh giá</p>
              </div>
              <button class="btn btn-outline">Cài đặt</button>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Thông báo</h3>
                <p>Quản lý cài đặt thông báo cho ứng viên</p>
              </div>
              <button class="btn btn-outline">Cài đặt</button>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Thống kê</h3>
                <p>Xem báo cáo và thống kê tuyển dụng</p>
              </div>
              <button class="btn btn-outline">Xem thống kê</button>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Quyền truy cập</h3>
                <p>Quản lý quyền truy cập cho nhân sự</p>
              </div>
              <button class="btn btn-outline">Quản lý</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.company {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.company-header {
  margin-bottom: 3rem;
}

.company-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.company-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.company-content {
  display: grid;
  gap: 3rem;
}

.company-card {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.company-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: #6b7280;
}

.logo-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.logo-actions {
  display: flex;
  gap: 1rem;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.info-item span {
  color: #6b7280;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.info-item input,
.info-item select,
.info-item textarea {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.info-item input:focus,
.info-item select:focus,
.info-item textarea:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
}

.success-message {
  background: #dcfce7;
  color: #166534;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #bbf7d0;
}

.company-actions {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.edit-actions {
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

.company-settings {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.company-settings h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.setting-item:hover {
  border-color: #d1d5db;
  transform: translateY(-2px);
}

.setting-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.setting-info p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .company-card {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>