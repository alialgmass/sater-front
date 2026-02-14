import createAuthService from '~/services/auth'
import createProductService from '~/services/products'
import createCartService from '~/services/cart'
import createWishlistService from '~/services/wishlist'
import createOrderService from '~/services/orders'

export default (context, inject) => {
    const authService = createAuthService(context)
    const productService = createProductService(context)
    const cartService = createCartService(context)
    const wishlistService = createWishlistService(context)
    const orderService = createOrderService(context)

    inject('authService', authService)
    inject('productService', productService)
    inject('cartService', cartService)
    inject('wishlistService', wishlistService)
    inject('orderService', orderService)
}
