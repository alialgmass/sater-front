<template>
  <div class="group relative">
    <!-- Wishlist Button -->
    <button
      @click.prevent="onToggleWishlist"
      class="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all"
    >
      <span class="material-symbols-outlined text-[20px]" :class="inWishlist ? 'text-red-500 [font-variation-settings:\'FILL\'_1]' : 'text-slate-400'">
        favorite
      </span>
    </button>

    <!-- New Badge -->
    <span v-if="product.is_new" class="absolute top-3 left-3 z-10 px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
      جديد
    </span>

    <NuxtLink :to="`/products/${product.id}`" class="block">
      <!-- Image -->
      <div class="aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 mb-3 group-hover:shadow-xl transition-all duration-300">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <span class="material-symbols-outlined text-5xl text-slate-300">image</span>
        </div>
      </div>

      <!-- Info -->
      <div class="px-1">
        <p v-if="product.vendor" class="text-xs text-primary font-medium mb-1">{{ product.vendor.shop_name || product.vendor.name }}</p>
        <h4 class="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-2">{{ product.name }}</h4>
        <div class="flex items-center gap-2">
          <span class="text-primary font-bold">{{ product.price }} ر.س</span>
          <span v-if="product.old_price" class="text-slate-400 text-sm line-through">{{ product.old_price }} ر.س</span>
        </div>
      </div>
    </NuxtLink>

    <!-- Add to Cart -->
    <button
      @click="onAddToCart"
      :disabled="adding"
      class="mt-3 w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50"
    >
      <span v-if="adding" class="flex items-center justify-center gap-1">
        <span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
        جاري الإضافة...
      </span>
      <span v-else class="flex items-center justify-center gap-1">
        <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
        أضف للسلة
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: any
}>()

const { addToCart } = useCart()
const { isLoggedIn } = useAuth()
const { isInWishlist, toggleWishlist } = useWishlist()

const adding = ref(false)
const inWishlist = computed(() => isInWishlist(props.product.id))

const onAddToCart = async () => {
  adding.value = true
  await addToCart(props.product.id)
  adding.value = false
}

const onToggleWishlist = async () => {
  if (!isLoggedIn.value) {
    navigateTo('/auth/login')
    return
  }
  await toggleWishlist(props.product.id)
}
</script>
