import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElNotification } from 'element-plus'
import type { User, LoginRequest, RegisterRequest } from './types'
import * as authApi from './api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role || null)
  const fullName = computed(() => user.value?.fullName || '')
  const userId = computed(() => user.value?.id || '')

  // Actions
  async function login(credentials: LoginRequest) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.login(credentials)
      
      // response is ApiResponse: { success, message, data }
      if (response && response.success && response.data) {
        const authData = response.data
        const newToken = authData.token
        
        token.value = newToken
        
        // Build user object from response
        const userData: User = {
          id: authData.id?.toString() || '',
          uuid: authData.uuid || '',
          username: authData.username || '',
          email: authData.email || '',
          fullName: authData.fullName || authData.username || '',
          role: authData.role || 'JOB_SEEKER',
          isVerified: authData.isVerified || false,
          isActive: true
        }
        
        user.value = userData

        // Save to localStorage
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))

        console.log('Login success - Role:', userData.role)
        console.log('User data:', userData)

        // Show success notification
        ElNotification({
          title: 'Thành công',
          message: 'Đăng nhập thành công!',
          type: 'success',
          duration: 3000
        })

        // Redirect based on role
        if (userData.role === 'ADMIN') {
          console.log('Redirecting to admin dashboard')
          router.push('/admin/dashboard')
        } else if (userData.role === 'EMPLOYER') {
          console.log('Redirecting to employer dashboard')
          router.push('/employer/dashboard')
        } else {
          console.log('Redirecting to home')
          router.push('/')
        }
        
        return userData
      } else {
        throw new Error(response?.message || 'Đăng nhập thất bại')
      }
    } catch (err: any) {
      error.value = err.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(userDataReq: RegisterRequest) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.register(userDataReq)
      
      if (response && response.success && response.data) {
        const authData = response.data
        const newToken = authData.token
        
        token.value = newToken
        
        // Build user object from response
        const userRes: User = {
          id: authData.id?.toString() || '',
          uuid: authData.uuid || '',
          username: authData.username || '',
          email: authData.email || '',
          fullName: authData.fullName || authData.username || '',
          role: authData.role || 'JOB_SEEKER',
          isVerified: authData.isVerified || false,
          isActive: true
        }
        
        user.value = userRes

        // Save to localStorage
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userRes))

        // Show success notification
        ElNotification({
          title: 'Thành công',
          message: 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.',
          type: 'success',
          duration: 3000
        })

        // Redirect to login
        router.push('/login')
        
        return userRes
      } else {
        throw new Error(response?.message || 'Đăng ký thất bại')
      }
    } catch (err: any) {
      error.value = err.message || 'Đăng ký thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    // Clear state
    token.value = null
    refreshToken.value = null
    user.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')

    // Redirect to login
    router.push('/login')
  }

  async function getCurrentUser() {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.getCurrentUser()
      if (response && response.success && response.data) {
        const authData = response.data
        const userData: User = {
          id: authData.id?.toString() || '',
          uuid: authData.uuid || '',
          username: authData.username || '',
          email: authData.email || '',
          fullName: authData.fullName || authData.username || '',
          role: authData.role || 'JOB_SEEKER',
          isVerified: authData.isVerified || false,
          isActive: true
        }
        
        user.value = userData
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      }
    } catch (err: any) {
      error.value = err.message || 'Không thể lấy thông tin người dùng'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(profileData: Partial<User>) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.updateProfile(profileData)
      if (response && response.success && response.data) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
      }
    } catch (err: any) {
      error.value = err.message || 'Cập nhật thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function initializeAuth() {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      try {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
        refreshToken.value = localStorage.getItem('refreshToken')
      } catch {
        // Invalid stored data
        logout()
      }
    }
  }

  // Initialize on store creation
  initializeAuth()

  return {
    // State
    user,
    token,
    refreshToken,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    userRole,
    fullName,
    userId,
    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
    clearError,
  }
})
