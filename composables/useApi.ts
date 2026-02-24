// composables/useApi.ts
// Core API integration for Sater Backend

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const getHeaders = (withAuth = false): Record<string, string> => {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    if (withAuth) {
      const token = useCookie('sater_token')
      if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
      }
    }
    return headers
  }

  const request = async <T>(
    endpoint: string,
    options: {
      method?: string
      body?: any
      auth?: boolean
      params?: Record<string, any>
    } = {}
  ): Promise<{ data: T | null; error: string | null }> => {
    try {
      const url = new URL(`${baseURL}${endpoint}`)
      if (options.params) {
        Object.entries(options.params).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            url.searchParams.append(key, String(val))
          }
        })
      }

      const response = await fetch(url.toString(), {
        method: options.method || 'GET',
        headers: getHeaders(options.auth),
        body: options.body ? JSON.stringify(options.body) : undefined,
      })

      const json = await response.json()

      if (!response.ok) {
        return { data: null, error: json.message || 'حدث خطأ ما' }
      }

      return { data: json, error: null }
    } catch (err: any) {
      return { data: null, error: err.message || 'فشل الاتصال بالخادم' }
    }
  }

  return { request, baseURL }
}
