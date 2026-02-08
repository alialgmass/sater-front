import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'
import { Order } from './useCheckout'

// Order status filter
export type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

// Order filters
export interface OrderFilters {
  status?: OrderStatus
  date_from?: string
  date_to?: string
  sort_by?: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc'
  page?: number
  per_page?: number
}

// Order response with pagination
export interface OrderResponse {
  data: Order[]
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
 * Composable for order operations
 */
export const useOrders = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all orders for the authenticated user
   */
  const getOrders = async (filters?: OrderFilters): Promise<OrderResponse> => {
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
      const url = `${baseUrl}/api/v1/orders${queryString ? '?' + queryString : ''}`

      const response = await $fetch<OrderResponse>(url, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get a specific order by ID
   */
  const getOrder = async (orderId: number): Promise<Order> => {
    try {
      const response = await $fetch<Order>(`${baseUrl}/api/v1/orders/${orderId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Cancel an order
   */
  const cancelOrder = async (orderId: number): Promise<Order> => {
    try {
      const response = await $fetch<Order>(`${baseUrl}/api/orders/${orderId}/cancel`, {
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
   * Track order shipment
   */
  const trackOrder = async (orderId: number): Promise<{ tracking_number?: string; carrier?: string; status: string; updates: Array<{ date: string; status: string; location?: string }> }> => {
    try {
      const response = await $fetch(`${baseUrl}/api/orders/${orderId}/track`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Request invoice for an order
   */
  const requestInvoice = async (orderId: number): Promise<{ download_url: string }> => {
    try {
      const response = await $fetch<{ download_url: string }>(`${baseUrl}/api/orders/${orderId}/invoice`, {
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
   * Get order count by status
   */
  const getOrderCounts = async (): Promise<Record<OrderStatus, number>> => {
    try {
      const response = await $fetch<Record<OrderStatus, number>>(`${baseUrl}/api/orders/count`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Reorder items from a previous order
   */
  const reorder = async (orderId: number): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/orders/${orderId}/reorder`, {
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
    getOrders,
    getOrder,
    cancelOrder,
    trackOrder,
    requestInvoice,
    getOrderCounts,
    reorder,
  }
}