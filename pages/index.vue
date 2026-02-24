<template>
  <div>
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div
        class="relative rounded-3xl overflow-hidden min-h-[520px] flex items-center bg-cover bg-center"
        style="background-image: linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400')"
      >
        <div class="relative z-10 px-8 md:px-16 max-w-2xl">
          <span class="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary/20 rounded-full">
            مجموعة الصيف ٢٠٢٤
          </span>
          <h2 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-display">
            أناقة محتشمة<br />لكل مناسبة
          </h2>
          <p class="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed">
            اكتشفي أحدث تشكيلاتنا من العبايات والأزياء المحتشمة الراقية المصممة بعناية لتناسب ذوقك الرفيع.
          </p>
          <div class="flex gap-4">
            <NuxtLink to="/products" class="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg">
              تسوقي الآن
              <span class="material-symbols-outlined mr-2">arrow_back</span>
            </NuxtLink>
            <NuxtLink to="/products" class="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all">
              اكتشفي المزيد
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h3 class="text-3xl font-bold font-display">تسوقي حسب الفئة</h3>
          <p class="text-slate-500 mt-2">اختاري ما يناسبك من تشكيلاتنا المتنوعة</p>
        </div>
        <NuxtLink to="/products" class="text-primary font-bold hover:underline flex items-center gap-1">
          عرض الكل
          <span class="material-symbols-outlined">chevron_left</span>
        </NuxtLink>
      </div>

      <div v-if="loadingCategories" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="aspect-[4/5] rounded-2xl bg-slate-200 animate-pulse" />
      </div>

      <div v-else-if="categories.length" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="`/products?category_id=${cat.id}`"
          class="group relative flex flex-col items-center"
        >
          <div class="w-full aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
            <img
              v-if="cat.image"
              :src="cat.image"
              :alt="cat.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
              <span class="material-symbols-outlined text-5xl text-primary/50">checkroom</span>
            </div>
          </div>
          <div class="text-center">
            <h4 class="text-lg font-bold group-hover:text-primary transition-colors">{{ cat.name }}</h4>
            <p v-if="cat.products_count" class="text-sm text-slate-500">{{ cat.products_count }}+ منتج</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Fallback static categories if API has none -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <NuxtLink
          v-for="cat in staticCategories"
          :key="cat.name"
          :to="`/products?q=${cat.name}`"
          class="group relative flex flex-col items-center"
        >
          <div class="w-full aspect-[4/5] overflow-hidden rounded-2xl mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300" :class="cat.bg">
            <div class="w-full h-full flex items-center justify-center">
              <span class="material-symbols-outlined text-6xl" :class="cat.iconColor">{{ cat.icon }}</span>
            </div>
          </div>
          <div class="text-center">
            <h4 class="text-lg font-bold group-hover:text-primary transition-colors">{{ cat.name }}</h4>
            <p class="text-sm text-slate-500">{{ cat.desc }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Top Selling Products -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h3 class="text-3xl font-bold font-display">الأكثر مبيعاً</h3>
          <p class="text-slate-500 mt-2">التصاميم التي نالت إعجاب الجميع هذا الأسبوع</p>
        </div>
        <NuxtLink to="/products" class="text-primary font-bold hover:underline flex items-center gap-1">
          عرض الكل
          <span class="material-symbols-outlined">chevron_left</span>
        </NuxtLink>
      </div>

      <div v-if="loadingProducts" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="rounded-2xl bg-slate-200 animate-pulse aspect-[3/4]" />
      </div>

      <div v-else-if="products.length" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ProductCard v-for="product in products.slice(0, 8)" :key="product.id" :product="product" />
      </div>

      <div v-else class="text-center py-12 text-slate-400">
        <span class="material-symbols-outlined text-5xl">inventory_2</span>
        <p class="mt-2">لا توجد منتجات حالياً</p>
      </div>
    </section>

    <!-- Brands Strip -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 py-12 border-y border-slate-200 dark:border-slate-800">
      <h3 class="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">أبرز العلامات التجارية</h3>
      <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-all duration-500">
        <span v-for="brand in ['LOUZA', 'HAYAH', 'MALAK', 'NOUR', 'SOUQ']" :key="brand" class="font-bold text-lg font-display">{{ brand }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const {
  getProducts,
  getCategories,
  normalizeProductsResponse,
  normalizeCategoriesResponse,
} = useProducts()

const products = ref<any[]>([])
const categories = ref<any[]>([])
const loadingProducts = ref(true)
const loadingCategories = ref(true)

const staticCategories = [
  { name: 'العبايات', desc: '١٢٠٠+ تصميم', icon: 'dry_cleaning', bg: 'bg-slate-100', iconColor: 'text-slate-400' },
  { name: 'الحجاب', desc: '٨٠٠+ لون وخامة', icon: 'spa', bg: 'bg-amber-50', iconColor: 'text-amber-400' },
  { name: 'ملابس الصلاة', desc: '٣٠٠+ خيار مريح', icon: 'self_improvement', bg: 'bg-green-50', iconColor: 'text-green-400' },
  { name: 'إكسسوارات', desc: 'لمسة نهائية متألقة', icon: 'diamond', bg: 'bg-purple-50', iconColor: 'text-purple-400' },
]

onMounted(async () => {
  const [prodRes, catRes] = await Promise.all([
    getProducts({ per_page: 8 }),
    getCategories(),
  ])

  if (prodRes.data) {
    const normalized = normalizeProductsResponse(prodRes.data)
    products.value = normalized.items
  }
  loadingProducts.value = false

  if (catRes.data) {
    categories.value = normalizeCategoriesResponse(catRes.data)
  }
  loadingCategories.value = false
})

useHead({ title: 'ساتر | الرئيسية' })
</script>
