import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

// Define product type
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description?: string
  sku: string
  price: number
  sale_price?: number
  stock_quantity: number
  in_stock: boolean
  is_active: boolean
  images: string[]
  category_id: number
  brand_id?: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  attributes?: Record<string, any>
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

// Product filters
export interface ProductFilters {
  category?: number | string
  brand?: number | string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  on_sale?: boolean
  search?: string
  sort_by?: 'price_low' | 'price_high' | 'newest' | 'best_selling' | 'rating'
  page?: number
  per_page?: number
}

// Product response with pagination
export interface ProductResponse {
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
  links: {
    first?: string
    last?: string
    prev?: string
    next?: string
  }
}

/**
 * Composable for product operations
 */
export const useProducts = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all products with optional filters
   */
  const getProducts = async (filters?: ProductFilters): Promise<ProductResponse> => {
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
      const url = `${baseUrl}/api/v1/products${queryString ? '?' + queryString : ''}`

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
   * Get a single product by ID
   */
  const getProduct = async (productId: number): Promise<Product> => {
    try {
      const response = await $fetch<Product>(`${baseUrl}/api/products/${productId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get featured products
   */
  const getFeaturedProducts = async (limit = 10): Promise<Product[]> => {
    try {
      const response = await $fetch<Product[]>(`${baseUrl}/api/products/featured?limit=${limit}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get newest products
   */
  const getNewestProducts = async (limit = 10): Promise<Product[]> => {
    try {
      const response = await $fetch<Product[]>(`${baseUrl}/api/products/newest?limit=${limit}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get products on sale
   */
  const getOnSaleProducts = async (limit = 10): Promise<Product[]> => {
    try {
      const response = await $fetch<Product[]>(`${baseUrl}/api/products/on-sale?limit=${limit}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get related products
   */
  const getRelatedProducts = async (productId: number, limit = 6): Promise<Product[]> => {
    try {
      const response = await $fetch<Product[]>(
        `${baseUrl}/api/products/${productId}/related?limit=${limit}`,
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
   * Get products by category
   */
  const getProductsByCategory = async (
    categoryId: number,
    filters?: Omit<ProductFilters, 'category'>
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
      const url = `${baseUrl}/api/categories/${categoryId}/products${
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

  return {
    getProducts,
    getProduct,
    getFeaturedProducts,
    getNewestProducts,
    getOnSaleProducts,
    getRelatedProducts,
    getProductsByCategory,
  }
}