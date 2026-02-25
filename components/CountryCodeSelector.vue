<template>
  <div class="relative">
    <div class="flex gap-2">
      <!-- Country Code Dropdown -->
      <div class="relative min-w-[100px]">
        <button
          @click="isOpen = !isOpen"
          type="button"
          class="flex items-center justify-between w-full h-[52px] px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary transition-all text-sm"
        >
          <div class="flex items-center gap-2">
            <span>{{ selectedCountry.flag }}</span>
            <span class="font-medium" dir="ltr">{{ selectedCountry.code }}</span>
          </div>
          <span class="material-symbols-outlined text-sm">expand_more</span>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isOpen"
          class="absolute z-50 bottom-full mb-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          <div class="max-h-60 overflow-y-auto">
            <button
              v-for="country in countries"
              :key="country.iso"
              @click="selectCountry(country)"
              type="button"
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-right"
              :class="{ 'bg-primary/5 text-primary': country.iso === selectedCountry.iso }"
            >
              <span>{{ country.flag }}</span>
              <span class="flex-1 text-sm">{{ country.name }}</span>
              <span class="text-xs font-mono text-slate-400" dir="ltr">{{ country.code }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Phone Input Overlay (managed by parent but stylistically integrated) -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Country {
  name: string
  code: string
  flag: string
  iso: string
}

const countries: Country[] = [
  { name: 'المملكة العربية السعودية', code: '+966', flag: '🇸🇦', iso: 'SA' },
  { name: 'مصر', code: '+20', flag: '🇪🇬', iso: 'EG' },
  { name: 'الإمارات', code: '+971', flag: '🇦🇪', iso: 'AE' },
  { name: 'الكويت', code: '+965', flag: '🇰🇼', iso: 'KW' },
  { name: 'قطر', code: '+974', flag: '🇶🇦', iso: 'QA' },
  { name: 'عمان', code: '+968', flag: '🇴🇲', iso: 'OM' },
  { name: 'البحرين', code: '+973', flag: '🇧🇭', iso: 'BH' },
  { name: 'الأردن', code: '+962', flag: '🇯🇴', iso: 'JO' },
]

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const selectedCountry = ref<Country>(countries.find(c => c.code === props.modelValue) || countries[0])
const isOpen = ref(false)

const selectCountry = (country: Country) => {
  selectedCountry.value = country
  emit('update:modelValue', country.code)
  isOpen.value = false
}

// Ensure parent is in sync with default if empty
onMounted(() => {
  if (!props.modelValue) {
    emit('update:modelValue', selectedCountry.value.code)
  }
})

// Close dropdown on click outside
if (process.client) {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.min-w-\\[100px\\]')) {
      isOpen.value = false
    }
  }
  window.addEventListener('click', handleClickOutside)
  onUnmounted(() => window.removeEventListener('click', handleClickOutside))
}
</script>
