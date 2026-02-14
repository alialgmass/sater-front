export const state = () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
})

export const mutations = {
    SET_USER(state, user) {
        state.user = user
        state.isAuthenticated = !!user
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    LOGOUT(state) {
        state.user = null
        state.token = null
        state.isAuthenticated = false
    }
}

export const actions = {
    async login({ commit }, { email, password }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const response = await this.$authService.login(email, password)

            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))

            commit('SET_TOKEN', response.token)
            commit('SET_USER', response.user)
            return response
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Login failed')
            throw error
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async register({ commit }, userData) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const response = await this.$authService.register(userData)

            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))

            commit('SET_TOKEN', response.token)
            commit('SET_USER', response.user)
            return response
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Registration failed')
            throw error
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async logout({ commit }) {
        try {
            await this.$authService.logout()
        } catch (error) {
            console.error('Logout API call failed', error)
        } finally {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            commit('LOGOUT')
        }
    },

    initAuth({ commit }) {
        const token = localStorage.getItem('auth_token')
        const user = JSON.parse(localStorage.getItem('user'))

        if (token && user) {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
        }
    }
}
