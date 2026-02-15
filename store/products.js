export const state = () => ({
    products: [],
    product: null,
    categories: [],
    featuredProducts: [],
    loading: false,
    error: null,
    pagination: null
})

export const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_PRODUCT(state, product) {
        state.product = product
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories
    },
    SET_FEATURED_PRODUCTS(state, products) {
        state.featuredProducts = products
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    SET_PAGINATION(state, pagination) {
        state.pagination = pagination
    }
}

export const getters = {
    getNewProducts: state => {
        const products = state.products || []
        const filtered = products.filter(item => item.is_new || item.new)
        // If no products have the 'new' flag, just return the first few as a fallback
        return filtered.length > 0 ? filtered : products.slice(0, 8)
    },
    getBestProducts: state => {
        const products = state.products || []
        const filtered = products.filter(item => item.is_featured || item.best)
        // If no products have the 'featured' flag, return the products slice
        return filtered.length > 0 ? filtered : products.slice(0, 8)
    },
    getSaleProducts: state => {
        const products = state.products || []
        return products.filter(item => item.discounted_price || item.sale_price || (item.discount && item.discount > 0))
    },
}

export const actions = {
    async fetchProducts({ commit }, params) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$productService.getProducts(params)

            // Handle deeply nested structure: response.body.products.data
            let products = []
            let meta = null

            if (response.body && response.body.products) {
                products = response.body.products.data || []
                meta = response.body.products.paginate || null
            } else {
                products = response.data || response
                meta = response.meta || null
            }

            commit('SET_PRODUCTS', Array.isArray(products) ? products : [])
            if (meta) {
                commit('SET_PAGINATION', meta)
            }
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchProduct({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$productService.getProduct(id)
            const product = (response.body && response.body.product) ? response.body.product : (response.body || response.data || response)
            commit('SET_PRODUCT', product)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchCategories({ commit }) {
        try {
            const response = await this.$productService.getCategories()
            let categories = []

            if (response.body && response.body.categories) {
                categories = response.body.categories
            } else {
                categories = response.data || response
            }

            commit('SET_CATEGORIES', Array.isArray(categories) ? categories : [])
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    }
}
