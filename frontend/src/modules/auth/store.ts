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
      
      if (response.data) {
        const { token: newToken, user: userData } = response.data
        token.value = newToken
        user.value = userData

        // Save to localStorage
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', JSON.stringify(userData))

        // Show success notification
        ElNotification({
          title: 'Thành công',
          message: 'Đăng nhập thành công!',
          type: 'success',
          duration: 3000
        })

        // Redirect to home
        router.push('/')
        
        return userData
      }
    } catch (err: any) {
      error.value = err.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: RegisterRequest) {
    isLoading.value = true
    error.value = null

    try {
      const response = await authApi.register(userData)
      
      if (response.data) {
        const { token: newToken, user: userRes } = response.data
        token.value = newToken
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
      if (response.data) {
        user.value = response.data
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
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
      if (response.data) {
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
