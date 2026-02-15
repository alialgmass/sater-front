export default (context) => {
    const { $axios } = context

    return {
        checkout(orderData) {
            return $axios.$post('/v1/orders', orderData)
        },

        getOrders() {
            return $axios.$get('/v1/orders')
        },

        getOrder(orderId) {
            return $axios.$get(`/v1/orders/${orderId}`)
        },
    }
}
