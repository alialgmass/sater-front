import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

// Define cart item type
export interface CartItem {
  id: number
  product_id: number
  product: any // Product object
  quantity: number
  price: number
  total: number
  options?: Record<string, any>
}

// Define cart type
export interface Cart {
  id: number
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  created_at: string
  updated_at: string
}

// Cart item payload for adding/updating
export interface CartItemPayload {
  product_id: number
  quantity: number
  options?: Record<string, any>
}

/**
 * Composable for cart operations
 */
export const useCart = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get current user's cart
   */
  const getCart = async (): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Add item to cart
   */
  const addItem = async (itemData: { product_id: number; quantity: number; variant_id?: number | null }): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/add`, {
        method: 'POST',
        body: itemData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Update item quantity in cart
   */
  const updateItemQuantity = async (itemId: number, quantity: number): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/items/${itemId}`, {
        method: 'PUT',
        body: { quantity },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get cart items
   */
  const getCartItems = async (): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Remove item from cart
   */
  const removeItem = async (itemId: number): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Save item for later
   */
  const saveForLater = async (itemId: number): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/items/${itemId}/save-for-later`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Clear entire cart
   */
  const clearCart = async (): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/clear`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Apply coupon to cart
   */
  const applyCoupon = async (code: string): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/coupon`, {
        method: 'POST',
        body: { code },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Remove coupon from cart
   */
  const removeCoupon = async (): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/coupon`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Save item for later
   */
  const saveForLater = async (itemId: number): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/items/${itemId}/save-for-later`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Move saved item back to cart
   */
  const moveToCart = async (itemId: number): Promise<Cart> => {
    try {
      const response = await $fetch<Cart>(`${baseUrl}/api/cart/items/${itemId}/move-to-cart`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  return {
    getCart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    saveForLater,
    moveToCart,
  }
}