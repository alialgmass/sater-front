<template>
  <div class="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 font-body">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Logo & Nav -->
          <div class="flex items-center gap-10">
            <NuxtLink to="/" class="flex items-center gap-2 group">
              <div class="bg-primary text-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined block text-[22px]">shield_with_heart</span>
              </div>
              <h1 class="text-2xl font-bold tracking-tight font-display">ساتر</h1>
            </NuxtLink>

            <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
              <NuxtLink to="/" class="hover:text-primary transition-colors" active-class="text-primary border-b-2 border-primary pb-1">الرئيسية</NuxtLink>
              <NuxtLink to="/products?category=abayas" class="text-slate-600 hover:text-primary transition-colors">العبايات</NuxtLink>
              <NuxtLink to="/products?category=hijabs" class="text-slate-600 hover:text-primary transition-colors">الحجاب</NuxtLink>
              <NuxtLink to="/products?category=prayer" class="text-slate-600 hover:text-primary transition-colors">ملابس الصلاة</NuxtLink>
              <NuxtLink to="/products" class="text-slate-600 hover:text-primary transition-colors">العروض</NuxtLink>
            </nav>
          </div>

          <!-- Search -->
          <div class="flex-1 max-w-md mx-8 hidden lg:block">
            <div class="relative group">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                v-model="searchQuery"
                @keyup.enter="onSearch"
                class="block w-full pr-10 pl-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-900 rounded-xl transition-all placeholder:text-slate-500 outline-none"
                placeholder="ابحثي عن عباية، حجاب، أو علامة تجارية..."
                type="text"
              />
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Wishlist -->
            <NuxtLink v-if="isLoggedIn" to="/wishlist" class="p-2 text-slate-600 hover:text-primary transition-colors">
              <span class="material-symbols-outlined">favorite</span>
            </NuxtLink>

            <!-- Cart -->
            <NuxtLink to="/cart" class="relative p-2 text-slate-600 hover:text-primary transition-colors">
              <span class="material-symbols-outlined">shopping_bag</span>
              <span v-if="cartCount > 0" class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">
                {{ cartCount }}
              </span>
            </NuxtLink>

            <div class="h-6 w-px bg-slate-200 dark:border-slate-700" />

            <!-- Auth -->
            <template v-if="isLoggedIn">
              <NuxtLink to="/account" class="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                <span class="material-symbols-outlined text-[20px]">person</span>
                <span class="hidden sm:inline">حسابي</span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="px-4 py-2 text-sm font-bold text-primary border border-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                دخول
              </NuxtLink>
              <NuxtLink to="/auth/register" class="px-4 py-2 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-all hidden sm:block">
                تسجيل
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-primary text-white p-1.5 rounded-lg">
                <span class="material-symbols-outlined text-[20px]">shield_with_heart</span>
              </div>
              <span class="text-xl font-bold font-display">ساتر</span>
            </div>
            <p class="text-sm text-slate-500 leading-relaxed">
              وجهتك الأولى للموضة المحتشمة في المملكة العربية السعودية. نوفر لك أفضل المنتجات بأجود الأسعار.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold mb-4">روابط سريعة</h4>
            <ul class="space-y-2 text-sm text-slate-500">
              <li><NuxtLink to="/about" class="hover:text-primary">من نحن</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-primary">تواصل معنا</NuxtLink></li>
              <li><NuxtLink to="/blog" class="hover:text-primary">المدونة</NuxtLink></li>
              <li><NuxtLink to="/careers" class="hover:text-primary">وظائف</NuxtLink></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 class="font-bold mb-4">خدمة العملاء</h4>
            <ul class="space-y-2 text-sm text-slate-500">
              <li><NuxtLink to="/shipping" class="hover:text-primary">سياسة الشحن</NuxtLink></li>
              <li><NuxtLink to="/returns" class="hover:text-primary">الاستبدال والاسترجاع</NuxtLink></li>
              <li><NuxtLink to="/account/orders" class="hover:text-primary">تتبع الطلب</NuxtLink></li>
              <li><NuxtLink to="/faq" class="hover:text-primary">الأسئلة الشائعة</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold mb-4">تواصل معنا</h4>
            <div class="space-y-2 text-sm text-slate-500">
              <p class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-primary">call</span>
                ٤٥٦٧-١٢٣-٠٥٦
              </p>
              <p class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-primary">mail</span>
                care@sater.com
              </p>
              <p class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px] text-primary">location_on</span>
                الرياض، المملكة العربية السعودية
              </p>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div class="mt-12 p-8 bg-primary/10 rounded-2xl text-center">
          <span class="material-symbols-outlined text-primary text-4xl">mail</span>
          <h3 class="text-xl font-bold mt-2 mb-1">انضمي إلى عائلة ساتر</h3>
          <p class="text-sm text-slate-500 mb-4">اشتركي في نشرتنا البريدية لتصلك أحدث التشكيلات والعروض الحصرية</p>
          <div class="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="بريدك الإلكتروني" class="flex-1 input-field text-sm" />
            <button class="btn-primary text-sm px-5 py-2.5">اشتراك</button>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
          © ٢٠٢٤ ساتر للموضة المحتشمة. جميع الحقوق محفوظة.
          <span class="mx-2">|</span>
          <NuxtLink to="/privacy" class="hover:text-primary">سياسة الخصوصية</NuxtLink>
          <span class="mx-2">|</span>
          <NuxtLink to="/terms" class="hover:text-primary">شروط الاستخدام</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn } = useAuth()
const { cartCount, fetchCart } = useCart()

const searchQuery = ref('')

const onSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/products?q=${encodeURIComponent(searchQuery.value)}`)
  }
}

// Fetch cart on mount
onMounted(() => {
  fetchCart()
})
</script>
