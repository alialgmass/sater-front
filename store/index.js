import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    // Compare still uses local state for now
    compare: []
})

export const getters = {
    // Bridge getters to modules
    getProducts: state => state.products.products,
    getNewProducts: (state, getters) => getters['products/getNewProducts'],
    getBestProducts: (state, getters) => getters['products/getBestProducts'],
    getSaleProducts: (state, getters) => getters['products/getSaleProducts'],
    getCart: state => state.cart.cart,
    cartItemCount: (state, getters) => getters['cart/cartItemCount'],
    getWishlist: state => state.wishlist ? state.wishlist.wishlist : [],
    getCompare: state => state.compare,
    wishlistItemCount: state => (state.wishlist && state.wishlist.wishlist) ? state.wishlist.wishlist.length : 0,
    compareItemCount: state => (state.compare || []).length,
    getTotal: (state, getters) => getters['cart/getTotal'] || 0,

    categoryList: state => state.products.categories || [],
    colorList: (state, getters) => getters['products/getColors'] || [],
    sizeList: (state, getters) => getters['products/getSizes'] || [],
    tagList: (state, getters) => getters['products/getTags'] || [],
}

export const mutations = {
    ADD_TO_COMPARE(state, product) {
        const item = state.compare.find(el => product.id === el.id)
        if (item) return
        state.compare.push(product)
    },

    REMOVE_FROM_COMPARE(state, product) {
        state.compare = state.compare.filter(item => product.id !== item.id);
    },
}

export const actions = {
    addToCompare({ commit }, payload) {
        commit('ADD_TO_COMPARE', payload)
    },

    removeFromCompare({ commit }, product) {
        commit('REMOVE_FROM_COMPARE', product)
    },
}

