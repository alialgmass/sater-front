// composables/useCheckout.ts

export const useCheckout = () => {
  const { request } = useApi()
  const { cartKey } = useCart()

  const processCheckout = async (data: {
    address: {
      country: string
      city: string
      street: string
    }
    shipping_method: 'standard' | 'express'
    payment_method: 'cod' | 'card' | 'apple_pay'
    coupon_code?: string
  }) => {
    const body: any = {
      ...data,
      cart_key: cartKey.value || null,
    }

    return await request('/api/checkout', {
      method: 'POST',
      body,
      auth: true,
    })
  }

  return { processCheckout }
}
