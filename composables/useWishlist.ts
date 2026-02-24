import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'
import { Product } from './useProducts'

// Wishlist item type
export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  product: Product
  added_at: string
}

/**
 * Composable for wishlist operations
 */
export const useWishlist = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all items in the user's wishlist
   */
  const getWishlist = async (): Promise<WishlistItem[]> => {
    try {
      const response = await $fetch<WishlistItem[]>(`${baseUrl}/api/wishlist`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Add a product to the wishlist
   */
  const addToWishlist = async (productId: number): Promise<WishlistItem> => {
    try {
      const response = await $fetch<WishlistItem>(`${baseUrl}/api/wishlist`, {
        method: 'POST',
        body: { product_id: productId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Remove an item from the wishlist
   */
  const removeFromWishlist = async (productId: number): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Move an item from wishlist to cart
   */
  const moveToCart = async (productId: number): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/wishlist/${productId}/move-to-cart`, {
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
   * Share wishlist with others (returns a shareable link)
   */
  const shareWishlist = async (): Promise<{ link: string }> => {
    try {
      const response = await $fetch<{ link: string }>(`${baseUrl}/api/wishlist/share`, {
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
   * Check if a product is in the wishlist
   */
  const isInWishlist = async (productId: number): Promise<boolean> => {
    try {
      const wishlist = await getWishlist()
      return wishlist.some(item => item.product_id === productId)
    } catch (error: any) {
      console.error('Error checking wishlist status:', error)
      return false
    }
  }

  /**
   * Get wishlist count
   */
  const getWishlistCount = async (): Promise<number> => {
    try {
      const wishlist = await getWishlist()
      return wishlist.length
    } catch (error: any) {
      console.error('Error getting wishlist count:', error)
      return 0
    }
  }

  return {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    shareWishlist,
    isInWishlist,
    getWishlistCount,
  }
}