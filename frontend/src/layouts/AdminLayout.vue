<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const sidebarCollapsed = ref(false)
const fullName = computed(() => authStore.fullName)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: 'layout-dashboard' },
  { name: 'Quản lý Users', path: '/admin/users', icon: 'users' },
  { name: 'Quản lý Jobs', path: '/admin/jobs', icon: 'briefcase' },
  { name: 'Quản lý Companies', path: '/admin/companies', icon: 'building' },
  { name: 'Blog', path: '/admin/blog', icon: 'file-text' },
  { name: 'Analytics', path: '/admin/analytics', icon: 'bar-chart' },
  { name: 'Cài đặt', path: '/admin/settings', icon: 'settings' }
]
</script>

<template>
  <div class="admin-layout" :class="{ collapsed: sidebarCollapsed }">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <router-link to="/admin/dashboard" class="logo">
          <span class="logo-icon">💼</span>
          <span v-if="!sidebarCollapsed" class="logo-text">Admin</span>
        </router-link>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span v-if="!sidebarCollapsed" class="nav-name">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="sidebarCollapsed = !sidebarCollapsed" class="collapse-btn">
          <span>{{ sidebarCollapsed ? '→' : '←' }}</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="main-area">
      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <h2 class="page-title">{{ route.name || 'Dashboard' }}</h2>
        </div>

        <div class="header-right">
          <div class="user-info">
            <span class="user-avatar">👤</span>
            <span class="user-name">{{ fullName }}</span>
          </div>
          <button @click="handleLogout" class="btn btn-outline">
            Đăng xuất
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f3f4f6;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.admin-layout.collapsed .sidebar {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.active {
  background: rgba(255, 140, 66, 0.15);
  color: #ff8c42;
  border-left-color: #ff8c42;
}

.nav-icon {
  font-size: 1.1rem;
  min-width: 24px;
}

.nav-name {
  font-weight: 500;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.collapse-btn {
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Main Area */
.main-area {
  flex: 1;
  margin-left: 260px;
  transition: margin-left 0.3s ease;
}

.admin-layout.collapsed .main-area {
  margin-left: 70px;
}

/* Top Header */
.top-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar {
  font-size: 1.25rem;
}

.user-name {
  font-weight: 500;
  color: #374151;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
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

/* Page Content */
.page-content {
  padding: 2rem;
  min-height: calc(100vh - 73px);
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }

  .main-area {
    margin-left: 70px;
  }

  .nav-name {
    display: none;
  }

  .top-header {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.25rem;
  }
}
</style>