import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

// Shipping zone type
export interface ShippingZone {
  id: number
  name: string
  country_code: string
  state_code?: string
  city?: string
  zip_codes?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// Shipping method for zone
export interface ZoneShippingMethod {
  id: number
  zone_id: number
  name: string
  description: string
  cost: number
  min_order_amount?: number
  max_order_amount?: number
  estimated_delivery_days: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Shipping zone creation/update payload
export interface ShippingZonePayload {
  name: string
  country_code: string
  state_code?: string
  city?: string
  zip_codes?: string[]
  is_active: boolean
}

// Zone shipping method payload
export interface ZoneShippingMethodPayload {
  name: string
  description: string
  cost: number
  min_order_amount?: number
  max_order_amount?: number
  estimated_delivery_days: number
  is_active: boolean
}

/**
 * Composable for admin shipping operations
 */
export const useAdminShipping = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all shipping zones
   */
  const getShippingZones = async (): Promise<ShippingZone[]> => {
    try {
      const response = await $fetch<ShippingZone[]>(`${baseUrl}/api/admin/shipping/zones`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get a specific shipping zone by ID
   */
  const getShippingZone = async (zoneId: number): Promise<ShippingZone> => {
    try {
      const response = await $fetch<ShippingZone>(`${baseUrl}/api/admin/shipping-zones/${zoneId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Create a new shipping zone
   */
  const createShippingZone = async (zoneData: { name: string; description: string; countries: string[] }): Promise<ShippingZone> => {
    try {
      const response = await $fetch<ShippingZone>(`${baseUrl}/api/admin/shipping/zones`, {
        method: 'POST',
        body: zoneData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Update an existing shipping zone
   */
  const updateShippingZone = async (
    zoneId: number,
    zoneData: ShippingZonePayload
  ): Promise<ShippingZone> => {
    try {
      const response = await $fetch<ShippingZone>(`${baseUrl}/api/admin/shipping-zones/${zoneId}`, {
        method: 'PUT',
        body: zoneData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Delete a shipping zone
   */
  const deleteShippingZone = async (zoneId: number): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/admin/shipping-zones/${zoneId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get shipping methods for a specific zone
   */
  const getZoneShippingMethods = async (zoneId: number): Promise<ZoneShippingMethod[]> => {
    try {
      const response = await $fetch<ZoneShippingMethod[]>(
        `${baseUrl}/api/admin/shipping-zones/${zoneId}/methods`,
        {
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Add a shipping method to a zone
   */
  const addZoneShippingMethod = async (
    zoneId: number,
    methodData: ZoneShippingMethodPayload
  ): Promise<ZoneShippingMethod> => {
    try {
      const response = await $fetch<ZoneShippingMethod>(
        `${baseUrl}/api/admin/shipping-zones/${zoneId}/methods`,
        {
          method: 'POST',
          body: methodData,
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Update a shipping method in a zone
   */
  const updateZoneShippingMethod = async (
    methodId: number,
    active: boolean
  ): Promise<any> => {
    try {
      const response = await $fetch(
        `${baseUrl}/api/vendor/shipping/${methodId}/status`,
        {
          method: 'PUT',
          body: { active },
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Delete a shipping method from a zone
   */
  const deleteZoneShippingMethod = async (zoneId: number, methodId: number): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/admin/shipping-zones/${zoneId}/methods/${methodId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get vendor shipping methods
   */
  const getVendorShippingMethods = async (): Promise<any[]> => {
    try {
      const response = await $fetch<any[]>(
        `${baseUrl}/api/admin/shipping/vendor-methods`,
        {
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get states/provinces for a specific country
   */
  const getStatesForCountry = async (countryCode: string): Promise<Array<{ code: string; name: string }>> => {
    try {
      const response = await $fetch<Array<{ code: string; name: string }>>(
        `${baseUrl}/api/admin/shipping/countries/${countryCode}/states`,
        {
          headers: getAuthHeaders(),
        }
      )

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  return {
    getShippingZones,
    getShippingZone,
    createShippingZone,
    updateShippingZone,
    deleteShippingZone,
    getZoneShippingMethods,
    addZoneShippingMethod,
    updateZoneShippingMethod,
    deleteZoneShippingMethod,
    getVendorShippingMethods,
    getStatesForCountry,
  }
}