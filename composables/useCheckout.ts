import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'
import { Cart } from './useCart'
import { Address } from './useAddresses'

// Shipping method type
export interface ShippingMethod {
  id: number
  name: string
  description: string
  cost: number
  estimated_days: number
  is_available: boolean
}

// Payment method type
export interface PaymentMethod {
  id: number
  name: string
  type: string
  is_enabled: boolean
  icon?: string
}

// Order type
export interface Order {
  id: number
  user_id: number
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  billing_address: Address
  shipping_address: Address
  shipping_method?: ShippingMethod
  payment_method?: PaymentMethod
  items: Array<{
    id: number
    product_id: number
    product: any
    quantity: number
    price: number
    total: number
  }>
  created_at: string
  updated_at: string
}

// Checkout session data
export interface CheckoutSession {
  cart: Cart
  shipping_address: Address
  billing_address: Address
  shipping_method?: ShippingMethod
  payment_method?: PaymentMethod
  coupon_code?: string
  total: number
}

// Checkout payload
export interface CheckoutPayload {
  shipping_address_id?: number
  billing_address_id?: number
  shipping_method_id?: number
  payment_method_id?: number
  coupon_code?: string
  save_billing_as_shipping?: boolean
}

/**
 * Composable for checkout operations
 */
export const useCheckout = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Start checkout session
   */
  const startCheckout = async (cartId: number, customerId: number): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/start`, {
        method: 'POST',
        body: { cart_id: cartId, customer_id: customerId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Select shipping address for checkout
   */
  const selectShippingAddress = async (addressId: number, sessionId: string): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/address`, {
        method: 'POST',
        body: { address_id: addressId, checkout_session_id: sessionId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Set billing address for checkout
   */
  const setBillingAddress = async (addressId: number): Promise<CheckoutSession> => {
    try {
      const response = await $fetch<CheckoutSession>(`${baseUrl}/api/checkout/billing-address`, {
        method: 'PUT',
        body: { address_id: addressId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Select shipping method for checkout
   */
  const selectShippingMethod = async (methodId: number, sessionId: string): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/shipping`, {
        method: 'POST',
        body: { shipping_method_id: methodId, checkout_session_id: sessionId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Select payment method for checkout
   */
  const selectPaymentMethod = async (paymentMethod: string, gateway: string, sessionId: string): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/payment`, {
        method: 'POST',
        body: { 
          payment_method: paymentMethod, 
          gateway: gateway, 
          checkout_session_id: sessionId 
        },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Apply coupon to checkout
   */
  const applyCoupon = async (couponCode: string, sessionId: string): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/coupon`, {
        method: 'POST',
        body: { coupon_code: couponCode, checkout_session_id: sessionId },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Remove coupon from checkout
   */
  const removeCoupon = async (): Promise<CheckoutSession> => {
    try {
      const response = await $fetch<CheckoutSession>(`${baseUrl}/api/checkout/coupon`, {
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
   * Get available shipping methods
   */
  const getShippingMethods = async (): Promise<ShippingMethod[]> => {
    try {
      const response = await $fetch<ShippingMethod[]>(`${baseUrl}/api/checkout/shipping-methods`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get available payment methods
   */
  const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
    try {
      const response = await $fetch<PaymentMethod[]>(`${baseUrl}/api/checkout/payment-methods`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Place order
   */
  const placeOrder = async (checkoutData: CheckoutPayload): Promise<Order> => {
    try {
      const response = await $fetch<Order>(`${baseUrl}/api/checkout/place-order`, {
        method: 'POST',
        body: checkoutData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get checkout summary
   */
  const getSummary = async (sessionId: string): Promise<CheckoutSession> => {
    try {
      const response = await $fetch<CheckoutSession>(`${baseUrl}/api/checkout/summary?session_id=${sessionId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Confirm checkout
   */
  const confirmCheckout = async (sessionId: string, termsAccepted = true): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/checkout/confirm`, {
        method: 'POST',
        body: { checkout_session_id: sessionId, terms_accepted: termsAccepted },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  return {
    initializeCheckout,
    setShippingAddress,
    setBillingAddress,
    setShippingMethod,
    setPaymentMethod,
    applyCoupon,
    removeCoupon,
    getShippingMethods,
    getPaymentMethods,
    placeOrder,
    getSummary,
  }
}