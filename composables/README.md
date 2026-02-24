# Nuxt 3 API Composables

This directory contains all the API composables for the e-commerce application, organized by domain and aligned with the Sater Backend API collection.

## Structure

```
composables/
├── api/
│   ├── helpers.ts          # Shared utilities and base functions
│   └── types.ts            # Shared TypeScript interfaces
├── useAuth.ts              # Authentication operations
├── useAddresses.ts         # Address management
├── useCart.ts              # Shopping cart operations
├── useCategories.ts        # Product categories
├── useCheckout.ts          # Checkout process
├── useOrders.ts            # Order management
├── usePayments.ts          # Payment processing
├── useProducts.ts          # Product operations
├── useSearch.ts            # Search functionality
├── useVendors.ts           # Vendor operations
├── useWishlist.ts          # Wishlist management
└── useAdminShipping.ts     # Admin shipping zones management
```

## API Endpoint Mapping

Based on the Sater Backend API collection, the composables map to these endpoints:

### Authentication
- `POST /api/register` - Customer Registration
- `POST /api/login` - Customer Login (includes `device_name` parameter)

### Customer Management
- `GET /api/profile` - Get Profile
- `PUT /api/profile` - Update Profile
- `GET /api/addresses` - Get Addresses
- `POST /api/addresses` - Create Address
- `PUT /api/addresses/{id}` - Update Address
- `DELETE /api/addresses/{id}` - Delete Address

### Products & Categories
- `GET /api/v1/products` - Get All Products
- `GET /api/v1/categories` - Get All Categories
- `GET /api/v1/search/products` - Search Products
- `GET /api/v1/search/autocomplete` - Product Autocomplete
- `GET /api/v1/search/history` - Get Search History (auth required)
- `DELETE /api/v1/search/history` - Clear Search History (auth required)

### Cart & Wishlist
- `GET /api/cart` - Get Cart Items
- `POST /api/cart/add` - Add Item to Cart
- `PUT /api/cart/items/{id}` - Update Cart Item
- `DELETE /api/cart/items/{id}` - Remove Cart Item
- `POST /api/cart/items/{id}/save-for-later` - Save Cart Item for Later
- `GET /api/wishlist` - Get Wishlist
- `POST /api/wishlist` - Add to Wishlist
- `DELETE /api/wishlist/{id}` - Remove from Wishlist
- `POST /api/wishlist/{id}/move-to-cart` - Move Wishlist Item to Cart

### Checkout & Payment
- `POST /api/checkout/start` - Start Checkout
- `POST /api/checkout/address` - Select Shipping Address
- `POST /api/checkout/shipping` - Select Shipping Method
- `POST /api/checkout/payment` - Select Payment Method
- `POST /api/checkout/coupon` - Apply Coupon
- `GET /api/checkout/summary` - Get Checkout Summary
- `POST /api/checkout/confirm` - Confirm Checkout
- `POST /api/payments/initiate` - Initiate Payment
- `POST /api/payments/verify` - Verify Payment
- `GET /api/payments/orders/{order_number}/status` - Get Payment Status by Order Number

### Orders
- `GET /api/v1/orders` - Get Customer Orders
- `GET /api/v1/orders/{id}` - Get Order Details

### Vendors
- `GET /api/v1/vendors` - Get All Vendors
- `POST /api/vendors/register` - Vendor Registration
- `GET /api/v1/vendors/search` - Search Vendors
- `GET /api/v1/vendors/{id}/search` - Search Vendor Products
- `GET /api/vendor/orders` - Get Vendor Orders
- `GET /api/vendor/orders/{number}` - Get Vendor Order Details
- `POST /api/vendor/orders/{number}/status` - Update Vendor Order Status
- `POST /api/vendor/orders/{number}/shipping` - Add Shipping Info to Vendor Order
- `GET /api/vendor/shipping` - Get Vendor Shipping Methods
- `GET /api/vendor/shipping/{id}` - Get Vendor Shipping Method Details
- `PUT /api/vendor/shipping/{id}/status` - Update Vendor Shipping Method Status

### Admin
- `GET /api/admin/shipping/zones` - Get Shipping Zones
- `POST /api/admin/shipping/zones` - Create Shipping Zone
- `PUT /api/admin/shipping/zones/{id}` - Update Shipping Zone
- `DELETE /api/admin/shipping/zones/{id}` - Delete Shipping Zone
- `POST /api/admin/shipping/zones/{id}/locations` - Add Location to Shipping Zone
- `GET /api/admin/shipping/vendor-methods` - Get Vendor Shipping Methods
- `POST /api/admin/shipping/vendor-methods` - Create Vendor Shipping Method

## Usage

Each composable follows the same pattern:

```typescript
const { getData, createData, updateData, deleteData } = useComposableName()

// For queries (useFetch pattern)
const { data, pending, error, refresh } = await getData()

// For mutations (async functions)
try {
  const result = await createData(payload)
} catch (error) {
  // Handle error
}
```

## Authentication

All protected endpoints automatically include the Authorization header with the Bearer token stored in the `customer_token` cookie. The token is retrieved using `getAuthHeaders()` helper function.

## Error Handling

Errors are handled consistently across all composables using the `handleApiError()` function which normalizes error responses.

## Runtime Configuration

API base URL is configured via `runtimeConfig().public.apiBase` (defaults to `http://localhost:8000`).