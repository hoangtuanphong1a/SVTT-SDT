// User roles enum
export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYER = 'EMPLOYER',
  JOB_SEEKER = 'JOB_SEEKER',
  USER = 'USER'
}

// User status enum
export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  BANNED = 'BANNED'
}

// User interface
export interface User {
  id: string
  uuid: string
  username: string
  email: string
  fullName: string
  role: UserRole
  isVerified: boolean
  isActive: boolean
}

// Login request
export interface LoginRequest {
  username: string
  password: string
}

// Login response
export interface LoginResponse {
  id: string
  uuid: string
  token: string
  username: string
  email: string
  fullName: string
  role: string
  isVerified: boolean
}

// Register request
export interface RegisterRequest {
  username: string
  email: string
  password: string
  fullName: string
}

// Register response
export interface RegisterResponse {
  id: string
  uuid: string
  token: string
  username: string
  email: string
  fullName: string
  role: string
  isVerified: boolean
}

// Auth state
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Auth actions
export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  getCurrentUser: () => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<void>
  clearError: () => void
}