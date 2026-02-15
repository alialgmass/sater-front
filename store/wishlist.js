export const state = () => ({
    wishlist: [],
    loading: false
})

export const mutations = {
    SET_WISHLIST(state, items) {
        state.wishlist = items
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

export const actions = {
    async fetchWishlist({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$wishlistService.getWishlist()
            const items = response.items || response.wishlist?.data || response.wishlist || response
            commit('SET_WISHLIST', Array.isArray(items) ? items : [])
        } catch (error) {
            console.error('Fetch wishlist failed', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async addToWishlist({ dispatch }, productId) {
        try {
            await this.$wishlistService.addToWishlist(productId)
            await dispatch('fetchWishlist')
        } catch (error) {
            console.error('Add to wishlist failed', error)
        }
    },

    async removeFromWishlist({ dispatch }, productId) {
        try {
            await this.$wishlistService.removeFromWishlist(productId)
            await dispatch('fetchWishlist')
        } catch (error) {
            console.error('Remove from wishlist failed', error)
        }
    }
}
