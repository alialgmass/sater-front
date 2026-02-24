import { ref, readonly, watch } from '@vue/composition-api'

// Main checkout composable
export const useCheckout = () => {
  // State management
  const sessionKey = ref(null)
  const checkoutData = ref({})
  const loading = ref(false)
  const error = ref(null)
  
  // Base API URL - adjust as needed for your backend
  const API_BASE = '/api/checkout'
  
  // Helper function to handle API requests
  const apiRequest = async (endpoint, method = 'GET', payload = null, headers = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      }
      
      if (payload) {
        options.body = JSON.stringify(payload)
      }
      
      // Add session key to headers if available
      if (sessionKey.value) {
        options.headers['X-Session-Key'] = sessionKey.value
      }
      
      const response = await fetch(`${API_BASE}${endpoint}`, options)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        // Check for specific error conditions
        if (response.status === 400 && errorData.message && errorData.message.includes('Checkout session expired')) {
          throw new Error('Checkout session expired. Please restart the checkout process.')
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // 1. Start Checkout
  const startCheckout = async (email, phone, cartKey = null, additionalHeaders = {}) => {
    try {
      const payload = {
        email,
        phone,
        ...(cartKey && { cart_key: cartKey })
      }
      
      const headers = {
        ...(cartKey && { 'X-Cart-Key': cartKey }), // Include cart key in header as well
        ...additionalHeaders
      }
      
      const response = await apiRequest('/start', 'POST', payload, headers)
      sessionKey.value = response.session_key
      checkoutData.value = response
      
      return response
    } catch (err) {
      console.error('Start checkout error:', err)
      throw err
    }
  }
  
  // 2. Set Shipping Address
  const setShippingAddress = async (address) => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const payload = {
        session_key: sessionKey.value,
        address
      }
      
      const response = await apiRequest('/address', 'POST', payload)
      checkoutData.value.address = address
      
      return response
    } catch (err) {
      console.error('Set shipping address error:', err)
      throw err
    }
  }
  
  // 3. Select Shipping Method
  const selectShippingMethod = async (shippingMethod) => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const payload = {
        session_key: sessionKey.value,
        shipping_method: shippingMethod
      }
      
      const response = await apiRequest('/shipping', 'POST', payload)
      checkoutData.value.shipping_method = shippingMethod
      
      return response
    } catch (err) {
      console.error('Select shipping method error:', err)
      throw err
    }
  }
  
  // 4. Select Payment Method
  const selectPaymentMethod = async (paymentMethod) => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const payload = {
        session_key: sessionKey.value,
        payment_method: paymentMethod
      }
      
      const response = await apiRequest('/payment', 'POST', payload)
      checkoutData.value.payment_method = paymentMethod
      
      return response
    } catch (err) {
      console.error('Select payment method error:', err)
      throw err
    }
  }
  
  // 5. Apply Coupon (Optional)
  const applyCoupon = async (couponCode) => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const payload = {
        session_key: sessionKey.value,
        coupon_code: couponCode
      }
      
      const response = await apiRequest('/coupon', 'POST', payload)
      checkoutData.value.coupon = couponCode
      
      return response
    } catch (err) {
      console.error('Apply coupon error:', err)
      throw err
    }
  }
  
  // 6. Get Checkout Summary
  const getCheckoutSummary = async () => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const response = await apiRequest(`/summary?session_key=${encodeURIComponent(sessionKey.value)}`, 'GET')
      checkoutData.value.summary = response
      
      return response
    } catch (err) {
      console.error('Get checkout summary error:', err)
      throw err
    }
  }
  
  // 7. Confirm & Place Order
  const confirmOrder = async () => {
    if (!sessionKey.value) {
      throw new Error('No active checkout session')
    }
    
    try {
      const payload = {
        session_key: sessionKey.value
      }
      
      const response = await apiRequest('/confirm', 'POST', payload)
      
      // Clear session after successful order placement
      sessionKey.value = null
      checkoutData.value = {}
      
      return response
    } catch (err) {
      console.error('Confirm order error:', err)
      // Check if it's a session expiry error
      if (err.message.includes('Checkout session expired')) {
        throw new Error('Checkout session expired. Please restart the checkout process.')
      }
      throw err
    }
  }
  
  // Reset checkout state
  const resetCheckout = () => {
    sessionKey.value = null
    checkoutData.value = {}
    loading.value = false
    error.value = null
  }
  
  // Check if session is active
  const isSessionActive = () => {
    return !!sessionKey.value
  }
  
  // Watch for errors that indicate session expiry
  watch(error, (newError) => {
    if (newError && newError.includes && newError.includes('Checkout session expired')) {
      // Optionally emit an event or trigger a global notification
      console.warn('Checkout session expired. Consider resetting the checkout process.')
    }
  })
  
  return {
    // State
    sessionKey: readonly(sessionKey),
    checkoutData: readonly(checkoutData),
    loading: readonly(loading),
    error: readonly(error),
    
    // Methods
    startCheckout,
    setShippingAddress,
    selectShippingMethod,
    selectPaymentMethod,
    applyCoupon,
    getCheckoutSummary,
    confirmOrder,
    resetCheckout,
    isSessionActive
  }
}

// Additional helper composable for guest cart key management
export const useCartKey = () => {
  const CART_KEY_STORAGE_KEY = 'guest_cart_key'
  
  const getCartKey = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(CART_KEY_STORAGE_KEY)
    }
    return null
  }
  
  const setCartKey = (key) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_KEY_STORAGE_KEY, key)
    }
  }
  
  const clearCartKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_KEY_STORAGE_KEY)
    }
  }
  
  return {
    getCartKey,
    setCartKey,
    clearCartKey
  }
}