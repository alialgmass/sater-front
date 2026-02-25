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
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm">
        <div class="text-center space-y-6">
          <div class="space-y-2">
            <h1 class="text-2xl font-bold">تأكيد رقم الهاتف</h1>
            <p class="text-slate-500 text-sm leading-relaxed">
              تم إرسال رمز التحقق المكون من 4 أرقام إلى رقم هاتفك المسجل ({{ phone }}). يرجى إدخاله للمتابعة.
            </p>
          </div>

          <!-- OTP Input Boxes -->
          <div class="flex justify-center gap-4" dir="ltr">
            <input
              v-for="i in 4"
              :key="i"
              :id="'otp-' + (i - 1)"
              v-model="otpDigits[i - 1]"
              type="text"
              maxlength="1"
              class="w-14 h-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              @input="onOtpInput($event, i - 1)"
              @keydown.backspace="onOtpBackspace($event, i - 1)"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{{ error }}</div>

          <button
            @click="onVerify"
            :disabled="loading || otpDigits.some(d => !d)"
            class="btn-primary w-full py-4 text-base"
          >
            {{ loading ? 'جاري التحقق...' : 'تأكيد الرمز' }}
          </button>

          <!-- Timer & Resend -->
          <div class="space-y-3">
            <div class="flex items-center justify-center gap-2">
              <div class="bg-primary/5 text-primary px-3 py-1 rounded-lg text-sm font-bold min-w-[50px]">
                {{ Math.floor(timer / 60).toString().padStart(2, '0') }}
              </div>
              <span class="font-bold">:</span>
              <div class="bg-primary/5 text-primary px-3 py-1 rounded-lg text-sm font-bold min-w-[50px]">
                {{ (timer % 60).toString().padStart(2, '0') }}
              </div>
            </div>
            <div class="flex justify-center gap-4 text-xs font-medium">
              <span class="text-slate-400">ثانية</span>
              <span class="text-slate-400">دقيقة</span>
            </div>
            
            <p class="text-sm text-slate-500 pt-2">
              لم يصلك الرمز؟ 
              <button 
                @click="resendOtp" 
                :disabled="timer > 0 || loading"
                class="text-primary font-bold hover:underline disabled:opacity-50 disabled:no-underline"
              >
                إعادة إرسال الرمز
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../composables/useAuth'

const { verifyOtp, resendOtp: authResendOtp } = useAuth()
const route = useRoute()
const router = useRouter()

const phone = computed(() => route.query.phone as string || '')
const redirect = computed(() => route.query.redirect as string || '/')

const error = ref('')
const loading = ref(false)
const otpDigits = ref(['', '', '', ''])
const timer = ref(120)
let timerInterval: any = null

const startTimer = () => {
  timer.value = 120
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) timer.value--
    else clearInterval(timerInterval)
  }, 1000)
}

const onOtpInput = (e: any, index: number) => {
  const val = e.target.value
  if (val && index < 3) {
    const nextInput = document.getElementById(`otp-${index + 1}`)
    nextInput?.focus()
  }
}

const onOtpBackspace = (e: any, index: number) => {
  if (!otpDigits.value[index] && index > 0) {
    const prevInput = document.getElementById(`otp-${index - 1}`)
    prevInput?.focus()
  }
}

const onVerify = async () => {
  loading.value = true
  error.value = ''
  const code = otpDigits.value.join('')
  const res = await verifyOtp(phone.value, code)
  if (res.error) {
    error.value = res.error
  } else {
    router.push(redirect.value)
  }
  loading.value = false
}

const resendOtp = async () => {
  if (!phone.value) return
  error.value = ''
  loading.value = true
  const res = await authResendOtp(phone.value)
  if (res.error) {
    error.value = res.error
  } else {
    otpDigits.value = ['', '', '', '']
    startTimer()
  }
  loading.value = false
}

onMounted(() => {
  if (!phone.value) {
    router.push('/auth/login')
  } else {
    resendOtp()
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

useHead({ title: 'تأكيد الرمز | ساتر' })
definePageMeta({ layout: false })
</script>
