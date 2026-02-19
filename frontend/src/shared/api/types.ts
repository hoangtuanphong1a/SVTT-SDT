// API Response wrapper
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Pagination params
export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Error response
export interface ErrorResponse {
  message: string
  code?: string
  details?: Record<string, string>
}

// API Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: Record<string, string>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}