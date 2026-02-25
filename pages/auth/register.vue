<template>
  <div class="min-h-screen flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="bg-primary text-white p-2 rounded-xl">
            <span class="material-symbols-outlined text-2xl">shield_with_heart</span>
          </div>
          <span class="text-3xl font-bold font-display">ساتر</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold mt-6 mb-2">إنشاء حساب جديد</h1>
        <p class="text-slate-500">انضمي إلى عائلة ساتر</p>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
        <form @submit.prevent="onRegister" class="space-y-5">
          <div>
            <label class="text-sm font-medium block mb-1">الاسم الكامل</label>
            <input v-model="form.name" type="text" required class="input-field" placeholder="اسمك الكريم" />
          </div>
          
          <div>
            <label class="text-sm font-medium block mb-1">رقم الهاتف</label>
            <CountryCodeSelector v-model="countryCode">
              <input
                v-model="form.phone"
                type="tel"
                required
                class="input-field flex-1"
                placeholder="5xxxxxxxx"
              />
            </CountryCodeSelector>
          </div>

          <div>
            <label class="text-sm font-medium block mb-1">كلمة المرور</label>
            <input v-model="form.password" type="password" required minlength="8" class="input-field" placeholder="٨ أحرف على الأقل" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1">تأكيد كلمة المرور</label>
            <input v-model="form.password_confirmation" type="password" required class="input-field" placeholder="أعيدي كتابة كلمة المرور" />
          </div>

          <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{{ error }}</div>

          <button type="submit" :disabled="loading" class="btn-primary w-full py-4 text-base">
            {{ loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب' }}
          </button>

          <p class="text-center text-sm text-slate-500">
            لديكِ حساب بالفعل؟
            <NuxtLink to="/auth/login" class="text-primary font-bold hover:underline">تسجيل الدخول</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { register } = useAuth()

const loading = ref(false)
const error = ref('')
const countryCode = ref('+966')

const form = reactive({
  name: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const onRegister = async () => {
  if (form.password !== form.password_confirmation) {
    error.value = 'كلمتا المرور غير متطابقتان'
    return
  }
  loading.value = true
  error.value = ''
  
  // Format phone: +code + number
  const fullPhone = `${countryCode.value}${form.phone.replace(/^0+/, '')}`
  
  const res = await register({ ...form, phone: fullPhone })
  if (res.error) {
    error.value = res.error
  } else {
    navigateTo(`/auth/verify?phone=${encodeURIComponent(fullPhone)}`)
  }
  loading.value = false
}

useHead({ title: 'إنشاء حساب | ساتر' })
definePageMeta({ layout: false })
</script>
