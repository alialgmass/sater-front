// composables/useAuth.ts

export const useAuth = () => {
  const { request } = useApi()
  const token = useCookie('sater_token', { maxAge: 60 * 60 * 24 * 7 }) // 7 days
  const user = useState<any>('user', () => null)
  const isLoggedIn = computed(() => !!token.value)

  // ── Register ──────────────────────────────────────────────
  const register = async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
    phone: string
  }) => {
    const res = await request('/api/register', {
      method: 'POST',
      body: data,
    })
    if (res.data) {
      // After register, user needs OTP verification
      // Store token if returned immediately
      const d = res.data as any
      if (d.token) {
        token.value = d.token
        user.value = d.user
      }
    }
    return res
  }

  // ── Login ─────────────────────────────────────────────────
  const login = async (data: {
    email: string
    password: string
    device_name?: string
  }) => {
    const res = await request('/api/login', {
      method: 'POST',
      body: { device_name: 'web_app', ...data },
    })
    if (res.data) {
      const d = res.data as any
      if (d.token) {
        token.value = d.token
        user.value = d.user
      }
    }
    return res
  }

  // ── Verify OTP ────────────────────────────────────────────
  const verifyOtp = async (otp: string) => {
    const res = await request('/api/verify-otp', {
      method: 'POST',
      body: { otp },
      auth: true,
    })
    return res
  }

  // ── Get Profile ───────────────────────────────────────────
  const fetchProfile = async () => {
    const res = await request('/api/profile', { auth: true })
    if (res.data) {
      user.value = (res.data as any).user || res.data
    }
    return res
  }

  // ── Logout ────────────────────────────────────────────────
  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/')
  }

  return {
    token,
    user,
    isLoggedIn,
    register,
    login,
    verifyOtp,
    fetchProfile,
    logout,
  }
}
