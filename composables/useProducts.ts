import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

export interface Color {
  id: number
  name: string
  hex_code: string
}

export interface Size {
  id: number
  name: string
  abbreviation: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

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
  colors?: Color[]
  sizes?: Size[]
  tags?: Tag[]
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

// Product filters
export interface ProductFilters {
  category?: number | string
  brand?: number | string
  color_id?: number | string
  size_id?: number | string
  tag_id?: number | string
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
/**
 * Composable for product operations
 */
export const useProducts = (context: any) => {
  const { $axios } = context

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
      const url = `/v1/products${queryString ? '?' + queryString : ''}`

      const response = await $axios.$get(url)

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
      const response = await $axios.$get(`/products/${productId}`)
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
      const response = await $axios.$get(`/products/featured?limit=${limit}`)
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
      const response = await $axios.$get(`/products/newest?limit=${limit}`)
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
      const response = await $axios.$get(`/products/on-sale?limit=${limit}`)
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
      const response = await $axios.$get(`/products/${productId}/related?limit=${limit}`)
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
      const url = `/categories/${categoryId}/products${queryString ? '?' + queryString : ''}`

      const response = await $axios.$get(url)

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