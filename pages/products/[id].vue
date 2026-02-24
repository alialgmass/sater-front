<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-slate-500 mb-8">
      <NuxtLink to="/" class="hover:text-primary">الرئيسية</NuxtLink>
      <span class="material-symbols-outlined text-[16px]">chevron_left</span>
      <NuxtLink to="/products" class="hover:text-primary">المنتجات</NuxtLink>
      <span class="material-symbols-outlined text-[16px]">chevron_left</span>
      <span class="text-slate-900 dark:text-white">{{ product?.name }}</span>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div class="aspect-square rounded-2xl bg-slate-200" />
      <div class="space-y-4">
        <div class="h-8 bg-slate-200 rounded-xl w-3/4" />
        <div class="h-6 bg-slate-200 rounded-xl w-1/4" />
        <div class="h-24 bg-slate-200 rounded-xl" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-20">
      <span class="material-symbols-outlined text-6xl text-red-400">error</span>
      <p class="mt-4 text-lg font-medium text-slate-600">{{ error }}</p>
      <NuxtLink to="/products" class="mt-4 inline-block text-primary hover:underline">العودة للمنتجات</NuxtLink>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Images -->
      <div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
          <img
            :src="selectedImage || product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-if="product.images?.length > 1" class="grid grid-cols-4 gap-2">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            @click="selectedImage = img"
            :class="selectedImage === img ? 'ring-2 ring-primary' : ''"
            class="aspect-square rounded-xl overflow-hidden bg-slate-100"
          >
            <img :src="img" :alt="`صورة ${i + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <!-- Vendor -->
        <div v-if="product.vendor" class="flex items-center gap-2 mb-3">
          <span class="text-sm text-primary font-medium">علامة {{ product.vendor.shop_name || product.vendor.name }}</span>
          <NuxtLink :to="`/vendors/${product.vendor.id}`" class="text-xs text-slate-500 hover:text-primary">زيارة المتجر</NuxtLink>
        </div>

        <h1 class="text-3xl font-bold font-display mb-3">{{ product.name }}</h1>

        <!-- Rating -->
        <div v-if="product.rating" class="flex items-center gap-2 mb-4">
          <div class="flex">
            <span v-for="s in 5" :key="s" class="material-symbols-outlined text-[20px]"
              :class="s <= Math.round(product.rating) ? 'text-yellow-400 [font-variation-settings:\'FILL\'_1]' : 'text-slate-300'">
              star
            </span>
          </div>
          <span class="text-sm text-slate-500">({{ product.reviews_count }} تقييم)</span>
        </div>

        <!-- Price -->
        <div class="flex items-center gap-3 mb-6">
          <span class="text-3xl font-bold text-primary">{{ product.price }} ريال</span>
          <span v-if="product.old_price" class="text-xl text-slate-400 line-through">{{ product.old_price }} ريال</span>
          <span v-if="discount" class="px-2 py-0.5 bg-red-100 text-red-600 text-sm font-bold rounded-full">
            وفر {{ discount }}%
          </span>
        </div>

        <!-- Colors -->
        <div v-if="product.colors?.length" class="mb-6">
          <p class="text-sm font-bold mb-2">اللون: <span class="text-slate-500 font-normal">{{ selectedColor }}</span></p>
          <div class="flex gap-2">
            <button
              v-for="color in product.colors"
              :key="color"
              @click="selectedColor = color"
              :class="selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : ''"
              class="w-8 h-8 rounded-full border border-slate-200"
              :style="{ backgroundColor: color }"
            />
          </div>
        </div>

        <!-- Sizes -->
        <div v-if="product.sizes?.length" class="mb-6">
          <p class="text-sm font-bold mb-2">المقاس:</p>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="size in product.sizes"
              :key="size"
              @click="selectedSize = size"
              :class="selectedSize === size ? 'bg-primary text-white border-primary' : 'border-slate-200 hover:border-primary text-slate-700'"
              class="px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Description -->
        <div v-if="product.description" class="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ product.description }}</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 mb-6">
          <button
            @click="onAddToCart"
            :disabled="adding"
            class="flex-1 btn-primary text-base py-4 gap-2"
          >
            <span class="material-symbols-outlined">add_shopping_cart</span>
            {{ adding ? 'جاري الإضافة...' : 'أضف للسلة' }}
          </button>
          <button
            @click="onToggleWishlist"
            class="p-4 border-2 border-slate-200 hover:border-red-400 hover:text-red-400 rounded-xl transition-all"
          >
            <span class="material-symbols-outlined" :class="inWishlist ? 'text-red-500 [font-variation-settings:\'FILL\'_1]' : ''">favorite</span>
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="grid grid-cols-3 gap-3">
          <div class="flex flex-col items-center gap-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <span class="material-symbols-outlined text-primary">local_shipping</span>
            <span class="text-xs text-slate-500">توصيل سريع</span>
          </div>
          <div class="flex flex-col items-center gap-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <span class="material-symbols-outlined text-primary">verified</span>
            <span class="text-xs text-slate-500">ضمان الجودة</span>
          </div>
          <div class="flex flex-col items-center gap-1 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <span class="material-symbols-outlined text-primary">autorenew</span>
            <span class="text-xs text-slate-500">إرجاع خلال ١٤ يوم</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProduct, normalizeProductResponse } = useProducts()
const { addToCart } = useCart()
const { isLoggedIn } = useAuth()
const { isInWishlist, toggleWishlist } = useWishlist()

const product = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const adding = ref(false)
const selectedImage = ref<string>('')
const selectedColor = ref<string>('')
const selectedSize = ref<string>('')

const inWishlist = computed(() => product.value ? isInWishlist(product.value.id) : false)
const discount = computed(() => {
  if (product.value?.old_price && product.value?.price) {
    return Math.round(((product.value.old_price - product.value.price) / product.value.old_price) * 100)
  }
  return null
})

onMounted(async () => {
  const res = await getProduct(route.params.id as string)
  if (res.error) {
    error.value = res.error
  } else if (res.data) {
    product.value = normalizeProductResponse(res.data)
    if (!product.value) {
      error.value = 'تعذر تحميل بيانات المنتج'
      loading.value = false
      return
    }
    selectedImage.value = product.value.image
    if (product.value.colors?.length) selectedColor.value = product.value.colors[0]
    if (product.value.sizes?.length) selectedSize.value = product.value.sizes[0]
  }
  loading.value = false
})

const onAddToCart = async () => {
  if (!product.value) return
  adding.value = true
  await addToCart(product.value.id)
  adding.value = false
}

const onToggleWishlist = async () => {
  if (!isLoggedIn.value) return navigateTo('/auth/login')
  if (product.value) await toggleWishlist(product.value.id)
}

useHead(() => ({ title: product.value ? `${product.value.name} | ساتر` : 'منتج | ساتر' }))
</script>
