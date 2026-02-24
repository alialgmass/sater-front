import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'
import { Vendor, Product, ProductFilters, ProductResponse } from './api/types'

/**
 * Composable for vendor operations
 */
export const useVendors = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all vendors
   */
  const getVendors = async (): Promise<Vendor[]> => {
    try {
      const response = await $fetch<Vendor[]>(`${baseUrl}/api/v1/vendors`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get a specific vendor by ID
   */
  const getVendor = async (vendorId: number): Promise<Vendor> => {
    try {
      const response = await $fetch<Vendor>(`${baseUrl}/api/vendors/${vendorId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get products from a specific vendor
   */
  const getVendorProducts = async (
    vendorId: number,
    filters?: Omit<ProductFilters, 'vendor'>
  ): Promise<ProductResponse> => {
    try {
      const params = new URLSearchParams()
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value))
          }
        })
      }

      const queryString = params.toString()
      const url = `${baseUrl}/api/vendors/${vendorId}/products${
        queryString ? '?' + queryString : ''
      }`

      const response = await $fetch<ProductResponse>(url, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Search vendors
   */
  const searchVendors = async (query: string): Promise<Vendor[]> => {
    try {
      const response = await $fetch<Vendor[]>(
        `${baseUrl}/api/v1/vendors/search?q=${encodeURIComponent(query)}`,
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
   * Get vendor by slug
   */
  const getVendorBySlug = async (slug: string): Promise<Vendor> => {
    try {
      const response = await $fetch<Vendor>(`${baseUrl}/api/vendors/slug/${slug}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get vendor orders (for vendor panel)
   */
  const getVendorOrders = async (): Promise<any[]> => {
    try {
      const response = await $fetch<any[]>(
        `${baseUrl}/api/vendor/orders`,
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
   * Get vendor statistics
   */
  const getVendorStats = async (vendorId: number): Promise<{
    total_sales: number
    total_orders: number
    avg_rating: number
    products_count: number
    revenue_chart: Array<{ month: string; sales: number }>
  }> => {
    try {
      const response = await $fetch(
        `${baseUrl}/api/vendors/${vendorId}/stats`,
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
    getVendors,
    getVendor,
    getVendorProducts,
    searchVendors,
    getVendorBySlug,
    getVendorOrders,
    getVendorStats,
  }
}