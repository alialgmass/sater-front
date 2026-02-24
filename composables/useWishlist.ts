// composables/useWishlist.ts
export const useWishlist = () => {
  const { request } = useApi()
  const wishlist = useState<any[]>('wishlist', () => [])

  const fetchWishlist = async () => {
    const res = await request<{ data: any[] }>('/api/wishlist', { auth: true })
    if (res.data) {
      wishlist.value = (res.data as any).data || []
    }
    return res
  }

  // ⚠️ MISSING IN BACKEND: POST /api/wishlist/add or /api/wishlist/toggle
  // Need endpoint to add/remove from wishlist
  const toggleWishlist = async (productId: number) => {
    const res = await request('/api/wishlist/toggle', {
      method: 'POST',
      body: { product_id: productId },
      auth: true,
    })
    if (!res.error) await fetchWishlist()
    return res
  }

  const isInWishlist = (productId: number) => {
    return wishlist.value.some((item: any) => item.product_id === productId || item.id === productId)
  }

  return { wishlist, fetchWishlist, toggleWishlist, isInWishlist }
}
