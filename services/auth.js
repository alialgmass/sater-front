export default (context) => {
    const { $axios } = context

    return {
        register(data) {
            return $axios.$post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            })
        },

        login(email, password, deviceName = 'web') {
            return $axios.$post('/auth/login', {
                email,
                password,
                device_name: deviceName
            })
        },

        logout() {
            return $axios.$post('/auth/logout')
        },

        getProfile() {
            return $axios.$get('/profile')
        },

        updateProfile(data) {
            return $axios.$put('/profile', data)
        }
    }
}
