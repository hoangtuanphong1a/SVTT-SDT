<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const profile = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  dateOfBirth: '',
  gender: '',
  education: '',
  experience: '',
  skills: []
})
const isLoading = ref(false)
const isEditing = ref(false)
const error = ref('')
const success = ref(false)

const loadProfile = async () => {
  isLoading.value = true
  try {
    const response = await api.get('/jobseeker/profile')
    profile.value = response.data
  } catch (error) {
    console.error('Error loading profile:', error)
  } finally {
    isLoading.value = false
  }
}

const updateProfile = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    await api.put('/jobseeker/profile', profile.value)
    success.value = true
    store.setUser(profile.value)
    isEditing.value = false
    store.addNotification({
      type: 'success',
      message: 'Cập nhật hồ sơ thành công!'
    })
  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = err.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const addSkill = () => {
  if (profile.value.skills.length < 10) {
    profile.value.skills.push('')
  }
}

const removeSkill = (index) => {
  profile.value.skills.splice(index, 1)
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div class="profile">
    <div class="container">
      <div class="profile-header">
        <h1>Hồ sơ cá nhân</h1>
        <p>Quản lý thông tin cá nhân và cài đặt tài khoản của bạn</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      
      <div v-else class="profile-content">
        <!-- Profile Card -->
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ store.user?.fullName?.charAt(0) || 'U' }}
            </div>
            <div class="avatar-actions">
              <button class="btn btn-outline">Thay đổi ảnh</button>
            </div>
          </div>

          <div class="profile-info">
            <div class="info-grid">
              <div class="info-item">
                <label>Họ và tên</label>
                <span v-if="!isEditing">{{ profile.fullName }}</span>
                <input v-else v-model="profile.fullName" type="text" />
              </div>

              <div class="info-item">
                <label>Email</label>
                <span v-if="!isEditing">{{ profile.email }}</span>
                <input v-else v-model="profile.email" type="email" />
              </div>

              <div class="info-item">
                <label>Số điện thoại</label>
                <span v-if="!isEditing">{{ profile.phone }}</span>
                <input v-else v-model="profile.phone" type="tel" />
              </div>

              <div class="info-item">
                <label>Địa chỉ</label>
                <span v-if="!isEditing">{{ profile.address }}</span>
                <input v-else v-model="profile.address" type="text" />
              </div>

              <div class="info-item">
                <label>Ngày sinh</label>
                <span v-if="!isEditing">{{ profile.dateOfBirth }}</span>
                <input v-else v-model="profile.dateOfBirth" type="date" />
              </div>

              <div class="info-item">
                <label>Giới tính</label>
                <span v-if="!isEditing">{{ profile.gender }}</span>
                <select v-else v-model="profile.gender">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div class="info-item full-width">
                <label>Trình độ học vấn</label>
                <span v-if="!isEditing">{{ profile.education }}</span>
                <textarea v-else v-model="profile.education" rows="3"></textarea>
              </div>

              <div class="info-item full-width">
                <label>Kinh nghiệm làm việc</label>
                <span v-if="!isEditing">{{ profile.experience }}</span>
                <textarea v-else v-model="profile.experience" rows="4"></textarea>
              </div>

              <div class="info-item full-width">
                <label>Kỹ năng</label>
                <div v-if="!isEditing" class="skills-display">
                  <span v-for="skill in profile.skills" :key="skill" class="skill-tag">{{ skill }}</span>
                </div>
                <div v-else class="skills-edit">
                  <div v-for="(skill, index) in profile.skills" :key="index" class="skill-input">
                    <input v-model="profile.skills[index]" type="text" placeholder="Nhập kỹ năng" />
                    <button @click="removeSkill(index)" class="btn btn-outline">Xóa</button>
                  </div>
                  <button @click="addSkill" class="btn btn-outline" :disabled="profile.skills.length >= 10">
                    Thêm kỹ năng
                  </button>
                </div>
              </div>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              Cập nhật hồ sơ thành công!
            </div>

            <div class="profile-actions">
              <button v-if="!isEditing" @click="isEditing = true" class="btn btn-primary">
                Chỉnh sửa hồ sơ
              </button>
              <div v-else class="edit-actions">
                <button @click="updateProfile" :disabled="isLoading" class="btn btn-primary">
                  {{ isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi' }}
                </button>
                <button @click="isEditing = false" class="btn btn-outline">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Account Settings -->
        <div class="account-settings">
          <h2>Cài đặt tài khoản</h2>
          <div class="settings-grid">
            <div class="setting-item">
              <div class="setting-info">
                <h3>Đổi mật khẩu</h3>
                <p>Thay đổi mật khẩu tài khoản của bạn</p>
              </div>
              <router-link to="/change-password" class="btn btn-outline">Đổi mật khẩu</router-link>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Thông báo</h3>
                <p>Quản lý cài đặt thông báo</p>
              </div>
              <button class="btn btn-outline">Cài đặt</button>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Bảo mật</h3>
                <p>Quản lý cài đặt bảo mật tài khoản</p>
              </div>
              <button class="btn btn-outline">Bảo mật</button>
            </div>

            <div class="setting-item">
              <div class="setting-info">
                <h3>Xóa tài khoản</h3>
                <p>Xóa vĩnh viễn tài khoản của bạn</p>
              </div>
              <button class="btn btn-danger">Xóa tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 2rem 0;
}

.profile-header {
  margin-bottom: 3rem;
}

.profile-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.profile-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.profile-content {
  display: grid;
  gap: 3rem;
}

.profile-card {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.avatar-placeholder {
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

.avatar-actions {
  display: flex;
  gap: 1rem;
}

.profile-info {
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

.skills-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.skills-edit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-input {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.skill-input input {
  flex: 1;
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

.profile-actions {
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

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.account-settings {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.account-settings h2 {
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
  .profile-card {
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