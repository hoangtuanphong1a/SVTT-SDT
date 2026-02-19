<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const fullName = computed(() => authStore.fullName)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const menuItems = [
  { name: 'Trang chủ', path: '/', icon: 'home' },
  { name: 'Việc làm', path: '/jobs', icon: 'briefcase' },
  { name: 'Công ty', path: '/companies', icon: 'building' },
  { name: 'Blog', path: '/blog', icon: 'book-open' }
]
</script>

<template>
  <div class="default-layout">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <!-- Logo -->
          <router-link to="/" class="logo">
            <span class="logo-icon">💼</span>
            <span class="logo-text">Job<span class="logo-accent">Portal</span></span>
          </router-link>

          <!-- Navigation -->
          <nav class="nav">
            <router-link
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="nav-link"
              :class="{ active: route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </nav>

          <!-- Auth Actions -->
          <div class="auth-actions">
            <template v-if="isAuthenticated">
              <div class="user-menu">
                <span class="user-greeting">Xin chào, {{ fullName }}</span>
                <button @click="handleLogout" class="btn btn-outline">
                  Đăng xuất
                </button>
              </div>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-outline">
                Đăng nhập
              </router-link>
              <router-link to="/register" class="btn btn-primary">
                Đăng ký
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <span class="logo-icon">💼</span>
              <span class="logo-text">Job<span class="logo-accent">Portal</span></span>
            </div>
            <p class="footer-description">
              Nền tảng tuyển dụng hàng đầu Việt Nam. Kết nối nhà tuyển dụng và ứng viên tài năng.
            </p>
          </div>
          
          <div class="footer-section">
            <h4>Liên kết</h4>
            <ul>
              <li><router-link to="/jobs">Việc làm</router-link></li>
              <li><router-link to="/companies">Công ty</router-link></li>
              <li><router-link to="/blog">Blog</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4>Liên hệ</h4>
            <p>📍 TP. Hồ Chí Minh, Việt Nam</p>
            <p>📧 info@jobportal.com</p>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} JobPortal. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.75rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.logo-accent {
  color: #ff8c42;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.active {
  color: #ff8c42;
}

.auth-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  color: #4b5563;
  font-weight: 500;
}

/* Buttons */
.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a3d 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 140, 66, 0.3);
}

.btn-outline {
  background: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

/* Main */
.main {
  flex: 1;
  background: #f9fafb;
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  color: #d1d5db;
  padding: 3rem 0 1.5rem;
  margin-top: auto;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-logo .logo-text {
  color: white;
}

.footer-description {
  color: #9ca3af;
  line-height: 1.6;
}

.footer-section h4 {
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: #ff8c42;
}

.footer-section p {
  margin-bottom: 0.5rem;
  color: #9ca3af;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1.5rem;
  text-align: center;
}

.footer-bottom p {
  color: #6b7280;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>