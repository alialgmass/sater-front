import { useCookie, navigateTo, useRuntimeConfig } from '#app'
import { getApiBaseUrl, getAuthHeaders, handleApiError } from './helpers'

// Define user type
export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  created_at: string
  updated_at: string
}

// Login credentials
export interface LoginCredentials {
  email: string
  password: string
}

// Registration data
export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// Login response
export interface LoginResponse {
  user: User
  token: string
}

/**
 * Composable for authentication operations
 */
export const useAuth = () => {
  const baseUrl = getApiBaseUrl()
  const tokenCookie = useCookie('customer_token')

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      // Add device_name to credentials as required by API
      const loginData = {
        ...credentials,
        device_name: 'web_app'
      }
      
      const response = await $fetch<LoginResponse>(`${baseUrl}/api/login`, {
        method: 'POST',
        body: loginData,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Store token in cookie
      tokenCookie.value = response.token

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Register a new user
   */
  const register = async (userData: RegisterData): Promise<LoginResponse> => {
    try {
      const response = await $fetch<LoginResponse>(`${baseUrl}/api/register`, {
        method: 'POST',
        body: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Store token in cookie
      tokenCookie.value = response.token

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Logout user and clear token
   */
  const logout = async (): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      console.warn('Logout failed:', error)
      // Continue with logout even if API call fails
    } finally {
      // Clear token cookie regardless of API response
      tokenCookie.value = null
    }
  }

  /**
   * Get current user profile
   */
  const getProfile = async (): Promise<User> => {
    try {
      const response = await $fetch<User>(`${baseUrl}/api/profile`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await $fetch<User>(`${baseUrl}/api/profile`, {
        method: 'PUT',
        body: userData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = (): boolean => {
    return !!tokenCookie.value
  }

  /**
   * Refresh user token
   */
  const refreshToken = async (): Promise<string> => {
    try {
      const response = await $fetch<{ token: string }>(`${baseUrl}/api/refresh`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      // Update token in cookie
      tokenCookie.value = response.token

      return response.token
    } catch (error: any) {
      const apiError = handleApiError(error)
      // If refresh fails, clear the token
      tokenCookie.value = null
      throw apiError
    }
  }

  return {
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    isAuthenticated,
    refreshToken,
  }
}