<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const userId = route.params.id

const user = ref({
  id: '',
  fullName: '',
  email: '',
  phone: '',
  role: '',
  isActive: false,
  createdAt: '',
  lastLogin: ''
})
const isLoading = ref(false)
const error = ref('')
const isEditing = ref(false)
const success = ref(false)

const loadUser = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`http://localhost:8080/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.data && response.data.data) {
      user.value = response.data.data
    }
  } catch (err) {
    console.error('Error loading user:', err)
    error.value = 'Tải thông tin người dùng thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const updateUser = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false
  
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/users/${userId}`, user.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    success.value = true
    isEditing.value = false
    alert('Cập nhật thông tin người dùng thành công!')
  } catch (err) {
    console.error('Error updating user:', err)
    error.value = err.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const blockUser = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/users/${userId}/block`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value.isActive = false
    alert('Khóa người dùng thành công!')
  } catch (err) {
    console.error('Error blocking user:', err)
    alert('Khóa người dùng thất bại.')
  }
}

const unblockUser = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/users/${userId}/unblock`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value.isActive = true
    alert('Mở khóa người dùng thành công!')
  } catch (err) {
    console.error('Error unblocking user:', err)
    alert('Mở khóa người dùng thất bại.')
  }
}

const deleteUser = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
    return
  }
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Xóa người dùng thành công!')
    // Redirect back to users list
    window.location.href = '/admin/users'
  } catch (err) {
    console.error('Error deleting user:', err)
    alert('Xóa người dùng thất bại.')
  }
}

const getRoleLabel = (role) => {
  const labels = {
    'ADMIN': 'Quản trị viên',
    'EMPLOYER': 'Nhà tuyển dụng',
    'JOB_SEEKER': 'Ứng viên'
  }
  return labels[role] || role
}

const getStatusLabel = (isActive) => {
  return isActive ? 'Đang hoạt động' : 'Đã khóa'
}

onMounted(() => {
  loadUser()
})
</script>

<template>
  <div class="user-profile">
    <div class="container">
      <div class="profile-header">
        <h1>Thông tin người dùng</h1>
        <p>Quản lý thông tin chi tiết của người dùng</p>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="profile-content">
        <!-- Profile Card -->
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ user.fullName?.charAt(0) || 'U' }}
            </div>
            <div class="avatar-info">
              <h3>{{ user.fullName }}</h3>
              <p class="user-role" :class="user.role">{{ getRoleLabel(user.role) }}</p>
              <p class="user-status" :class="{ active: user.isActive, inactive: !user.isActive }">
                {{ getStatusLabel(user.isActive) }}
              </p>
            </div>
          </div>

          <div class="profile-info">
            <div class="info-grid">
              <div class="info-item">
                <label>ID Người dùng</label>
                <span>{{ user.id }}</span>
              </div>

              <div class="info-item">
                <label>Họ và tên</label>
                <span v-if="!isEditing">{{ user.fullName }}</span>
                <input v-else v-model="user.fullName" type="text" />
              </div>

              <div class="info-item">
                <label>Email</label>
                <span v-if="!isEditing">{{ user.email }}</span>
                <input v-else v-model="user.email" type="email" />
              </div>

              <div class="info-item">
                <label>Số điện thoại</label>
                <span v-if="!isEditing">{{ user.phone || 'Chưa cập nhật' }}</span>
                <input v-else v-model="user.phone" type="tel" />
              </div>

              <div class="info-item">
                <label>Vai trò</label>
                <span>{{ getRoleLabel(user.role) }}</span>
              </div>

              <div class="info-item">
                <label>Ngày tạo</label>
                <span>{{ new Date(user.createdAt).toLocaleDateString('vi-VN') }}</span>
              </div>

              <div v-if="user.lastLogin" class="info-item">
                <label>Lần đăng nhập cuối</label>
                <span>{{ new Date(user.lastLogin).toLocaleDateString('vi-VN') }}</span>
              </div>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              Cập nhật thông tin thành công!
            </div>

            <div class="profile-actions">
              <button v-if="!isEditing" @click="isEditing = true" class="btn btn-primary">
                Chỉnh sửa thông tin
              </button>
              <div v-else class="edit-actions">
                <button @click="updateUser" :disabled="isLoading" class="btn btn-primary">
                  {{ isLoading ? 'Đang cập nhật...' : 'Lưu thay đổi' }}
                </button>
                <button @click="isEditing = false" class="btn btn-outline">
                  Hủy
                </button>
              </div>

              <div class="user-controls">
                <button v-if="user.isActive" @click="blockUser" class="btn btn-warning">
                  Khóa tài khoản
                </button>
                <button v-else @click="unblockUser" class="btn btn-success">
                  Mở khóa tài khoản
                </button>
                <button @click="deleteUser" class="btn btn-danger">
                  Xóa tài khoản
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- User Activity -->
        <div class="user-activity">
          <h2>Hoạt động gần đây</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">📝</div>
              <div class="activity-info">
                <h4>Tạo tài khoản</h4>
                <p>Người dùng đã đăng ký tài khoản</p>
                <span class="activity-time">{{ new Date(user.createdAt).toLocaleDateString('vi-VN') }}</span>
              </div>
            </div>
            
            <div v-if="user.lastLogin" class="activity-item">
              <div class="activity-icon">🔓</div>
              <div class="activity-info">
                <h4>Đăng nhập lần cuối</h4>
                <p>Người dùng đã đăng nhập vào hệ thống</p>
                <span class="activity-time">{{ new Date(user.lastLogin).toLocaleDateString('vi-VN') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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

.profile-content {
  display: flex;
  flex-direction: column;
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

.avatar-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.user-role {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.user-role.admin {
  background: #e8f5e8;
  color: #2e7d32;
}

.user-role.employer {
  background: #f3e5f5;
  color: #7b1fa2;
}

.user-role.jobseeker {
  background: #e3f2fd;
  color: #1976d2;
}

.user-status {
  font-size: 0.875rem;
  font-weight: 600;
}

.user-status.active {
  color: #22c55e;
}

.user-status.inactive {
  color: #ef4444;
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

.info-item input {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.info-item input:focus {
  outline: none;
  border-color: #667eea;
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.edit-actions {
  display: flex;
  gap: 1rem;
}

.user-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background-color: #d97706;
}

.btn-success {
  background-color: #22c55e;
  color: white;
}

.btn-success:hover {
  background-color: #16a34a;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.user-activity {
  background: white;
  padding: 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.user-activity h2 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1.5rem;
  transition: transform 0.2s;
}

.activity-item:hover {
  transform: translateX(2px);
  background: #f3f4f6;
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
  .profile-card {
    grid-template-columns: 1fr;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .user-controls {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>