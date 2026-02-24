<template>
  <div class="min-h-screen flex items-center justify-center py-16 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-10">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="bg-primary text-white p-2 rounded-xl">
            <span class="material-symbols-outlined text-2xl">shield_with_heart</span>
          </div>
          <span class="text-3xl font-bold font-display">ساتر</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold mt-6 mb-2">مرحباً بعودتك</h1>
        <p class="text-slate-500">سجلي دخولك للوصول إلى حسابك</p>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
        <form @submit.prevent="onSubmit" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="text-sm font-medium block mb-1">البريد الإلكتروني</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="john@example.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="text-sm font-medium block mb-1">كلمة المرور</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="input-field pr-4 pl-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
              >
                <span class="material-symbols-outlined text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{{ error }}</div>

          <!-- OTP Step -->
          <div v-if="needsOtp" class="p-4 bg-primary/10 rounded-xl">
            <p class="text-sm font-medium mb-3">أدخلي رمز التحقق المرسل إلى هاتفك</p>
            <input
              v-model="otpCode"
              type="text"
              maxlength="6"
              class="input-field text-center text-2xl tracking-widest"
              placeholder="######"
            />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full py-4 text-base"
          >
            {{ loading ? 'جاري تسجيل الدخول...' : needsOtp ? 'تأكيد الرمز' : 'تسجيل الدخول' }}
          </button>

          <p class="text-center text-sm text-slate-500">
            ليس لديكِ حساب؟
            <NuxtLink to="/auth/register" class="text-primary font-bold hover:underline">سجلي الآن</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, verifyOtp } = useAuth()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const needsOtp = ref(false)
const otpCode = ref('')

const onSubmit = async () => {
  loading.value = true
  error.value = ''

  if (needsOtp.value) {
    // Verify OTP
    const res = await verifyOtp(otpCode.value)
    if (res.error) {
      error.value = res.error
    } else {
      const redirect = route.query.redirect as string || '/'
      navigateTo(redirect)
    }
  } else {
    const res = await login(form)
    if (res.error) {
      error.value = res.error
    } else {
      const d = res.data as any
      if (d?.requires_otp) {
        // Backend requires OTP verification after login
        needsOtp.value = true
      } else {
        const redirect = route.query.redirect as string || '/'
        navigateTo(redirect)
      }
    }
  }
  loading.value = false
}

useHead({ title: 'تسجيل الدخول | ساتر' })
definePageMeta({ layout: false })
</script>
