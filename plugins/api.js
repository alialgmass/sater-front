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
        return config
    })

    // Response interceptor
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
