export default (context) => {
    const { $axios } = context

    return {
        getProducts(params = {}) {
            return $axios.$get('/v1/products', { params })
        },

        getProduct(id) {
            return $axios.$get(`/products/${id}`)
        },

        searchProducts(query) {
            return $axios.$get('/v1/search/products', { params: { q: query } })
        },

        getCategories() {
            return $axios.$get('/v1/categories')
        },

        getColors() {
            return $axios.$get('/v1/colors')
        },

        getSizes() {
            return $axios.$get('/v1/sizes')
        },

        getTags() {
            return $axios.$get('/v1/tags')
        },

        getFeaturedProducts() {
            return $axios.$get('/products/featured')
        }
    }
}
