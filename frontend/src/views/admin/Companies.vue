<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const companies = ref([])
const isLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const selectedStatus = ref('')

const loadCompanies = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/admin/companies', {
      params: {
        q: searchQuery.value,
        status: selectedStatus.value
      }
    })
    companies.value = response.data
  } catch (err) {
    console.error('Error loading companies:', err)
    error.value = 'Tải danh sách công ty thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const updateCompanyStatus = async (companyId, status) => {
  try {
    await api.put(`/admin/companies/${companyId}/status`, { status })
    const company = companies.value.find(c => c.id === companyId)
    if (company) {
      company.status = status
      company.statusLabel = status === 'approved' ? 'Đã duyệt' : status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'
    }
    store.addNotification({
      type: 'success',
      message: 'Cập nhật trạng thái công ty thành công!'
    })
  } catch (err) {
    console.error('Error updating company status:', err)
    store.addNotification({
      type: 'error',
      message: 'Cập nhật trạng thái công ty thất bại. Vui lòng thử lại.'
    })
  }
}

const deleteCompany = async (companyId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa công ty này không?')) {
    return
  }

  try {
    await api.delete(`/admin/companies/${companyId}`)
    companies.value = companies.value.filter(company => company.id !== companyId)
    store.addNotification({
      type: 'success',
      message: 'Xóa công ty thành công!'
    })
  } catch (err) {
    console.error('Error deleting company:', err)
    store.addNotification({
      type: 'error',
      message: 'Xóa công ty thất bại. Vui lòng thử lại.'
    })
  }
}

const searchCompanies = () => {
  loadCompanies()
}

onMounted(() => {
  loadCompanies()
})
</script>

<template>
  <div class="admin-companies">
    <div class="container">
      <div class="companies-header">
        <h1>Quản lý công ty</h1>
        <p>Duyệt và quản lý các công ty đăng ký trên hệ thống</p>
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
              placeholder="Nhập tên công ty, email hoặc người liên hệ..."
              @input="searchCompanies"
            />
          </div>

          <div class="filter-group">
            <label for="status">Trạng thái</label>
            <select id="status" v-model="selectedStatus" @change="searchCompanies">
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
      <div v-else-if="companies.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">🏢</div>
          <h3>Không có công ty</h3>
          <p>Không tìm thấy công ty nào phù hợp với tiêu chí tìm kiếm</p>
        </div>
      </div>
      <div v-else class="companies-list">
        <div v-for="company in companies" :key="company.id" class="company-card">
          <div class="company-header">
            <div class="company-info">
              <div class="company-logo">
                {{ company.name.charAt(0) }}
              </div>
              <div class="company-details">
                <h4>{{ company.name }}</h4>
                <p class="company-email">{{ company.email }}</p>
                <p class="company-contact">Người liên hệ: {{ company.contactPerson }}</p>
                <span class="company-status" :class="company.status">{{ company.statusLabel }}</span>
              </div>
            </div>
            <div class="company-actions">
              <button class="btn btn-outline">Xem chi tiết</button>
              <button @click="deleteCompany(company.id)" class="btn btn-danger">Xóa</button>
            </div>
          </div>

          <div class="company-meta">
            <div class="meta-item">
              <span class="label">Địa chỉ</span>
              <span class="value">{{ company.address }}</span>
            </div>
            
            <div class="meta-item">
              <span class="label">Số điện thoại</span>
              <span class="value">{{ company.phone }}</span>
            </div>

            <div class="meta-item">
              <span class="label">Ngày đăng ký</span>
              <span class="value">{{ new Date(company.createdAt).toLocaleDateString('vi-VN') }}</span>
            </div>

            <div class="meta-item">
              <span class="label">Mã số thuế</span>
              <span class="value">{{ company.taxCode || 'Chưa cập nhật' }}</span>
            </div>
          </div>

          <div v-if="company.status === 'pending'" class="company-actions-bottom">
            <button @click="updateCompanyStatus(company.id, 'approved')" class="btn btn-primary">Duyệt</button>
            <button @click="updateCompanyStatus(company.id, 'rejected')" class="btn btn-danger">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-companies {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.companies-header {
  margin-bottom: 3rem;
}

.companies-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.companies-header p {
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

.companies-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.company-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.company-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.company-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.company-logo {
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

.company-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.company-email {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.company-contact {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.company-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.company-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.company-status.approved {
  background: #dcfce7;
  color: #166534;
}

.company-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.company-actions {
  display: flex;
  gap: 1rem;
}

.company-meta {
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

.company-actions-bottom {
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
  .company-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .company-actions {
    justify-content: flex-start;
  }
  
  .company-actions-bottom {
    justify-content: flex-start;
  }
}
</style>