export const state = () => ({
    cart: [],
    loading: false,
    error: null
})

export const mutations = {
    SET_CART(state, items) {
        state.cart = items
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    }
}

export const actions = {
    async fetchCart({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$cartService.getCart()
            commit('SET_CART', response.items || [])
        } catch (error) {
            console.error('Fetch cart failed', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async addToCart({ dispatch }, { product, quantity, variantId }) {
        try {
            await this.$cartService.addToCart(product.id, quantity, variantId)
            await dispatch('fetchCart')
        } catch (error) {
            console.error('Add to cart failed', error)
            throw error
        }
    },

    async updateQuantity({ dispatch }, { itemId, quantity }) {
        try {
            await this.$cartService.updateCartItem(itemId, quantity)
            await dispatch('fetchCart')
        } catch (error) {
            console.error('Update quantity failed', error)
        }
    },

    async removeProductFromCart({ dispatch }, itemId) {
        try {
            await this.$cartService.removeFromCart(itemId)
            await dispatch('fetchCart')
        } catch (error) {
            console.error('Remove from cart failed', error)
        }
    }
}

export const getters = {
    cartItemCount: state => state.cart.length,
    getCart: state => state.cart,
    getTotal: state => {
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
}
