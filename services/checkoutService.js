export default class CheckoutService {
    constructor(axios) {
        this.axios = axios
        this.baseURL = '/checkout'
    }

    /**
     * Step 1: Start checkout session
     * @param {string} email - Customer email
     * @param {string} phone - Customer phone
     * @param {string} cartKey - Cart key for guest users (optional)
     * @returns {Promise} - Returns session_key
     */
    async startCheckout(email, phone, cartKey = null) {
        const payload = {
            email,
            phone
        }

        if (cartKey) {
            payload.cart_key = cartKey
        }

        const response = await this.axios.post(`${this.baseURL}/start`, payload)
        return response.data
    }

    /**
     * Step 2: Set shipping address
     * @param {string} sessionKey - Checkout session key
     * @param {object} address - Shipping address details
     * @returns {Promise}
     */
    async setShippingAddress(sessionKey, address) {
        const response = await this.axios.post(`${this.baseURL}/address`, {
            session_key: sessionKey,
            address
        })
        return response.data
    }

    /**
     * Step 3: Select shipping method
     * @param {string} sessionKey - Checkout session key
     * @param {string} shippingMethod - "standard" or "express"
     * @returns {Promise}
     */
    async selectShippingMethod(sessionKey, shippingMethod) {
        const response = await this.axios.post(`${this.baseURL}/shipping`, {
            session_key: sessionKey,
            shipping_method: shippingMethod
        })
        return response.data
    }

    /**
     * Step 4: Select payment method
     * @param {string} sessionKey - Checkout session key
     * @param {string} paymentMethod - "cod" or "online"
     * @returns {Promise}
     */
    async selectPaymentMethod(sessionKey, paymentMethod) {
        const response = await this.axios.post(`${this.baseURL}/payment`, {
            session_key: sessionKey,
            payment_method: paymentMethod
        })
        return response.data
    }

    /**
     * Step 5: Apply coupon code
     * @param {string} sessionKey - Checkout session key
     * @param {string} couponCode - Coupon code to apply
     * @returns {Promise}
     */
    async applyCoupon(sessionKey, couponCode) {
        const response = await this.axios.post(`${this.baseURL}/coupon`, {
            session_key: sessionKey,
            coupon_code: couponCode
        })
        return response.data
    }

    /**
     * Step 6: Get checkout summary
     * @param {string} sessionKey - Checkout session key
     * @returns {Promise} - Returns order summary with vendor groups
     */
    async getCheckoutSummary(sessionKey) {
        const response = await this.axios.get(`${this.baseURL}/summary`, {
            params: { session_key: sessionKey }
        })
        return response.data
    }

    /**
     * Step 7: Confirm and place order
     * @param {string} sessionKey - Checkout session key
     * @returns {Promise} - Returns order_number and total_amount
     */
    async confirmOrder(sessionKey) {
        const response = await this.axios.post(`${this.baseURL}/confirm`, {
            session_key: sessionKey
        })
        return response.data
    }
}
