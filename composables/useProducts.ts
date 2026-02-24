// composables/useProducts.ts

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  old_price?: number
  image: string
  images?: string[]
  category?: { id: number; name: string }
  vendor?: { id: number; name: string; shop_name: string }
  colors?: string[]
  sizes?: string[]
  description?: string
  is_new?: boolean
  rating?: number
  reviews_count?: number
}

export interface Category {
  id: number
  name: string
  slug: string
  image?: string
  products_count?: number
}

export interface ColorOption {
  id: number
  name: string
  hex_code: string
}

export interface SizeOption {
  id: number
  name: string
  abbreviation?: string
}

export interface TagOption {
  id: number
  name: string
  slug: string
}

export const useProducts = () => {
  const { request } = useApi()

  const normalizeProductsResponse = (payload: any): { items: Product[]; meta: any } => {
    const wrapped = payload?.body?.products ?? payload?.products ?? payload
    const itemsCandidate = wrapped?.data ?? payload?.data ?? wrapped
    const meta = wrapped?.paginate ?? payload?.meta ?? payload?.paginate ?? null

    return {
      items: Array.isArray(itemsCandidate) ? itemsCandidate : [],
      meta,
    }
  }

  const normalizeCategoriesResponse = (payload: any): Category[] => {
    const items = payload?.body?.categories ?? payload?.categories ?? payload?.data ?? payload
    return Array.isArray(items) ? items : []
  }

  const normalizeProductResponse = (payload: any): Product | null => {
    const item = payload?.body?.product ?? payload?.product ?? payload?.data ?? payload
    if (!item || Array.isArray(item)) return null
    return item as Product
  }

  const normalizeColorsResponse = (payload: any): ColorOption[] => {
    const items = payload?.body?.colors ?? payload?.colors ?? payload?.data ?? payload
    return Array.isArray(items) ? items : []
  }

  const normalizeSizesResponse = (payload: any): SizeOption[] => {
    const items = payload?.body?.sizes ?? payload?.sizes ?? payload?.data ?? payload
    return Array.isArray(items) ? items : []
  }

  const normalizeTagsResponse = (payload: any): TagOption[] => {
    const items = payload?.body?.tags ?? payload?.tags ?? payload?.data ?? payload
    return Array.isArray(items) ? items : []
  }

  // ── All Products ──────────────────────────────────────────
  const getProducts = async (params?: {
    page?: number
    per_page?: number
    category_id?: number
    q?: string
    sort?: string
  }) => {
    return await request<{ data: Product[]; meta?: any }>('/api/v1/products', {
      params,
    })
  }

  // ── Search Products ───────────────────────────────────────
  const searchProducts = async (q: string, params?: Record<string, any>) => {
    return await request<{ data: Product[] }>('/api/v1/search/products', {
      params: { q, ...(params || {}) },
    })
  }

  // ── Categories ────────────────────────────────────────────
  const getCategories = async () => {
    return await request<{ data: Category[] }>('/api/v1/categories')
  }

  const getColors = async () => {
    return await request<{ data: ColorOption[] }>('/api/v1/colors')
  }

  const getSizes = async () => {
    return await request<{ data: SizeOption[] }>('/api/v1/sizes')
  }

  const getTags = async () => {
    return await request<{ data: TagOption[] }>('/api/v1/tags')
  }

  // ── Single Product ────────────────────────────────────────
  // ⚠️  MISSING IN BACKEND: GET /api/v1/products/{id}
  // You need to add this endpoint in Laravel
  const getProduct = async (id: number | string) => {
    return await request<{ data: Product }>(`/api/v1/products/${id}`)
  }

  return {
    getProducts,
    searchProducts,
    getCategories,
    getColors,
    getSizes,
    getTags,
    getProduct,
    normalizeProductsResponse,
    normalizeCategoriesResponse,
    normalizeProductResponse,
    normalizeColorsResponse,
    normalizeSizesResponse,
    normalizeTagsResponse,
  }
}
