import type { LoginRequest, RegisterRequest, User } from './types'
import type { ApiResponse } from '@/shared/api/types'
import axiosInstance from '@/shared/api/http'

// Login API - Backend trả về ApiResponse nên cần lấy response.data để có ApiResponse
export const login = async (credentials: LoginRequest): Promise<any> => {
  const response = await axiosInstance.post('/auth/login', credentials)
  // Backend trả về { success, message, data } - trả về toàn bộ response
  return response.data
}

// Get data from response - helper
export const getData = (response: any) => {
  return response?.data
}

// Register API (general)
export const register = async (userData: RegisterRequest): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>('/auth/register', userData)
  return response.data
}

// Register as Job Seeker
export const registerJobSeeker = async (userData: RegisterRequest): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>('/auth/register-jobseeker', userData)
  return response.data
}

// Register as Employer/Company
export const registerEmployer = async (userData: RegisterRequest): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>('/auth/register-company', userData)
  return response.data
}

// Get current user API
export const getCurrentUser = async (): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.get<ApiResponse<any>>('/auth/me')
  return response.data
}

// Update profile API
export const updateProfile = async (profileData: Partial<User>): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.put<ApiResponse<any>>('/auth/profile', profileData)
  return response.data
}

// Logout API
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout')
}

// Refresh token API
export const refreshToken = async (token: string): Promise<ApiResponse<any>> => {
  const response = await axiosInstance.post<ApiResponse<any>>('/auth/refresh', { token })
  return response.data
}

// Forgot password API - request OTP
export const forgotPassword = async (email: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post<ApiResponse<void>>('/auth/request-reset-password', { email })
  return response.data
}

// Reset password with OTP API
export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post<ApiResponse<void>>('/auth/reset-password', { email, otp, newPassword })
  return response.data
}

// Verify email with OTP API
export const verifyEmail = async (email: string, otp: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post<ApiResponse<void>>('/auth/verify-otp', { email, otp })
  return response.data
}

// Change password API (requires auth)
export const changePassword = async (username: string, currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post<ApiResponse<void>>('/auth/change-password', { 
    username, 
    currentPassword, 
    newPassword 
  })
  return response.data
}
