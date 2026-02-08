import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

// Payment intent response
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'requires_capture' | 'canceled' | 'succeeded'
  client_secret: string
  payment_method_types: string[]
}

// Payment method type
export interface PaymentMethod {
  id: string
  type: string
  brand?: string
  last4?: string
  exp_month?: number
  exp_year?: number
  holder_name?: string
  is_default: boolean
}

// Payment verification response
export interface PaymentVerification {
  success: boolean
  transaction_id: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  amount: number
  currency: string
  payment_method: string
  created_at: string
}

// Payment initiation payload
export interface InitiatePaymentPayload {
  order_id: number
  amount: number
  currency: string
  payment_method: string
  return_url?: string
  cancel_url?: string
}

/**
 * Composable for payment operations
 */
export const usePayments = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Initiate a payment for an order
   */
  const initiatePayment = async (paymentData: {
    customer_id: number;
    vendor_order_id: number;
    amount: number;
    currency: string;
    method: string;
    gateway: string;
    customer_email: string;
    customer_name: string;
    description: string;
    return_url: string;
    cancel_url: string;
  }): Promise<any> => {
    try {
      const response = await $fetch(`${baseUrl}/api/payments/initiate`, {
        method: 'POST',
        body: paymentData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Verify a payment after completion
   */
  const verifyPayment = async (verificationData: {
    transaction_id: string;
    reference_id: string;
    gateway: string;
  }): Promise<any> => {
    try {
      const response = await $fetch(
        `${baseUrl}/api/payments/verify`,
        {
          method: 'POST',
          body: verificationData,
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
   * Get payment status by order number
   */
  const getPaymentStatusByOrder = async (orderNumber: string): Promise<any> => {
    try {
      const response = await $fetch(
        `${baseUrl}/api/payments/orders/${orderNumber}/status`,
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
   * Get available payment methods for user
   */
  const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
    try {
      const response = await $fetch<PaymentMethod[]>(`${baseUrl}/api/payments/methods`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Add a new payment method
   */
  const addPaymentMethod = async (paymentMethodData: any): Promise<PaymentMethod> => {
    try {
      const response = await $fetch<PaymentMethod>(`${baseUrl}/api/payments/methods`, {
        method: 'POST',
        body: paymentMethodData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Set a payment method as default
   */
  const setDefaultPaymentMethod = async (methodId: string): Promise<PaymentMethod[]> => {
    try {
      const response = await $fetch<PaymentMethod[]>(
        `${baseUrl}/api/payments/methods/${methodId}/set-default`,
        {
          method: 'POST',
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
   * Remove a payment method
   */
  const removePaymentMethod = async (methodId: string): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/payments/methods/${methodId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Process refund for an order
   */
  const processRefund = async (orderId: number, reason?: string): Promise<{ success: boolean; refund_id: string; amount_refunded: number }> => {
    try {
      const response = await $fetch(`${baseUrl}/api/payments/refund`, {
        method: 'POST',
        body: { order_id: orderId, reason },
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get payment history for user
   */
  const getPaymentHistory = async (): Promise<PaymentVerification[]> => {
    try {
      const response = await $fetch<PaymentVerification[]>(`${baseUrl}/api/payments/history`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  return {
    initiatePayment,
    verifyPayment,
    getPaymentMethods,
    addPaymentMethod,
    setDefaultPaymentMethod,
    removePaymentMethod,
    processRefund,
    getPaymentHistory,
  }
}