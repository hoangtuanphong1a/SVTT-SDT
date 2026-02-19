<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store'

const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const openDropdown = ref(null)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const userName = computed(() => user.value?.fullName || user.value?.username || 'User')

const jobDropdownItems = [
  { label: 'Tất cả việc làm', route: '/jobs', icon: '📋' },
  { label: 'Việc làm mới', route: '/jobs/new', icon: '🆕' },
  { label: 'Việc làm Hot', route: '/jobs/hot', icon: '🔥' },
  { label: 'Việc làm Remote', route: '/jobs/remote', icon: '🏠' },
  { label: 'Việc làm theo ngành', route: '/jobs-by-industry', icon: '💼' }
]

const companyDropdownItems = [
  { label: 'Tất cả công ty', route: '/companies', icon: '🏢' },
  { label: 'Công ty nổi bật', route: '/companies/featured', icon: '⭐' },
  { label: 'Công ty đã xác minh', route: '/companies/verified', icon: '✓' },
  { label: 'Top công ty IT', route: '/companies/it', icon: '💻' },
  { label: 'Top công ty Startup', route: '/companies/startup', icon: '🚀' }
]

const blogDropdownItems = [
  { label: 'Tất cả bài viết', route: '/blog', icon: '📰' },
  { label: 'Kỹ năng mềm', route: '/blog/skills', icon: '🌟' },
  { label: 'CV & Phỏng vấn', route: '/blog/cv-interview', icon: '📝' },
  { label: 'Xu hướng nghề nghiệp', route: '/blog/trends', icon: '📈' },
  { label: 'Chuyện nghề nghiệp', route: '/blog/career', icon: '💡' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const navigateTo = (route) => {
  router.push(route)
  isMenuOpen.value = false
  openDropdown.value = null
}

const toggleDropdown = (dropdown) => {
  openDropdown.value = openDropdown.value === dropdown ? null : dropdown
}

// Close dropdown when clicking outside
const closeDropdown = () => {
  openDropdown.value = null
}

// Click outside handler
const handleClickOutside = (event) => {
  const profileDropdown = document.querySelector('.profile-dropdown')
  if (profileDropdown && !profileDropdown.contains(event.target)) {
    openDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#f26b38] to-[#e05a27] group-hover:shadow-lg transition-shadow">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900 group-hover:text-[#f26b38] transition-colors">CVKing</span>
        </router-link>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <!-- Jobs Dropdown -->
          <div class="relative">
            <button 
              @mouseenter="openDropdown = 'jobs'"
              @click="toggleDropdown('jobs')"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f26b38] transition-colors flex items-center gap-1 rounded-lg hover:bg-orange-50"
            >
              Việc làm
              <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': openDropdown === 'jobs' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="openDropdown === 'jobs'" 
                @mouseenter="openDropdown = 'jobs'"
                class="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-2 overflow-hidden"
              >
                <div class="px-4 py-2 bg-orange-50 border-b border-orange-100">
                  <span class="text-xs font-medium text-orange-600">🎯 Tìm kiếm cơ hội</span>
                </div>
                <button 
                  v-for="item in jobDropdownItems" 
                  :key="item.route" 
                  @click="navigateTo(item.route)"
                  class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                >
                  <span class="text-lg">{{ item.icon }}</span>
                  {{ item.label }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Companies Dropdown -->
          <div class="relative">
            <button 
              @mouseenter="openDropdown = 'companies'"
              @click="toggleDropdown('companies')"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f26b38] transition-colors flex items-center gap-1 rounded-lg hover:bg-orange-50"
            >
              Công ty
              <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': openDropdown === 'companies' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="openDropdown === 'companies'" 
                @mouseenter="openDropdown = 'companies'"
                class="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-2 overflow-hidden"
              >
                <div class="px-4 py-2 bg-orange-50 border-b border-orange-100">
                  <span class="text-xs font-medium text-orange-600">🏢 Khám phá doanh nghiệp</span>
                </div>
                <button 
                  v-for="item in companyDropdownItems" 
                  :key="item.route" 
                  @click="navigateTo(item.route)"
                  class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                >
                  <span class="text-lg">{{ item.icon }}</span>
                  {{ item.label }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Blog Dropdown -->
          <div class="relative">
            <button 
              @mouseenter="openDropdown = 'blog'"
              @click="toggleDropdown('blog')"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f26b38] transition-colors flex items-center gap-1 rounded-lg hover:bg-orange-50"
            >
              Blog
              <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': openDropdown === 'blog' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div 
                v-if="openDropdown === 'blog'" 
                @mouseenter="openDropdown = 'blog'"
                class="absolute top-full left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-2 overflow-hidden"
              >
                <div class="px-4 py-2 bg-orange-50 border-b border-orange-100">
                  <span class="text-xs font-medium text-orange-600">📚 Kiến thức nghề nghiệp</span>
                </div>
                <button 
                  v-for="item in blogDropdownItems" 
                  :key="item.route" 
                  @click="navigateTo(item.route)"
                  class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                >
                  <span class="text-lg">{{ item.icon }}</span>
                  {{ item.label }}
                </button>
              </div>
            </Transition>
          </div>

          <router-link 
            to="/cv-builder" 
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 rounded-lg transition-colors"
          >
            Tạo CV
          </router-link>
        </nav>
        
        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center gap-3">
          <template v-if="!isAuthenticated">
            <router-link 
              to="/login" 
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 rounded-lg transition-colors"
            >
              Đăng nhập
            </router-link>
            <router-link 
              to="/register" 
              class="px-5 py-2.5 text-sm font-medium bg-[#f26b38] text-white rounded-lg hover:bg-[#e05a27] shadow-sm hover:shadow transition-all"
            >
              Đăng ký
            </router-link>
          </template>
          <template v-else>
            <!-- Profile Dropdown -->
            <div class="relative profile-dropdown">
              <button 
                @click="toggleDropdown('profile')"
                class="flex items-center gap-3 px-3 py-1.5 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div class="w-8 h-8 bg-[#f26b38] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm font-medium text-gray-700 hidden lg:block">{{ userName }}</span>
                <svg class="h-4 w-4 text-gray-500 transition-transform duration-200" :class="{ 'rotate-180': openDropdown === 'profile' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
              <div 
                v-if="openDropdown === 'profile'"
                class="absolute top-full right-0 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-2 overflow-hidden"
              >
                  <!-- User Info -->
                  <div class="px-4 py-3 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                    <p class="text-xs text-gray-500">{{ user.value?.email }}</p>
                  </div>
                  
                  <!-- Menu Items -->
                  <div class="py-1">
                    <router-link 
                      to="/jobseeker/profile" 
                      @click="openDropdown = null"
                      class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                      Quản lý thông tin cá nhân
                    </router-link>
                    
                    <router-link 
                      to="/jobseeker/dashboard" 
                      @click="openDropdown = null"
                      class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                      </svg>
                      Dashboard
                    </router-link>
                    
                    <router-link 
                      to="/jobseeker/applications" 
                      @click="openDropdown = null"
                      class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Đơn ứng tuyển
                    </router-link>
                    
                    <router-link 
                      to="/jobseeker/saved-jobs" 
                      @click="openDropdown = null"
                      class="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f26b38] flex items-center gap-3 transition-colors"
                    >
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                      </svg>
                      Việc làm đã lưu
                    </router-link>
                  </div>
                  
                  <!-- Divider -->
                  <div class="border-t border-gray-100 my-1"></div>
                  
                  <!-- Logout -->
                  <button 
                    @click="handleLogout"
                    class="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          <router-link 
            to="/post-job" 
            class="px-5 py-2.5 text-sm font-medium bg-[#f26b38] text-white rounded-lg hover:bg-[#e05a27] shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Đăng tin tuyển dụng
          </router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          class="md:hidden p-2 text-gray-700 hover:text-[#f26b38] transition-colors"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-orange-100">
          <nav class="flex flex-col gap-1">
            <!-- Jobs Mobile -->
            <div class="rounded-lg">
              <button 
                @click="toggleDropdown('jobs-mobile')"
                class="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 flex items-center justify-between rounded-lg transition-colors"
              >
                <span class="flex items-center gap-2">
                  <span>💼</span> Việc làm
                </span>
                <svg 
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-180': openDropdown === 'jobs-mobile' }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="openDropdown === 'jobs-mobile'" class="ml-4 mt-1 border-l-2 border-orange-100 pl-3">
                  <button 
                    v-for="item in jobDropdownItems" 
                    :key="item.route" 
                    @click="navigateTo(item.route)"
                    class="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:text-[#f26b38] hover:bg-orange-50 flex items-center gap-2 rounded-lg transition-colors"
                  >
                    <span>{{ item.icon }}</span>
                    {{ item.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Companies Mobile -->
            <div class="rounded-lg">
              <button 
                @click="toggleDropdown('companies-mobile')"
                class="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 flex items-center justify-between rounded-lg transition-colors"
              >
                <span class="flex items-center gap-2">
                  <span>🏢</span> Công ty
                </span>
                <svg 
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-180': openDropdown === 'companies-mobile' }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="openDropdown === 'companies-mobile'" class="ml-4 mt-1 border-l-2 border-orange-100 pl-3">
                  <button 
                    v-for="item in companyDropdownItems" 
                    :key="item.route" 
                    @click="navigateTo(item.route)"
                    class="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:text-[#f26b38] hover:bg-orange-50 flex items-center gap-2 rounded-lg transition-colors"
                  >
                    <span>{{ item.icon }}</span>
                    {{ item.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Blog Mobile -->
            <div class="rounded-lg">
              <button 
                @click="toggleDropdown('blog-mobile')"
                class="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 flex items-center justify-between rounded-lg transition-colors"
              >
                <span class="flex items-center gap-2">
                  <span>📚</span> Blog
                </span>
                <svg 
                  class="h-4 w-4 transition-transform duration-200" 
                  :class="{ 'rotate-180': openDropdown === 'blog-mobile' }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="openDropdown === 'blog-mobile'" class="ml-4 mt-1 border-l-2 border-orange-100 pl-3">
                  <button 
                    v-for="item in blogDropdownItems" 
                    :key="item.route" 
                    @click="navigateTo(item.route)"
                    class="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:text-[#f26b38] hover:bg-orange-50 flex items-center gap-2 rounded-lg transition-colors"
                  >
                    <span>{{ item.icon }}</span>
                    {{ item.label }}
                  </button>
                </div>
              </Transition>
            </div>

            <router-link 
              to="/cv-builder" 
              class="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>📝</span> Tạo CV
            </router-link>
            
            <router-link 
              to="/post-job" 
              class="px-4 py-3 text-sm font-medium bg-[#f26b38] text-white rounded-lg hover:bg-[#e05a27] transition-colors flex items-center gap-2 justify-center"
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Đăng tin tuyển dụng
            </router-link>
            
            <div class="border-t border-gray-200 mt-2 pt-2 flex gap-3">
              <template v-if="!isAuthenticated">
                <router-link 
                  to="/login" 
                  class="flex-1 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:text-[#f26b38] hover:bg-orange-50 border border-gray-300 rounded-lg transition-colors"
                >
                  Đăng nhập
                </router-link>
                <router-link 
                  to="/register" 
                  class="flex-1 px-4 py-2.5 text-center text-sm font-medium bg-[#f26b38] text-white rounded-lg hover:bg-[#e05a27] transition-colors"
                >
                  Đăng ký
                </router-link>
              </template>
              <template v-else>
                <div class="flex-1 px-4 py-2.5 text-center text-sm font-medium text-gray-700 bg-orange-50 rounded-lg">
                  👤 {{ userName }}
                </div>
                <button 
                  @click="handleLogout" 
                  class="flex-1 px-4 py-2.5 text-center text-sm font-medium text-[#f26b38] border border-[#f26b38] rounded-lg hover:bg-orange-50 transition-colors"
                >
                  Đăng xuất
                </button>
              </template>
            </div>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>