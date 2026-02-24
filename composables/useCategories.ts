import { getApiBaseUrl, getAuthHeaders, handleApiError } from './helpers'
import { Category } from './types'

/**
 * Composable for category operations
 */
export const useCategories = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all categories
   */
  const getCategories = async (): Promise<Category[]> => {
    try {
      const response = await $fetch<Category[]>(`${baseUrl}/api/v1/categories`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get a specific category by ID
   */
  const getCategory = async (categoryId: number): Promise<Category> => {
    try {
      const response = await $fetch<Category>(`${baseUrl}/api/categories/${categoryId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get child categories of a parent category
   */
  const getChildCategories = async (parentId: number): Promise<Category[]> => {
    try {
      const response = await $fetch<Category[]>(
        `${baseUrl}/api/categories/${parentId}/children`,
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
   * Get top-level categories only
   */
  const getTopLevelCategories = async (): Promise<Category[]> => {
    try {
      const response = await $fetch<Category[]>(`${baseUrl}/api/categories/top`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get categories with their product counts
   */
  const getCategoriesWithCounts = async (): Promise<(Category & { product_count: number })[]> => {
    try {
      const response = await $fetch<(Category & { product_count: number })[]>(
        `${baseUrl}/api/categories/with-counts`,
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
   * Search categories
   */
  const searchCategories = async (query: string): Promise<Category[]> => {
    try {
      const response = await $fetch<Category[]>(
        `${baseUrl}/api/categories/search?q=${encodeURIComponent(query)}`,
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

  return {
    getCategories,
    getCategory,
    getChildCategories,
    getTopLevelCategories,
    getCategoriesWithCounts,
    searchCategories,
  }
}