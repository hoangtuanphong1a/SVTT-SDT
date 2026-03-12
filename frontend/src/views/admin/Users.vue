<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import axios from 'axios'

const users = ref([])
const isLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const selectedRole = ref('')

const loadUsers = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const params = {}
    if (searchQuery.value) params.q = searchQuery.value
    if (selectedRole.value) params.role = selectedRole.value
    
    const response = await axios.get('http://localhost:8080/api/admin/users', {
      params,
      headers: { Authorization: `Bearer ${token}` }
    })
    
    if (response.data && response.data.data) {
      users.value = response.data.data.users || []
    }
  } catch (err) {
    console.error('Error loading users:', err)
    error.value = 'Tải danh sách người dùng thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const deleteUser = async (userId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
    return
  }

  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    users.value = users.value.filter(user => user.id !== userId)
    alert('Xóa người dùng thành công!')
  } catch (err) {
    console.error('Error deleting user:', err)
    alert('Xóa người dùng thất bại. Vui lòng thử lại.')
  }
}

const blockUser = async (userId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/users/${userId}/block`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    loadUsers()
    alert('Khóa người dùng thành công!')
  } catch (err) {
    console.error('Error blocking user:', err)
    alert('Khóa người dùng thất bại.')
  }
}

const unblockUser = async (userId) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:8080/api/admin/users/${userId}/unblock`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    loadUsers()
    alert('Mở khóa người dùng thành công!')
  } catch (err) {
    console.error('Error unblocking user:', err)
    alert('Mở khóa người dùng thất bại.')
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

const searchUsers = () => {
  loadUsers()
}

onMounted(() => {
  loadUsers()
})
</script>

<template>
  <div class="admin-users">
    <div class="container">
      <div class="users-header">
        <h1>Quản lý người dùng</h1>
        <p>Quản lý tài khoản người dùng và phân quyền</p>
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
              placeholder="Nhập tên, email hoặc số điện thoại..."
              @input="searchUsers"
            />
          </div>

          <div class="filter-group">
            <label for="role">Vai trò</label>
            <select id="role" v-model="selectedRole" @change="searchUsers">
              <option value="">Tất cả vai trò</option>
              <option value="jobseeker">Người tìm việc</option>
              <option value="employer">Nhà tuyển dụng</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="users.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>Không có người dùng</h3>
          <p>Không tìm thấy người dùng nào phù hợp với tiêu chí tìm kiếm</p>
        </div>
      </div>
      <div v-else class="users-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <div class="user-header">
            <div class="user-info">
              <div class="user-avatar">
                {{ user.fullName.charAt(0) }}
              </div>
              <div class="user-details">
                <h4>{{ user.fullName }}</h4>
                <p class="user-email">{{ user.email }}</p>
                <span class="user-role" :class="user.role">{{ getRoleLabel(user.role) }}</span>
              </div>
            </div>
            <div class="user-actions">
              <router-link :to="`/admin/users/${user.id}/profile`" class="btn btn-outline">Xem chi tiết</router-link>
              <button @click="deleteUser(user.id)" class="btn btn-danger">Xóa</button>
            </div>
          </div>

          <div class="user-meta">
            <div class="meta-item">
              <span class="label">Số điện thoại</span>
              <span class="value">{{ user.phone || 'Chưa cập nhật' }}</span>
            </div>
            
            <div class="meta-item">
              <span class="label">Ngày tạo</span>
              <span class="value">{{ new Date(user.createdAt).toLocaleDateString('vi-VN') }}</span>
            </div>

            <div class="meta-item">
              <span class="label">Trạng thái</span>
              <span class="value" :class="user.status">{{ user.statusLabel }}</span>
            </div>

            <div v-if="user.lastLogin" class="meta-item">
              <span class="label">Lần đăng nhập cuối</span>
              <span class="value">{{ new Date(user.lastLogin).toLocaleDateString('vi-VN') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-users {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.users-header {
  margin-bottom: 3rem;
}

.users-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.users-header p {
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

.users-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.user-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.user-avatar {
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

.user-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.user-email {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.user-role {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.user-role.jobseeker {
  background: #e3f2fd;
  color: #1976d2;
}

.user-role.employer {
  background: #f3e5f5;
  color: #7b1fa2;
}

.user-role.admin {
  background: #e8f5e8;
  color: #2e7d32;
}

.user-actions {
  display: flex;
  gap: 1rem;
}

.user-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
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

.value.active {
  color: #22c55e;
}

.value.inactive {
  color: #ef4444;
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
  .user-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .user-actions {
    justify-content: flex-start;
  }
}
</style>