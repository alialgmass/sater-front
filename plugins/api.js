export default function ({ $axios, redirect, store }) {
    // Set default headers
    $axios.setHeader('Content-Type', 'application/json')
    $axios.setHeader('Accept', 'application/json')

    // Request interceptor
    $axios.onRequest(config => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`
        }

        const cartKey = localStorage.getItem('cart_key')
        if (cartKey) {
            config.headers.common['X-Cart-Key'] = cartKey
        }
        return config
    })

    // Response interceptor
    $axios.onResponse(response => {
        const data = response.data

        // If it's the unified structure
        if (data && typeof data === 'object' && 'status' in data && 'custom_code' in data) {
            // Handle as error only if status is false AND it's not a success code (like 2000)
            if (data.status === false && data.custom_code !== 2000) {
                const error = new Error(data.message || 'API Error')
                error.response = response
                return Promise.reject(error)
            }

            // Unwrap body if it exists
            if (data.body) {
                response.data = data.body
            }
        }

        return response
    })

    // Error interceptor
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
            // Clear local storage and redirect to login
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            redirect('/login-register')
        }
        return Promise.reject(error)
    })
}
