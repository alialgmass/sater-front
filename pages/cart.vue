<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold font-display mb-8">سلة التسوق</h1>

    <div v-if="loading" class="flex items-center justify-center py-20">
      <span class="material-symbols-outlined text-5xl text-primary animate-spin">progress_activity</span>
    </div>

    <div v-else-if="!cart?.items?.length" class="text-center py-20">
      <span class="material-symbols-outlined text-7xl text-slate-300">shopping_bag</span>
      <h2 class="mt-4 text-xl font-bold text-slate-600">سلتك فارغة</h2>
      <p class="mt-2 text-slate-400">ابدئي التسوق لإضافة منتجات إلى سلتك</p>
      <NuxtLink to="/products" class="mt-6 inline-block btn-primary">تسوقي الآن</NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <p class="text-slate-500">{{ cart.items.length }} منتجات في السلة</p>

        <div
          v-for="item in cart.items"
          :key="item.id"
          class="bg-white dark:bg-slate-800 rounded-2xl p-4 flex gap-4 shadow-sm"
        >
          <!-- Product Image -->
          <NuxtLink :to="`/products/${item.product_id}`" class="shrink-0">
            <div class="w-24 h-28 rounded-xl overflow-hidden bg-slate-100">
              <img
                v-if="item.product?.image"
                :src="item.product.image"
                :alt="item.product.name"
                class="w-full h-full object-cover"
              />
              <span v-else class="material-symbols-outlined text-slate-300 flex items-center justify-center h-full text-4xl">image</span>
            </div>
          </NuxtLink>

          <!-- Product Details -->
          <div class="flex-1 min-w-0">
            <p v-if="item.product?.vendor" class="text-xs text-primary mb-1">{{ item.product.vendor.name }}</p>
            <h3 class="font-semibold text-sm line-clamp-2 mb-2">{{ item.product?.name }}</h3>
            <p class="text-primary font-bold">{{ item.product?.price }} ر.س</p>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-3 mt-3">
              <div class="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all disabled:opacity-40"
                >
                  <span class="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <span class="w-8 text-center font-bold text-sm">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all"
                >
                  <span class="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>

              <button
                @click="removeItem(item.id)"
                class="text-slate-400 hover:text-red-500 transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>

          <!-- Item Total -->
          <div class="text-left shrink-0">
            <p class="font-bold text-slate-900 dark:text-white">{{ item.subtotal || (item.product?.price * item.quantity) }} ر.س</p>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm sticky top-28">
          <h3 class="text-xl font-bold mb-6">ملخص الطلب</h3>

          <!-- Address -->
          <div class="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-xs text-slate-400 mb-1">عنوان التوصيل</p>
                <p class="text-sm font-medium">المنزل - الرياض</p>
              </div>
              <NuxtLink to="/account/addresses" class="text-xs text-primary hover:underline">تغيير</NuxtLink>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="mb-6">
            <p class="text-sm font-bold mb-3">طريقة الدفع</p>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="method in paymentMethods"
                :key="method.value"
                @click="selectedPayment = method.value"
                :class="selectedPayment === method.value ? 'border-primary bg-primary/10' : 'border-slate-200 hover:border-slate-300'"
                class="flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all"
              >
                <span class="material-symbols-outlined text-[20px]">{{ method.icon }}</span>
                <span class="text-xs">{{ method.label }}</span>
              </button>
            </div>
          </div>

          <!-- Coupon -->
          <div class="mb-6 flex gap-2">
            <input v-model="couponCode" type="text" placeholder="رمز الخصم" class="input-field text-sm flex-1" />
            <button class="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold transition-all">تطبيق</button>
          </div>

          <!-- Totals -->
          <div class="space-y-3 text-sm border-t border-slate-200 pt-4">
            <div class="flex justify-between">
              <span class="text-slate-500">المجموع الفرعي</span>
              <span class="font-medium">{{ cart.subtotal || 0 }} ر.س</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">رسوم الشحن</span>
              <span class="text-primary font-medium">{{ cart.shipping === 0 ? 'مجاني' : `${cart.shipping} ر.س` }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">ضريبة القيمة المضافة (١٥٪)</span>
              <span class="font-medium">{{ cart.tax || 0 }} ر.س</span>
            </div>
            <div class="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
              <span>الإجمالي الشامل</span>
              <span>{{ cart.total || 0 }} ر.س</span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            @click="goToCheckout"
            :disabled="checkingOut"
            class="btn-primary w-full mt-6 py-4 text-base gap-2"
          >
            <span class="material-symbols-outlined">arrow_back</span>
            {{ checkingOut ? 'جاري المعالجة...' : 'إتمام الطلب' }}
          </button>

          <p class="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[16px]">lock</span>
            دفع آمن ١٠٠٪ ومشفر بواسطة ساتر
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cart, fetchCart, removeFromCart, updateCartItem } = useCart()
const { isLoggedIn } = useAuth()

const loading = ref(true)
const checkingOut = ref(false)
const couponCode = ref('')
const selectedPayment = ref('cod')

const paymentMethods = [
  { value: 'cod', label: 'نقدي', icon: 'payments' },
  { value: 'card', label: 'بطاقة', icon: 'credit_card' },
  { value: 'apple_pay', label: 'Apple Pay', icon: 'phone_iphone' },
]

onMounted(async () => {
  await fetchCart()
  loading.value = false
})

const updateQuantity = async (itemId: number, qty: number) => {
  if (qty < 1) return
  await updateCartItem(itemId, qty)
}

const removeItem = async (itemId: number) => {
  await removeFromCart(itemId)
}

const goToCheckout = async () => {
  if (!isLoggedIn.value) {
    navigateTo('/auth/login?redirect=/cart')
    return
  }
  navigateTo('/checkout')
}

useHead({ title: 'سلة التسوق | ساتر' })
</script>
