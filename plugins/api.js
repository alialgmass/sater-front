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
        // Handle application-level errors (status: false)
        if (response.data && response.data.status === false) {
            const error = new Error(response.data.message || 'API Error')
            error.response = response
            return Promise.reject(error)
        }

        // If the structured response is present, unwrap the body into response.data
        if (response.data && response.data.status === true && response.data.body) {
            response.data = response.data.body
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
