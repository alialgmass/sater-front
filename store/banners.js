export const state = () => ({
    banners: []
})

export const mutations = {
    SET_BANNERS(state, banners) {
        state.banners = banners
    }
}

export const actions = {
    async fetchBanners({ commit }) {
        try {
            const response = await this.$bannerService.getBanners()
            // Axios interceptor unwraps body. API returns { status, message, custom_code, body: { banners: [] } }
            // So response here is { banners: [] }
            const banners = response.banners || []
            commit('SET_BANNERS', banners)
        } catch (error) {
            console.error('Error fetching banners:', error)
        }
    }
}
