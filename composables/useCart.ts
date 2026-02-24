// composables/useCart.ts

export interface CartItem {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    price: number
    image: string
    vendor?: { name: string }
  }
  quantity: number
  subtotal: number
}

export interface Cart {
  items: CartItem[]
  cart_key?: string // For guest users
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export const useCart = () => {
  const { request } = useApi()
  const { isLoggedIn } = useAuth()
  
  // Guest cart key stored in cookie
  const cartKey = useCookie('sater_cart_key')
  const cart = useState<Cart | null>('cart', () => null)
  const cartCount = computed(() => cart.value?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0)

  const toNumber = (value: any, fallback = 0) => {
    const n = Number(value)
    return Number.isFinite(n) ? n : fallback
  }

  const extractCartKey = (payload: any): string | undefined => {
    return payload?.body?.cart_key || payload?.cart_key || undefined
  }

  const normalizeCartItem = (raw: any): CartItem => {
    const productId = toNumber(raw?.product_id ?? raw?.product?.id)
    const quantity = toNumber(raw?.quantity, 1)
    const price = toNumber(raw?.product?.price ?? raw?.price_at_add_time ?? raw?.price)
    const subtotal = toNumber(raw?.subtotal, price * quantity)

    return {
      id: toNumber(raw?.id),
      product_id: productId,
      product: {
        id: productId,
        name: raw?.product?.name || raw?.product_name || '',
        price,
        image: raw?.product?.image || raw?.product_image || '',
        vendor: raw?.product?.vendor || (raw?.vendor_name ? { name: raw.vendor_name } : undefined),
      },
      quantity,
      subtotal,
    }
  }

  const normalizeCartResponse = (payload: any): Cart => {
    const source = payload?.body?.cart ?? payload?.body ?? payload?.cart ?? payload ?? {}
    const rawItems = Array.isArray(source?.items)
      ? source.items
      : Array.isArray(source?.cart_items)
        ? source.cart_items
        : Array.isArray(source?.data)
          ? source.data
          : source?.cart_item
            ? [source.cart_item]
            : []

    const items = rawItems.map(normalizeCartItem)
    const subtotal = toNumber(source?.subtotal, items.reduce((sum, item) => sum + toNumber(item.subtotal), 0))
    const shipping = toNumber(source?.shipping, 0)
    const tax = toNumber(source?.tax, 0)
    const total = toNumber(source?.total, subtotal + shipping + tax)
    const key = extractCartKey(payload)

    return {
      items,
      cart_key: key,
      subtotal,
      shipping,
      tax,
      total,
    }
  }

  // ── Get Cart ──────────────────────────────────────────────
  const fetchCart = async () => {
    const params: any = {}
    if (!isLoggedIn.value && cartKey.value) {
      params.cart_key = cartKey.value
    }
    const res = await request<any>('/api/cart', {
      auth: isLoggedIn.value,
      params,
    })
    if (res.data) {
      const key = extractCartKey(res.data)
      if (key) cartKey.value = key
      cart.value = normalizeCartResponse(res.data)
    }
    return res
  }

  // ── Add to Cart ───────────────────────────────────────────
  const addToCart = async (productId: number, quantity = 1) => {
    const body: any = { product_id: productId, quantity }
    if (!isLoggedIn.value && cartKey.value) {
      body.cart_key = cartKey.value
    }
    const res = await request<any>('/api/cart/add', {
      method: 'POST',
      body,
      auth: isLoggedIn.value,
    })
    if (res.data) {
      const key = extractCartKey(res.data)
      if (key) cartKey.value = key

      const fetched = await fetchCart()

      // Fallback when backend returns only cart_item and cart fetch is unavailable.
      if (fetched.error) {
        const source = (res.data as any)?.body ?? res.data
        if (source?.cart_item) {
          const addedItem = normalizeCartItem(source.cart_item)
          const existingItems = cart.value?.items || []
          const existingIndex = existingItems.findIndex((item) => item.id === addedItem.id || item.product_id === addedItem.product_id)
          if (existingIndex >= 0) {
            existingItems[existingIndex] = addedItem
          } else {
            existingItems.push(addedItem)
          }
          const subtotal = existingItems.reduce((sum, item) => sum + toNumber(item.subtotal), 0)
          cart.value = {
            items: [...existingItems],
            cart_key: cartKey.value,
            subtotal,
            shipping: cart.value?.shipping || 0,
            tax: cart.value?.tax || 0,
            total: subtotal + (cart.value?.shipping || 0) + (cart.value?.tax || 0),
          }
        }
      }
    }
    return res
  }

  // ── Remove from Cart ──────────────────────────────────────
  // ⚠️ MISSING IN BACKEND: DELETE /api/cart/{item_id}
  // Needs to be added in Laravel
  const removeFromCart = async (itemId: number) => {
    const params: any = {}
    if (!isLoggedIn.value && cartKey.value) params.cart_key = cartKey.value

    const res = await request(`/api/cart/${itemId}`, {
      method: 'DELETE',
      auth: isLoggedIn.value,
      params,
    })
    if (!res.error) await fetchCart()
    return res
  }

  // ── Update Quantity ───────────────────────────────────────
  // ⚠️ MISSING IN BACKEND: PUT /api/cart/{item_id}
  // Needs to be added in Laravel
  const updateCartItem = async (itemId: number, quantity: number) => {
    const body: any = { quantity }
    if (!isLoggedIn.value && cartKey.value) body.cart_key = cartKey.value

    const res = await request(`/api/cart/${itemId}`, {
      method: 'PUT',
      body,
      auth: isLoggedIn.value,
    })
    if (!res.error) await fetchCart()
    return res
  }

  // ── Clear Cart ────────────────────────────────────────────
  // ⚠️ MISSING IN BACKEND: DELETE /api/cart
  const clearCart = async () => {
    const params: any = {}
    if (!isLoggedIn.value && cartKey.value) params.cart_key = cartKey.value

    const res = await request('/api/cart', {
      method: 'DELETE',
      auth: isLoggedIn.value,
      params,
    })
    if (!res.error) {
      cart.value = null
      if (!isLoggedIn.value) cartKey.value = undefined
    }
    return res
  }

  return {
    cart,
    cartCount,
    cartKey,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  }
}
