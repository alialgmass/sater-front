// Shared types for API composables

// Response wrapper for useFetch
export interface ApiResponse<T> {
  data: T
  pending: boolean
  error: any
  refresh: () => Promise<void>
}

// Base response for mutations
export interface MutationResponse<T> {
  success: boolean
  data?: T
  error?: any
}

// Pagination metadata
export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  path: string
  per_page: number
  to: number
  total: number
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
  links: {
    first?: string
    last?: string
    prev?: string
    next?: string
  }
}

// User type
export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  created_at: string
  updated_at: string
}

// Product type
export interface Product {
  id: number
  name: string
  slug: string
  description: string
  short_description?: string
  sku: string
  price: number
  sale_price?: number
  stock_quantity: number
  in_stock: boolean
  is_active: boolean
  images: string[]
  category_id: number
  brand_id?: number
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  attributes?: Record<string, any>
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

// Cart item type
export interface CartItem {
  id: number
  product_id: number
  product: Product
  quantity: number
  price: number
  total: number
  options?: Record<string, any>
}

// Cart type
export interface Cart {
  id: number
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  created_at: string
  updated_at: string
}

// Address type
export interface Address {
  id: number
  user_id: number
  first_name: string
  last_name: string
  company?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
  email?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Shipping method type
export interface ShippingMethod {
  id: number
  name: string
  description: string
  cost: number
  estimated_days: number
  is_available: boolean
}

// Payment method type
export interface PaymentMethod {
  id: number
  name: string
  type: string
  is_enabled: boolean
  icon?: string
}

// Order type
export interface Order {
  id: number
  user_id: number
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  billing_address: Address
  shipping_address: Address
  shipping_method?: ShippingMethod
  payment_method?: PaymentMethod
  items: Array<{
    id: number
    product_id: number
    product: Product
    quantity: number
    price: number
    total: number
  }>
  created_at: string
  updated_at: string
}

// Wishlist item type
export interface WishlistItem {
  id: number
  user_id: number
  product_id: number
  product: Product
  added_at: string
}

// Category type
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number
  image?: string
  is_active: boolean
  position: number
  created_at: string
  updated_at: string
}

// Vendor type
export interface Vendor {
  id: number
  name: string
  slug: string
  description?: string
  logo?: string
  banner?: string
  rating: number
  products_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// API error response
export interface ApiError {
  message: string
  statusCode?: number
  data?: any
}