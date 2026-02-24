import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'
import { Product } from './useProducts'

// Search filters
export interface SearchFilters {
  category?: number | string
  brand?: number | string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  on_sale?: boolean
  sort_by?: 'relevance' | 'price_low' | 'price_high' | 'newest' | 'best_selling' | 'rating'
  page?: number
  per_page?: number
}

// Search response
export interface SearchResponse {
  data: Product[]
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
  aggregations?: {
    categories?: Array<{ id: number; name: string; count: number }>
    brands?: Array<{ id: number; name: string; count: number }>
    price_ranges?: Array<{ min: number; max: number; count: number }>
  }
  suggestions?: string[]
}

// Autocomplete response
export interface AutocompleteResponse {
  products: Array<{
    id: number
    name: string
    slug: string
    image: string
    price: number
  }>
  suggestions: string[]
}

/**
 * Composable for search operations
 */
export const useSearch = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Perform full text search with filters
   */
  const searchProducts = async (
    query: string,
    filters?: SearchFilters
  ): Promise<SearchResponse> => {
    try {
      const params = new URLSearchParams()
      params.append('q', query)
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value))
          }
        })
      }

      const queryString = params.toString()
      const url = `${baseUrl}/api/v1/search/products?${queryString}`

      const response = await $fetch<SearchResponse>(url, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get autocomplete suggestions
   */
  const autocompleteProducts = async (query: string): Promise<AutocompleteResponse> => {
    try {
      const response = await $fetch<AutocompleteResponse>(
        `${baseUrl}/api/v1/search/autocomplete?term=${encodeURIComponent(query)}`,
        {
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get recent searches for authenticated user
   */
  const getRecentSearches = async (): Promise<string[]> => {
    try {
      const response = await $fetch<string[]>(`${baseUrl}/api/v1/search/history`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Clear recent searches for authenticated user
   */
  const clearRecentSearches = async (): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/v1/search/history`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get popular search terms
   */
  const getPopularSearches = async (limit = 10): Promise<string[]> => {
    try {
      const response = await $fetch<string[]>(`${baseUrl}/api/search/popular?limit=${limit}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get trending products based on search activity
   */
  const getTrendingProducts = async (limit = 10): Promise<Product[]> => {
    try {
      const response = await $fetch<Product[]>(`${baseUrl}/api/search/trending?limit=${limit}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  return {
    searchProducts,
    autocompleteProducts,
    getRecentSearches,
    clearRecentSearches,
    getPopularSearches,
    getTrendingProducts,
  }
}