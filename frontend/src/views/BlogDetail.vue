<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store'
import api from '../services/api'

const route = useRoute()
const article = ref(null)
const isLoading = ref(false)
const relatedArticles = ref([])

const loadArticle = async () => {
  isLoading.value = true
  try {
    const response = await api.get(`/blog/${route.params.id}`)
    article.value = response.data
    
    // Load related articles
    const relatedResponse = await api.get(`/blog/${route.params.id}/related`)
    relatedArticles.value = relatedResponse.data
  } catch (error) {
    console.error('Error loading article:', error)
  } finally {
    isLoading.value = false
  }
}

const saveArticle = async () => {
  if (!store.isAuthenticated) {
    // Redirect to login
    return
  }
  
  try {
    await api.post(`/blog/${article.value.id}/save`)
    store.addNotification({
      type: 'success',
      message: 'Lưu bài viết thành công!'
    })
  } catch (error) {
    console.error('Error saving article:', error)
    store.addNotification({
      type: 'error',
      message: 'Có lỗi xảy ra khi lưu bài viết'
    })
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<template>
  <div class="blog-detail">
    <div class="container">
      <div v-if="isLoading" class="loading">Đang tải...</div>
      
      <div v-else-if="!article" class="not-found">
        <h2>Không tìm thấy bài viết</h2>
        <p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <router-link to="/blog" class="btn btn-primary">Quay lại blog</router-link>
      </div>

      <div v-else class="article-content">
        <!-- Article Header -->
        <div class="article-header">
          <div class="article-meta">
            <span class="category">{{ article.category }}</span>
            <span class="date">{{ new Date(article.createdAt).toLocaleDateString('vi-VN') }}</span>
            <span class="author">bởi {{ article.author }}</span>
          </div>
          <h1>{{ article.title }}</h1>
          <div class="article-actions">
            <button @click="saveArticle" class="btn btn-outline">Lưu bài viết</button>
            <button class="btn btn-outline">Chia sẻ</button>
          </div>
        </div>

        <!-- Article Image -->
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
        </div>

        <!-- Article Content -->
        <div class="article-body">
          <div class="content">
            <div v-for="paragraph in article.content.split('\n\n')" :key="paragraph" class="paragraph">
              <p v-if="!paragraph.startsWith('##')">{{ paragraph }}</p>
              <h2 v-else>{{ paragraph.replace('##', '') }}</h2>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="article.tags && article.tags.length > 0" class="article-tags">
            <h3>Tags:</h3>
            <div class="tags-list">
              <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>

          <!-- Author Info -->
          <div class="author-info">
            <div class="author-header">
              <img :src="article.authorAvatar" :alt="article.author" class="author-avatar" />
              <div class="author-details">
                <h4>{{ article.author }}</h4>
                <p>{{ article.authorBio }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Articles -->
        <div v-if="relatedArticles.length > 0" class="related-articles">
          <h3>Bài viết liên quan</h3>
          <div class="articles-grid">
            <div v-for="related in relatedArticles" :key="related.id" class="article-card">
              <div class="article-image">
                <img :src="related.image" :alt="related.title" />
              </div>
              <div class="article-content">
                <div class="article-meta">
                  <span class="category">{{ related.category }}</span>
                  <span class="date">{{ new Date(related.createdAt).toLocaleDateString('vi-VN') }}</span>
                </div>
                <h3>{{ related.title }}</h3>
                <p class="excerpt">{{ related.excerpt }}</p>
                <router-link :to="`/blog/${related.id}`" class="btn btn-primary">Đọc tiếp</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-detail {
  padding: 2rem 0;
}

.loading,
.not-found {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

.not-found h2 {
  margin-bottom: 1rem;
  color: #1f2937;
}

.article-header {
  margin-bottom: 3rem;
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

.article-header h1 {
  margin: 0 0 2rem 0;
  font-size: 3rem;
  line-height: 1.2;
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

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.article-image {
  margin-bottom: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.article-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.article-body {
  margin-bottom: 4rem;
}

.content {
  line-height: 1.8;
  color: #374151;
}

.paragraph {
  margin-bottom: 2rem;
}

.paragraph h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.paragraph p {
  font-size: 1.1rem;
  margin: 0;
  color: #4b5563;
}

.article-tags {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.article-tags h3 {
  margin: 0 0 1rem 0;
  color: #374151;
  font-size: 1.1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.author-info {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.author-header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.author-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.author-details p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

.related-articles {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.related-articles h3 {
  margin: 0 0 2rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  height: 150px;
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

.date {
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
  margin-bottom: 1.5rem;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 2rem;
  }
  
  .article-image {
    height: 250px;
  }
  
  .author-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>