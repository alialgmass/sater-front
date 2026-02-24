// composables/useOrders.ts

export const useOrders = () => {
  const { request } = useApi()

  const getMyOrders = async () => {
    return await request<{ data: any[] }>('/api/v1/orders', { auth: true })
  }

  // ⚠️ MISSING IN BACKEND: GET /api/v1/orders/{id}
  // Need single order details endpoint
  const getOrder = async (id: number | string) => {
    return await request<{ data: any }>(`/api/v1/orders/${id}`, { auth: true })
  }

  return { getMyOrders, getOrder }
}
