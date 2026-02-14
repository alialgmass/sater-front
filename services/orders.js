export default (context) => {
    const { $axios } = context

    return {
        checkout(orderData) {
            return $axios.$post('/orders/checkout', orderData)
        },

        getOrders() {
            return $axios.$get('/orders')
        },

        getOrder(orderNumber) {
            return $axios.$get(`/orders/${orderNumber}`)
        },

        trackOrder(orderNumber) {
            return $axios.$get(`/orders/${orderNumber}/track`)
        }
    }
}
