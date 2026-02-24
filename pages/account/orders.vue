<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-bold font-display mb-8">طلباتي</h1>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="h-28 bg-slate-200 animate-pulse rounded-2xl" />
    </div>

    <div v-else-if="!orders.length" class="text-center py-20">
      <span class="material-symbols-outlined text-6xl text-slate-300">receipt_long</span>
      <h2 class="mt-4 text-xl font-bold text-slate-600">لا توجد طلبات بعد</h2>
      <p class="mt-2 text-slate-400">ابدئي التسوق لتظهر طلباتك هنا</p>
      <NuxtLink to="/products" class="mt-6 inline-block btn-primary">تسوقي الآن</NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="font-bold">طلب رقم #{{ order.id }}</p>
            <p class="text-sm text-slate-500">{{ formatDate(order.created_at) }}</p>
          </div>
          <span
            class="px-3 py-1 rounded-full text-xs font-bold"
            :class="statusClass(order.status)"
          >
            {{ statusLabel(order.status) }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <p class="text-sm text-slate-500">{{ order.items_count || order.items?.length }} منتجات</p>
          <p class="font-bold text-primary">{{ order.total }} ر.س</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { getMyOrders } = useOrders()
const orders = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  const res = await getMyOrders()
  if (res.data) {
    orders.value = (res.data as any).data || res.data
  }
  loading.value = false
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ar-SA')
}

const statusLabel = (status: string) => {
  const map: Record<string, string> = {
    pending: 'في الانتظار',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغي',
  }
  return map[status] || status
}

const statusClass = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return map[status] || 'bg-slate-100 text-slate-700'
}

useHead({ title: 'طلباتي | ساتر' })
</script>
