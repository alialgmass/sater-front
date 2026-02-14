import createAuthService from '~/services/auth'
import createProductService from '~/services/products'

export default (context, inject) => {
    const authService = createAuthService(context)
    const productService = createProductService(context)

    inject('authService', authService)
    inject('productService', productService)
}
