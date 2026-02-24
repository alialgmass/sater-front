<template>
  <div class="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">

    <!-- Header Row: Breadcrumb + Title + Search + Sort -->
    <div class="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
      <div>
        <nav class="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
          <NuxtLink class="hover:text-primary transition-colors" to="/">الرئيسية</NuxtLink>
          <span class="material-symbols-outlined text-[14px] leading-none">chevron_left</span>
          <span class="text-slate-900 dark:text-slate-100 font-medium">{{ pageTitle }}</span>
        </nav>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white">ملابس محتشمة</h2>
        <p class="text-slate-500 mt-1 text-sm">عرض {{ total.toLocaleString('ar-SA') }} منتج</p>
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:mt-6">
        <!-- Search -->
        <div class="relative min-w-[260px]">
          <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            v-model="searchQuery"
            @input="onSearchInput"
            class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-10 pl-4 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none text-sm py-2.5 transition-all"
            placeholder="ابحث عن منتج..."
            type="text"
          />
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm whitespace-nowrap">
          <span class="font-medium text-slate-600 dark:text-slate-400">ترتيب حسب:</span>
          <select
            v-model="sortBy"
            @change="applyFilters"
            class="bg-transparent border-none focus:ring-0 cursor-pointer p-0 text-sm font-semibold outline-none"
          >
            <option value="">الأحدث</option>
            <option value="price_asc">السعر: من الأقل</option>
            <option value="price_desc">السعر: من الأعلى</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Body: Sidebar + Grid -->
    <div class="flex flex-col lg:flex-row gap-8">

      <!-- ── Sidebar ── -->
      <aside class="w-full lg:w-72 shrink-0 space-y-8">

        <!-- Categories -->
        <section>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">category</span>
            الفئات
          </h3>

          <div class="space-y-1 max-h-[360px] overflow-y-auto pr-1">

            <!-- All -->
            <button
              @click="filterCategory(null)"
              class="w-full flex items-center justify-between p-3 rounded-lg transition-colors text-right"
              :class="!selectedCategory
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'"
            >
              <span class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]"
                  :class="!selectedCategory ? 'text-primary' : 'text-slate-400'">
                  {{ !selectedCategory ? 'check_box' : 'check_box_outline_blank' }}
                </span>
                الكل
              </span>
            </button>

            <!-- Loading skeleton -->
            <template v-if="loadingCategories">
              <div v-for="i in 4" :key="i" class="h-12 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </template>

            <!-- Real Categories -->
            <button
              v-for="cat in displayCategories"
              :key="cat.id"
              @click="filterCategory(cat.id)"
              class="w-full flex items-center justify-between p-3 rounded-lg transition-colors text-right"
              :class="selectedCategory === cat.id
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'"
            >
              <span class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px]"
                  :class="selectedCategory === cat.id ? 'text-primary' : 'text-slate-400'">
                  {{ selectedCategory === cat.id ? 'check_box' : 'check_box_outline_blank' }}
                </span>
                {{ cat.name }}
              </span>
              <span v-if="cat.products_count" class="text-xs text-slate-400 tabular-nums">
                {{ cat.products_count }}
              </span>
            </button>
          </div>
        </section>

        <!-- Price Range -->
        <section>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">payments</span>
            السعر (ر.س)
          </h3>
          <div class="px-1">
            <input
              v-model.number="maxPrice"
              @change="applyFilters"
              class="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-slate-200 dark:bg-slate-700"
              max="1000"
              min="0"
              step="50"
              type="range"
            />
            <div class="flex justify-between mt-2 text-sm">
              <span class="text-slate-500">٠ ر.س</span>
              <span class="font-semibold text-primary">
                {{ maxPrice >= 1000 ? '١٠٠٠+ ر.س' : `${maxPrice} ر.س` }}
              </span>
            </div>
          </div>
        </section>

        <!-- Sizes -->
        <section>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">straighten</span>
            المقاس
          </h3>

          <div v-if="loadingSizes" class="grid grid-cols-3 gap-2">
            <div v-for="i in 5" :key="i" class="h-10 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
          </div>

          <div v-else class="grid grid-cols-3 gap-2">
            <button
              v-for="size in availableSizes"
              :key="size.id"
              @click="toggleSize(size.id)"
              class="py-2 border-2 rounded-lg transition-all text-sm font-medium"
              :class="selectedSizes.includes(size.id)
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary text-slate-700 dark:text-slate-300'"
            >
              {{ size.label }}
            </button>
          </div>
        </section>

        <!-- Colors -->
        <section>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">palette</span>
            الألوان
          </h3>

          <div v-if="loadingColors" class="flex flex-wrap gap-3">
            <div v-for="i in 5" :key="i" class="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          </div>

          <div v-else class="flex flex-wrap gap-3">
            <button
              v-for="color in availableColors"
              :key="color.id"
              @click="toggleColor(color.id)"
              :title="color.name"
              class="w-9 h-9 rounded-full border-2 transition-all"
              :style="{ backgroundColor: color.hex_code }"
              :class="selectedColors.includes(color.id)
                ? 'border-primary ring-2 ring-offset-2 ring-primary scale-110'
                : 'border-slate-200 dark:border-slate-600 hover:scale-110 hover:border-primary'"
            />
          </div>
        </section>

        <!-- Tags -->
        <section>
          <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">sell</span>
            الوسوم
          </h3>

          <div v-if="loadingTags" class="flex flex-wrap gap-2">
            <div v-for="i in 4" :key="i" class="h-9 w-20 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
          </div>

          <div v-else class="flex flex-wrap gap-2">
            <button
              v-for="tag in availableTags"
              :key="tag.id"
              @click="toggleTag(tag.id)"
              class="px-3 py-2 border-2 rounded-lg transition-all text-sm font-medium"
              :class="selectedTags.includes(tag.id)
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary text-slate-700 dark:text-slate-300'"
            >
              {{ tag.name }}
            </button>
          </div>
        </section>

        <!-- Reset button -->
        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="w-full py-2.5 text-sm font-bold text-red-500 border-2 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <span class="material-symbols-outlined text-[18px]">filter_alt_off</span>
          إعادة تعيين الفلاتر
        </button>
      </aside>

      <!-- ── Products Grid ── -->
      <div class="flex-1 min-w-0">

        <!-- Skeleton loading -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div class="aspect-[3/4] bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div class="p-5 space-y-3">
              <div class="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
              <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
              <div class="h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3" />
            </div>
          </div>
        </div>

        <!-- Products -->
        <div v-else-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="product in products"
            :key="product.id"
            class="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <!-- Image -->
            <div class="relative aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-700">
              <NuxtLink :to="`/products/${product.id}`" class="block w-full h-full">
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="material-symbols-outlined text-6xl text-slate-300">image</span>
                </div>
              </NuxtLink>

              <!-- New badge -->
              <span
                v-if="product.is_new"
                class="absolute top-3 right-3 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow"
              >
                جديد
              </span>

              <!-- Wishlist -->
              <button
                @click.prevent="onToggleWishlist(product.id)"
                class="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-95"
                :class="isInWishlist(product.id) ? 'text-red-500' : 'text-slate-600 hover:text-red-500'"
              >
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </button>

              <!-- Add to cart overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <button
                  @click.prevent="onAddToCart(product.id)"
                  :disabled="!!addingMap[product.id]"
                  class="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                >
                  <span class="material-symbols-outlined text-[20px]" :class="addingMap[product.id] ? 'animate-spin' : ''">
                    {{ addingMap[product.id] ? 'progress_activity' : 'add_shopping_cart' }}
                  </span>
                  {{ addingMap[product.id] ? 'جاري الإضافة...' : 'إضافة للسلة' }}
                </button>
              </div>
            </div>

            <!-- Info -->
            <div class="p-5">
              <div class="flex justify-between items-start mb-1.5 gap-2">
                <NuxtLink :to="`/products/${product.id}`">
                  <h3 class="font-bold text-base leading-snug line-clamp-1 hover:text-primary transition-colors">
                    {{ product.name }}
                  </h3>
                </NuxtLink>
                <div class="flex items-center gap-0.5 text-amber-500 shrink-0">
                  <span class="material-symbols-outlined text-[16px]">star</span>
                  <span class="text-xs font-bold">{{ formatRating(product.rating) }}</span>
                </div>
              </div>

              <p class="text-slate-500 text-sm mb-4 line-clamp-1">
                {{ product.category?.name || product.vendor?.shop_name || 'منتج محتشم' }}
              </p>

              <div class="flex items-end justify-between gap-2">
                <span class="text-2xl font-black text-primary leading-none">
                  {{ displayPrice(product) }} ر.س
                </span>
                <span v-if="hasDiscount(product)" class="text-slate-400 text-sm line-through leading-none">
                  {{ originalPrice(product) }} ر.س
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center py-24 text-slate-400">
          <span class="material-symbols-outlined text-7xl mb-4">search_off</span>
          <p class="text-lg font-bold text-slate-600 dark:text-slate-300">لا توجد منتجات تطابق بحثك</p>
          <p class="text-sm mt-1 mb-6">جربي تعديل الفلاتر أو البحث بكلمة مختلفة</p>
          <button
            @click="resetFilters"
            class="flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">filter_alt_off</span>
            إعادة تعيين الفلاتر
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-1.5">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>

          <template v-for="item in paginationItems" :key="`pg-${item}`">
            <span v-if="item === '...'" class="w-10 h-10 flex items-center justify-center text-slate-400 select-none">...</span>
            <button
              v-else
              @click="goToPage(Number(item))"
              class="w-10 h-10 rounded-lg flex items-center justify-center font-bold border transition-all"
              :class="currentPage === Number(item)
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'"
            >
              {{ Number(item).toLocaleString('ar-SA') }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const {
  getProducts,
  searchProducts,
  getCategories,
  getColors,
  getSizes,
  getTags,
  normalizeProductsResponse,
  normalizeCategoriesResponse,
  normalizeColorsResponse,
  normalizeSizesResponse,
  normalizeTagsResponse,
} = useProducts()
const { addToCart }       = useCart()
const { isLoggedIn }      = useAuth()
const { isInWishlist, toggleWishlist } = useWishlist()

// ── State ──────────────────────────────────────────────────────────────────────
const products    = ref<any[]>([])
const categories  = ref<any[]>([])
const loading     = ref(true)
const loadingCategories = ref(true)
const loadingColors     = ref(true)
const loadingSizes      = ref(true)
const loadingTags       = ref(true)

const total        = ref(0)
const currentPage  = ref(1)
const totalPages   = ref(1)

const selectedCategory = ref<number | null>(null)
const selectedSizes    = ref<number[]>([])
const selectedColors   = ref<number[]>([])
const selectedTags     = ref<number[]>([])
const maxPrice         = ref(1000)
const sortBy           = ref('')
const searchQuery      = ref(String(route.query.q || ''))

const availableSizes   = ref<any[]>([])
const availableColors  = ref<any[]>([])
const availableTags    = ref<any[]>([])

const addingMap = ref<Record<number, boolean>>({})
let searchTimer: ReturnType<typeof setTimeout> | null = null

// ── Computed ───────────────────────────────────────────────────────────────────
const pageTitle = computed(() =>
  searchQuery.value ? `نتائج البحث عن "${searchQuery.value}"` : 'كل المنتجات'
)

const displayCategories = computed(() => {
  const roots = categories.value.filter((c: any) => !c.parent_id)
  return (roots.length ? roots : categories.value).slice(0, 14)
})

const hasActiveFilters = computed(() =>
  !!selectedCategory.value ||
  selectedSizes.value.length > 0 ||
  selectedColors.value.length > 0 ||
  selectedTags.value.length > 0 ||
  maxPrice.value < 1000 ||
  !!searchQuery.value
)

// Smart pagination items
const paginationItems = computed((): (number | '...')[] => {
  const t = totalPages.value
  const c = currentPage.value
  if (t <= 7) return Array.from({ length: t }, (_, i) => i + 1)
  const items: (number | '...')[] = [1]
  if (c > 3) items.push('...')
  for (let p = Math.max(2, c - 1); p <= Math.min(t - 1, c + 1); p++) items.push(p)
  if (c < t - 2) items.push('...')
  items.push(t)
  return items
})

// ── Price / rating helpers ─────────────────────────────────────────────────────
const hasDiscount = (p: any) =>
  p.discounted_price != null && Number(p.discounted_price) < Number(p.price)

const displayPrice = (p: any) =>
  Number(p.discounted_price ?? p.price ?? 0).toFixed(2)

const originalPrice = (p: any) =>
  Number(p.price ?? 0).toFixed(2)

const formatRating = (rating: any) => {
  const n = Number(typeof rating === 'object' ? rating?.average : rating)
  return isNaN(n) || n === 0 ? '٠.٠' : n.toFixed(1)
}

// ── Fetching ───────────────────────────────────────────────────────────────────
const fetchProducts = async () => {
  loading.value = true

  const params: Record<string, any> = {
    page: currentPage.value,
    per_page: 9,
    sort: sortBy.value || undefined,
    category_id: selectedCategory.value || undefined,
  }
  if (maxPrice.value < 1000)         params.max_price = maxPrice.value
  if (selectedSizes.value.length)    params.size_ids  = selectedSizes.value.join(',')
  if (selectedColors.value.length)   params.color_ids = selectedColors.value.join(',')
  if (selectedTags.value.length)     params.tag_ids   = selectedTags.value.join(',')

  const res = searchQuery.value.trim()
    ? await searchProducts(searchQuery.value.trim(), params)
    : await getProducts(params)

  if (res.data) {
    const { items, meta } = normalizeProductsResponse(res.data)
    products.value   = items
    total.value      = Number(meta?.total    ?? items.length)
    totalPages.value = Number(meta?.last_page ?? 1)

    // Filter options come from dedicated endpoints (/sizes, /colors, /tags)
  } else {
    products.value = []
    total.value    = 0
    totalPages.value = 1
  }

  loading.value = false
}

const fetchCategories = async () => {
  loadingCategories.value = true
  const res = await getCategories()
  if (res.data) categories.value = normalizeCategoriesResponse(res.data)
  loadingCategories.value = false
}

const fetchFilterOptions = async () => {
  loadingSizes.value = true
  loadingColors.value = true
  loadingTags.value = true

  const [sizesRes, colorsRes, tagsRes] = await Promise.all([
    getSizes(),
    getColors(),
    getTags(),
  ])

  if (sizesRes.data) {
    const sizes = normalizeSizesResponse(sizesRes.data)
    availableSizes.value = sizes.map((s: any) => ({
      id: Number(s.id),
      label: s.abbreviation || s.name,
      name: s.name,
    }))
  }
  if (colorsRes.data) {
    const colors = normalizeColorsResponse(colorsRes.data)
    availableColors.value = colors.map((c: any) => ({
      id: Number(c.id),
      name: c.name,
      hex_code: c.hex_code,
    }))
  }
  if (tagsRes.data) {
    const tags = normalizeTagsResponse(tagsRes.data)
    availableTags.value = tags.map((t: any) => ({
      id: Number(t.id),
      name: t.name,
      slug: t.slug,
    }))
  }

  loadingSizes.value = false
  loadingColors.value = false
  loadingTags.value = false
}

// ── Filter actions ─────────────────────────────────────────────────────────────
const filterCategory = (id: number | null) => {
  selectedCategory.value = id
  currentPage.value = 1
  fetchProducts()
}

const toggleSize = (sizeId: number) => {
  const idx = selectedSizes.value.indexOf(sizeId)
  idx > -1 ? selectedSizes.value.splice(idx, 1) : selectedSizes.value.push(sizeId)
  currentPage.value = 1
  fetchProducts()
}

const toggleColor = (colorId: number) => {
  const idx = selectedColors.value.indexOf(colorId)
  idx > -1 ? selectedColors.value.splice(idx, 1) : selectedColors.value.push(colorId)
  currentPage.value = 1
  fetchProducts()
}

const toggleTag = (tagId: number) => {
  const idx = selectedTags.value.indexOf(tagId)
  idx > -1 ? selectedTags.value.splice(idx, 1) : selectedTags.value.push(tagId)
  currentPage.value = 1
  fetchProducts()
}

const applyFilters = () => { currentPage.value = 1; fetchProducts() }

const resetFilters = () => {
  selectedCategory.value = null
  selectedSizes.value    = []
  selectedColors.value   = []
  selectedTags.value     = []
  maxPrice.value         = 1000
  sortBy.value           = ''
  searchQuery.value      = ''
  currentPage.value      = 1
  fetchProducts()
}

const onSearchInput = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { currentPage.value = 1; fetchProducts() }, 400)
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchProducts()
}

// ── Cart / Wishlist ────────────────────────────────────────────────────────────
const onAddToCart = async (id: number) => {
  addingMap.value[id] = true
  try { await addToCart(id) }
  finally { addingMap.value[id] = false }
}

const onToggleWishlist = async (id: number) => {
  if (!isLoggedIn.value) { navigateTo('/auth/login'); return }
  await toggleWishlist(id)
}

// ── Init ───────────────────────────────────────────────────────────────────────
onMounted(async () => {
  if (route.query.category_id) selectedCategory.value = Number(route.query.category_id)

  await Promise.all([fetchProducts(), fetchCategories(), fetchFilterOptions()])

  // Fallback defaults if API has no sizes/colors
  if (loadingSizes.value) {
    availableSizes.value = [
      { id: 1, label: 'XS' },
      { id: 2, label: 'S' },
      { id: 3, label: 'M' },
      { id: 4, label: 'L' },
      { id: 5, label: 'XL' },
      { id: 6, label: 'XXL' },
    ]
    loadingSizes.value   = false
  }
  if (loadingColors.value) {
    availableColors.value = [
      { id: 1, hex_code: '#000000', name: 'Black' },
      { id: 2, hex_code: '#3d2b1f', name: 'Brown' },
      { id: 3, hex_code: '#e5e5e5', name: 'Gray' },
      { id: 4, hex_code: '#1a3a3a', name: 'Teal' },
      { id: 5, hex_code: '#8b0000', name: 'Red' },
    ]
    loadingColors.value   = false
  }
  if (loadingTags.value) {
    availableTags.value = []
    loadingTags.value = false
  }
})

useHead({ title: 'المنتجات | ساتر' })
</script>
