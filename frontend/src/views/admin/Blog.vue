<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../../store'
import api from '../../services/api'

const posts = ref([])
const isLoading = ref(false)
const error = ref('')
const searchQuery = ref('')
const selectedStatus = ref('')

const loadPosts = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const response = await api.get('/admin/blog', {
      params: {
        q: searchQuery.value,
        status: selectedStatus.value
      }
    })
    posts.value = response.data
  } catch (err) {
    console.error('Error loading posts:', err)
    error.value = 'Tải danh sách bài viết thất bại. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}

const updatePostStatus = async (postId, status) => {
  try {
    await api.put(`/admin/blog/${postId}/status`, { status })
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.status = status
      post.statusLabel = status === 'published' ? 'Đã đăng' : status === 'draft' ? 'Nháp' : 'Bị từ chối'
    }
    store.addNotification({
      type: 'success',
      message: 'Cập nhật trạng thái bài viết thành công!'
    })
  } catch (err) {
    console.error('Error updating post status:', err)
    store.addNotification({
      type: 'error',
      message: 'Cập nhật trạng thái bài viết thất bại. Vui lòng thử lại.'
    })
  }
}

const deletePost = async (postId) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
    return
  }

  try {
    await api.delete(`/admin/blog/${postId}`)
    posts.value = posts.value.filter(post => post.id !== postId)
    store.addNotification({
      type: 'success',
      message: 'Xóa bài viết thành công!'
    })
  } catch (err) {
    console.error('Error deleting post:', err)
    store.addNotification({
      type: 'error',
      message: 'Xóa bài viết thất bại. Vui lòng thử lại.'
    })
  }
}

const searchPosts = () => {
  loadPosts()
}

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <div class="admin-blog">
    <div class="container">
      <div class="blog-header">
        <h1>Quản lý Blog</h1>
        <p>Quản lý các bài viết blog và bài viết tin tức</p>
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
              placeholder="Nhập tiêu đề bài viết, tác giả hoặc nội dung..."
              @input="searchPosts"
            />
          </div>

          <div class="filter-group">
            <label for="status">Trạng thái</label>
            <select id="status" v-model="selectedStatus" @change="searchPosts">
              <option value="">Tất cả trạng thái</option>
              <option value="draft">Nháp</option>
              <option value="published">Đã đăng</option>
              <option value="rejected">Bị từ chối</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="posts.length === 0" class="no-results">
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>Không có bài viết</h3>
          <p>Không tìm thấy bài viết nào phù hợp với tiêu chí tìm kiếm</p>
        </div>
      </div>
      <div v-else class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="post-info">
              <div class="post-image" v-if="post.imageUrl">
                <img :src="post.imageUrl" alt="Post image" />
              </div>
              <div class="post-details">
                <h4>{{ post.title }}</h4>
                <p class="post-author">Tác giả: {{ post.author }}</p>
                <p class="post-meta">{{ post.category }} • {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</p>
                <span class="post-status" :class="post.status">{{ post.statusLabel }}</span>
              </div>
            </div>
            <div class="post-actions">
              <button class="btn btn-outline">Xem chi tiết</button>
              <button @click="deletePost(post.id)" class="btn btn-danger">Xóa</button>
            </div>
          </div>

          <div class="post-content">
            <p>{{ post.excerpt }}</p>
          </div>

          <div v-if="post.status === 'draft'" class="post-actions-bottom">
            <button @click="updatePostStatus(post.id, 'published')" class="btn btn-primary">Đăng bài</button>
            <button @click="updatePostStatus(post.id, 'rejected')" class="btn btn-danger">Từ chối</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-blog {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.blog-header {
  margin-bottom: 3rem;
}

.blog-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  color: #1f2937;
}

.blog-header p {
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

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.post-info {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.post-image {
  width: 120px;
  height: 80px;
  border-radius: 0.375rem;
  overflow: hidden;
  flex-shrink: 0;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-details h4 {
  margin: 0 0 0.25rem 0;
  color: #1f2937;
}

.post-author {
  margin: 0 0 0.25rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.post-meta {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.post-status {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.post-status.draft {
  background: #fef3c7;
  color: #92400e;
}

.post-status.published {
  background: #dcfce7;
  color: #166534;
}

.post-status.rejected {
  background: #fee2e2;
  color: #dc2626;
}

.post-actions {
  display: flex;
  gap: 1rem;
}

.post-content {
  margin-bottom: 2rem;
}

.post-content p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.post-actions-bottom {
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
  .post-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-actions {
    justify-content: flex-start;
  }
  
  .post-actions-bottom {
    justify-content: flex-start;
  }
}
</style>