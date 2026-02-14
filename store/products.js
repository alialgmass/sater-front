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
    getNewProducts: state => (state.products || []).filter(item => item.is_new || item.new) || [],
    getBestProducts: state => (state.products || []).filter(item => item.is_featured || item.best) || [],
    getSaleProducts: state => (state.products || []).filter(item => item.sale_price || (item.discount && item.discount > 0)) || [],
}

export const actions = {
    async fetchProducts({ commit }, params) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$productService.getProducts(params)
            const products = response.data || response
            commit('SET_PRODUCTS', Array.isArray(products) ? products : [])
            if (response.meta) {
                commit('SET_PAGINATION', response.meta)
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
            const categoryData = categories.data || categories
            commit('SET_CATEGORIES', Array.isArray(categoryData) ? categoryData : [])
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    }
}
