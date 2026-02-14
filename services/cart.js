export default (context) => {
    const { $axios } = context

    return {
        getCart() {
            return $axios.$get('/cart')
        },

        addToCart(productId, quantity, variantId = null) {
            return $axios.$post('/cart/add', {
                product_id: productId,
                quantity,
                variant_id: variantId
            })
        },

        updateCartItem(itemId, quantity) {
            return $axios.$put(`/cart/items/${itemId}`, { quantity })
        },

        removeFromCart(itemId) {
            return $axios.$delete(`/cart/items/${itemId}`)
        },

        clearCart() {
            return $axios.$delete('/cart/clear')
        }
    }
}
