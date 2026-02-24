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
        <!-- OTP Step -->
        <div v-if="step === 'otp'" class="text-center space-y-5">
          <span class="material-symbols-outlined text-5xl text-primary">sms</span>
          <h2 class="text-xl font-bold">تحقق من هاتفك</h2>
          <p class="text-slate-500 text-sm">أرسلنا رمز تحقق مكون من ٦ أرقام</p>
          <input
            v-model="otpCode"
            type="text"
            maxlength="6"
            class="input-field text-center text-3xl tracking-widest py-4"
            placeholder="######"
          />
          <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{{ error }}</div>
          <button @click="submitOtp" :disabled="loading" class="btn-primary w-full py-4 text-base">
            {{ loading ? 'جاري التحقق...' : 'تأكيد الرمز' }}
          </button>
        </div>

        <!-- Register Form -->
        <form v-else @submit.prevent="onRegister" class="space-y-5">
          <div>
            <label class="text-sm font-medium block mb-1">الاسم الكامل</label>
            <input v-model="form.name" type="text" required class="input-field" placeholder="اسمك الكريم" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1">رقم الهاتف</label>
            <input v-model="form.phone" type="tel" required class="input-field" placeholder="+966xxxxxxxxx" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1">البريد الإلكتروني</label>
            <input v-model="form.email" type="email" required class="input-field" placeholder="john@example.com" />
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
const { register, verifyOtp } = useAuth()

const step = ref<'register' | 'otp'>('register')
const loading = ref(false)
const error = ref('')
const otpCode = ref('')

const form = reactive({
  name: '',
  email: '',
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
  const res = await register(form)
  if (res.error) {
    error.value = res.error
  } else {
    step.value = 'otp'
  }
  loading.value = false
}

const submitOtp = async () => {
  loading.value = true
  error.value = ''
  const res = await verifyOtp(otpCode.value)
  if (res.error) {
    error.value = res.error
  } else {
    navigateTo('/')
  }
  loading.value = false
}

useHead({ title: 'إنشاء حساب | ساتر' })
definePageMeta({ layout: false })
</script>
