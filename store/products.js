export const state = () => ({
    products: [],
    product: null,
    categories: [],
    colors: [],
    sizes: [],
    tags: [],
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
    SET_COLORS(state, colors) {
        state.colors = colors
    },
    SET_SIZES(state, sizes) {
        state.sizes = sizes
    },
    SET_TAGS(state, tags) {
        state.tags = tags
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
    getColors: state => state.colors || [],
    getSizes: state => state.sizes || [],
    getTags: state => state.tags || [],
}

export const actions = {
    async fetchProducts({ commit }, params) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$productService.getProducts(params)

            // Interceptor now returns body directly, so response should be { products: { data, paginate } } or { data, meta }
            let products = []
            let meta = null

            if (response.products) {
                products = response.products.data || response.products || []
                meta = response.products.paginate || response.meta || null
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
            const product = response.product || response.data || response
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
            let categories = response.categories || response.data || response
            commit('SET_CATEGORIES', Array.isArray(categories) ? categories : [])
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    },

    async fetchAttributes({ commit }) {
        try {
            const [colorsRes, sizesRes, tagsRes] = await Promise.all([
                this.$productService.getColors(),
                this.$productService.getSizes(),
                this.$productService.getTags()
            ])

            const colors = colorsRes.colors || colorsRes.data || colorsRes || []
            const sizes = sizesRes.sizes || sizesRes.data || sizesRes || []
            const tags = tagsRes.tags || tagsRes.data || tagsRes || []

            commit('SET_COLORS', Array.isArray(colors) ? colors : [])
            commit('SET_SIZES', Array.isArray(sizes) ? sizes : [])
            commit('SET_TAGS', Array.isArray(tags) ? tags : [])
        } catch (error) {
            console.error('Failed to fetch attributes', error)
        }
    }
}
