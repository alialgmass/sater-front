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
    getNewProducts: state => state.products.filter(item => item.is_new) || [],
    getBestProducts: state => state.products.filter(item => item.is_featured) || [],
    getSaleProducts: state => state.products.filter(item => item.sale_price) || [],
}

export const actions = {
    async fetchProducts({ commit }, params) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$productService.getProducts(params)
            commit('SET_PRODUCTS', response.data)
            commit('SET_PAGINATION', response.meta)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchProduct({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            const product = await this.$productService.getProduct(id)
            commit('SET_PRODUCT', product)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchCategories({ commit }) {
        try {
            const categories = await this.$productService.getCategories()
            commit('SET_CATEGORIES', categories)
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    }
}
