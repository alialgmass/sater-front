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

export const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated
    },
    user(state) {
        return state.user
    }
}

export const actions = {
    async login({ commit }, { email, password }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const response = await this.$authService.login(email, password)

            const token = response.token || response.access_token
            const user = response.customer || response.user || (response.email ? response : null) || response

            if (token) {
                localStorage.setItem('auth_token', token)
                commit('SET_TOKEN', token)
            }
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                commit('SET_USER', user)
            }

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
            const token = response.token || response.access_token
            const user = response.customer || response.user || (response.email ? response : null) || response

            if (token) {
                localStorage.setItem('auth_token', token)
                commit('SET_TOKEN', token)
            }
            if (user) {
                localStorage.setItem('user', JSON.stringify(user))
                commit('SET_USER', user)
            }

            return response
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Registration failed')
            throw error
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchProfile({ commit }) {
        commit('SET_LOADING', true)
        try {
            const response = await this.$authService.getProfile()
            const user = response.customer || response.user || response

            commit('SET_USER', user)
            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (error) {
            console.error('Fetch profile failed', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async updateProfile({ commit }, profileData) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const response = await this.$authService.updateProfile(profileData)
            const user = response.customer || response.user || response

            commit('SET_USER', user)
            localStorage.setItem('user', JSON.stringify(user))
            return user
        } catch (error) {
            commit('SET_ERROR', error.response?.data?.message || 'Profile update failed')
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
