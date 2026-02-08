import { useCookie, useRuntimeConfig } from '#app'

/**
 * Get the base API URL from runtime config
 */
export const getApiBaseUrl = (): string => {
  const config = useRuntimeConfig()
  return config.public.apiBase || 'http://localhost:8000'
}

/**
 * Get authorization headers with Bearer token if available
 */
export const getAuthHeaders = (): Record<string, string> => {
  const token = useCookie('customer_token').value
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = useCookie('customer_token').value
  return !!token
}

/**
 * Type for API error response
 */
export interface ApiError {
  message: string
  statusCode?: number
  data?: any
}

/**
 * Generic error handler for API responses
 */
export const handleApiError = (error: any): ApiError => {
  console.error('API Error:', error)
  
  if (error.data) {
    return {
      message: error.data.message || 'An error occurred',
      statusCode: error.status,
      data: error.data
    }
  }
  
  return {
    message: error.message || 'An unexpected error occurred',
    statusCode: error.status
  }
}