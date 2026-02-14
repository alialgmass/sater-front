export default (context) => {
    const { $axios } = context

    return {
        getWishlist() {
            return $axios.$get('/wishlist')
        },

        addToWishlist(productId) {
            return $axios.$post('/wishlist', { product_id: productId })
        },

        removeFromWishlist(productId) {
            return $axios.$delete(`/wishlist/${productId}`)
        }
    }
}
