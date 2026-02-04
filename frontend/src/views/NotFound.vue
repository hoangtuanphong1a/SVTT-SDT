<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  // Auto-redirect to home after 5 seconds
  setTimeout(() => {
    goHome()
  }, 5000)
})
</script>

<template>
  <div class="not-found">
    <div class="container">
      <div class="error-content">
        <div class="error-icon">404</div>
        <h1>Oops! Trang không tồn tại</h1>
        <p>Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.</p>
        
        <div class="error-actions">
          <button @click="goHome" class="btn btn-primary">Quay về trang chủ</button>
          <button @click="goBack" class="btn btn-outline">Quay lại</button>
        </div>

        <div class="error-info">
          <p>Một trang mới sẽ tự động chuyển hướng sau 5 giây...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.container {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.error-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 4rem 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.error-icon {
  font-size: 8rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.error-content h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.error-content p {
  margin: 0 0 3rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid white;
  color: white;
}

.btn-outline:hover {
  background: white;
  color: #667eea;
}

.error-info {
  opacity: 0.8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .error-content {
    padding: 3rem 1.5rem;
  }
  
  .error-icon {
    font-size: 6rem;
  }
  
  .error-content h1 {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>