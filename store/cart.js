export const state = () => ({
    cart: [],
    cartKey: null,
    loading: false,
    error: null
})

export const mutations = {
    SET_CART(state, items) {
        state.cart = items
    },
    SET_CART_KEY(state, key) {
        state.cartKey = key
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
            const data = response.body || response.data || response
            const items = data.items || data.cart?.items || data
            commit('SET_CART', Array.isArray(items) ? items : [])

            // Also update cart key if returned in get cart
            if (response.cart_key) {
                commit('SET_CART_KEY', response.cart_key)
                localStorage.setItem('cart_key', response.cart_key)
            }
        } catch (error) {
            console.error('Fetch cart failed', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async addToCart({ commit, dispatch }, { product, quantity, variantId }) {
        try {
            const response = await this.$cartService.addToCart(product.id, quantity, variantId)

            if (response.cart_key) {
                commit('SET_CART_KEY', response.cart_key)
                localStorage.setItem('cart_key', response.cart_key)
            }

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
    },

    initCart({ commit }) {
        const cartKey = localStorage.getItem('cart_key')
        if (cartKey) {
            commit('SET_CART_KEY', cartKey)
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
