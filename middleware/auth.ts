// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('sater_token')
  if (!token.value) {
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})
