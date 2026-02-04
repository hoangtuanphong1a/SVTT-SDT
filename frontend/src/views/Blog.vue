<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../store'
import api from '../services/api'

const articles = ref([])
const isLoading = ref(false)
const filters = ref({
  keyword: '',
  category: '',
  author: ''
})

const loadArticles = async () => {
  isLoading.value = true
  try {
    const params = { ...filters.value }
    const response = await api.get('/blog', { params })
    articles.value = response.data
  } catch (error) {
    console.error('Error loading articles:', error)
  } finally {
    isLoading.value = false
  }
}

const applyFilters = () => {
  loadArticles()
}

onMounted(() => {
  loadArticles()
})
</script>

<template>
  <div class="blog">
    <div class="container">
      <div class="header">
        <h1>Blog nghề nghiệp</h1>
        <p>Chia sẻ kinh nghiệm, tin tức và xu hướng nghề nghiệp mới nhất</p>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label for="keyword">Tìm kiếm</label>
          <input 
            id="keyword" 
            v-model="filters.keyword" 
            type="text" 
            placeholder="Nhập từ khóa tìm kiếm..."
            @keyup.enter="applyFilters"
          />
        </div>
        
        <div class="filter-group">
          <label for="category">Chủ đề</label>
          <select id="category" v-model="filters.category">
            <option value="">Tất cả chủ đề</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Tài chính">Tài chính</option>
            <option value="Y tế">Y tế</option>
            <option value="Giáo dục">Giáo dục</option>
            <option value="Kinh doanh">Kinh doanh</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="author">Tác giả</label>
          <select id="author" v-model="filters.author">
            <option value="">Tất cả tác giả</option>
            <option value="Admin">Admin</option>
            <option value="Chuyên gia">Chuyên gia</option>
            <option value="Cộng tác viên">Cộng tác viên</option>
          </select>
        </div>

        <button @click="applyFilters" class="btn btn-primary">Tìm kiếm</button>
      </div>

      <!-- Articles -->
      <div v-if="isLoading" class="loading">Đang tải...</div>
      <div v-else-if="articles.length === 0" class="no-results">
        <p>Chưa có bài viết nào</p>
      </div>
      <div v-else class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-image">
            <img :src="article.image" :alt="article.title" />
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span class="category">{{ article.category }}</span>
              <span class="date">{{ new Date(article.createdAt).toLocaleDateString('vi-VN') }}</span>
              <span class="author">bởi {{ article.author }}</span>
            </div>
            <h3>{{ article.title }}</h3>
            <p class="excerpt">{{ article.excerpt }}</p>
            <div class="article-actions">
              <router-link :to="`/blog/${article.id}`" class="btn btn-primary">Đọc tiếp</router-link>
              <button class="btn btn-outline">Lưu bài viết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog {
  padding: 2rem 0;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  color: #6b7280;
  font-size: 1.1rem;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #374151;
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

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-image {
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.category {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.date,
.author {
  color: #6b7280;
  font-size: 0.875rem;
}

.article-content h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  line-height: 1.4;
}

.excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.article-actions {
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

.loading,
.no-results {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.no-results p {
  font-size: 1.2rem;
}
</style>