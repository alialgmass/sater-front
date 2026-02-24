<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold font-display mb-8">إتمام الطلب</h1>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Address -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">location_on</span>
            عنوان التوصيل
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium mb-1 block">الدولة</label>
              <select v-model="form.address.country" class="input-field">
                <option value="SA">المملكة العربية السعودية</option>
                <option value="AE">الإمارات</option>
                <option value="KW">الكويت</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium mb-1 block">المدينة</label>
              <input v-model="form.address.city" type="text" class="input-field" placeholder="الرياض" />
            </div>
            <div class="col-span-2">
              <label class="text-sm font-medium mb-1 block">الشارع والحي</label>
              <input v-model="form.address.street" type="text" class="input-field" placeholder="حي النرجس، شارع..." />
            </div>
          </div>
        </div>

        <!-- Shipping Method -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">local_shipping</span>
            طريقة الشحن
          </h3>
          <div class="space-y-3">
            <label
              v-for="method in shippingMethods"
              :key="method.value"
              class="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all"
              :class="form.shipping_method === method.value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'"
            >
              <div class="flex items-center gap-3">
                <input type="radio" v-model="form.shipping_method" :value="method.value" class="accent-primary" />
                <div>
                  <p class="font-medium">{{ method.label }}</p>
                  <p class="text-sm text-slate-500">{{ method.desc }}</p>
                </div>
              </div>
              <span class="font-bold text-primary">{{ method.price }}</span>
            </label>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">payment</span>
            طريقة الدفع
          </h3>
          <div class="space-y-3">
            <label
              v-for="method in paymentMethods"
              :key="method.value"
              class="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
              :class="form.payment_method === method.value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'"
            >
              <input type="radio" v-model="form.payment_method" :value="method.value" class="accent-primary" />
              <span class="material-symbols-outlined text-primary">{{ method.icon }}</span>
              <span class="font-medium">{{ method.label }}</span>
            </label>
          </div>
        </div>

        <!-- Coupon -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 class="font-bold text-lg mb-4">كود الخصم</h3>
          <div class="flex gap-2">
            <input v-model="form.coupon_code" type="text" placeholder="أدخل كود الخصم" class="input-field flex-1" />
            <button class="px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-all">تطبيق</button>
          </div>
        </div>
      </div>

      <!-- Order Summary Sidebar -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm sticky top-28">
          <h3 class="font-bold text-lg mb-4">ملخص الطلب</h3>

          <div class="space-y-3 max-h-60 overflow-y-auto mb-4">
            <div v-for="item in cart?.items" :key="item.id" class="flex gap-3 items-center">
              <div class="w-14 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img v-if="item.product?.image" :src="item.product.image" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium line-clamp-1">{{ item.product?.name }}</p>
                <p class="text-xs text-slate-400">الكمية: {{ item.quantity }}</p>
              </div>
              <p class="font-bold text-sm shrink-0">{{ item.product?.price * item.quantity }} ر.س</p>
            </div>
          </div>

          <div class="space-y-2 text-sm border-t border-slate-200 pt-4">
            <div class="flex justify-between">
              <span class="text-slate-500">المجموع الفرعي</span>
              <span>{{ cart?.subtotal || 0 }} ر.س</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">الشحن</span>
              <span class="text-primary">{{ form.shipping_method === 'express' ? '٢٩ ر.س' : 'مجاني' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">الضريبة</span>
              <span>{{ cart?.tax || 0 }} ر.س</span>
            </div>
            <div class="flex justify-between font-bold text-base pt-2 border-t border-slate-200">
              <span>الإجمالي</span>
              <span>{{ cart?.total || 0 }} ر.س</span>
            </div>
          </div>

          <!-- Place Order -->
          <button
            @click="placeOrder"
            :disabled="placing || !isFormValid"
            class="btn-primary w-full mt-6 py-4 text-base gap-2"
          >
            <span v-if="placing" class="material-symbols-outlined animate-spin">progress_activity</span>
            <span class="material-symbols-outlined" v-else>check_circle</span>
            {{ placing ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب' }}
          </button>

          <p v-if="orderError" class="mt-3 text-sm text-red-500 text-center">{{ orderError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { cart, fetchCart } = useCart()
const { processCheckout } = useCheckout()

const placing = ref(false)
const orderError = ref('')

const form = reactive({
  address: { country: 'SA', city: '', street: '' },
  shipping_method: 'standard' as 'standard' | 'express',
  payment_method: 'cod' as 'cod' | 'card' | 'apple_pay',
  coupon_code: '',
})

const shippingMethods = [
  { value: 'standard', label: 'شحن عادي', desc: '٣-٥ أيام عمل', price: 'مجاني' },
  { value: 'express', label: 'شحن سريع', desc: 'خلال ٢٤ ساعة', price: '٢٩ ر.س' },
]

const paymentMethods = [
  { value: 'cod', label: 'الدفع عند الاستلام', icon: 'payments' },
  { value: 'card', label: 'بطاقة ائتمانية', icon: 'credit_card' },
  { value: 'apple_pay', label: 'Apple Pay', icon: 'phone_iphone' },
]

const isFormValid = computed(() =>
  form.address.city.trim() && form.address.street.trim()
)

onMounted(fetchCart)

const placeOrder = async () => {
  if (!isFormValid.value) return
  placing.value = true
  orderError.value = ''

  const res = await processCheckout({
    address: form.address,
    shipping_method: form.shipping_method,
    payment_method: form.payment_method,
    coupon_code: form.coupon_code || undefined,
  })

  if (res.error) {
    orderError.value = res.error
  } else {
    const orderId = (res.data as any)?.order?.id
    navigateTo(orderId ? `/account/orders/${orderId}` : '/account/orders')
  }
  placing.value = false
}

useHead({ title: 'إتمام الطلب | ساتر' })
</script>
