import { getApiBaseUrl, getAuthHeaders, handleApiError } from './api/helpers'

// Define address type
export interface Address {
  id: number
  user_id: number
  first_name: string
  last_name: string
  company?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone?: string
  email?: string
  is_default: boolean
  created_at: string
  updated_at: string
}

// Address creation/update payload
export interface AddressPayload {
  label: string
  first_name: string
  last_name: string
  street_address: string
  city: string
  state: string
  country: string
  zip_code: string
  phone?: string
  is_default?: boolean
}

/**
 * Composable for address operations
 */
export const useAddresses = () => {
  const baseUrl = getApiBaseUrl()

  /**
   * Get all addresses for the authenticated user
   */
  const getAddresses = async (): Promise<Address[]> => {
    try {
      const response = await $fetch<Address[]>(`${baseUrl}/api/addresses`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get a specific address by ID
   */
  const getAddress = async (addressId: number): Promise<Address> => {
    try {
      const response = await $fetch<Address>(`${baseUrl}/api/addresses/${addressId}`, {
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Create a new address
   */
  const createAddress = async (addressData: Omit<AddressPayload, 'is_default'>): Promise<Address> => {
    try {
      const response = await $fetch<Address>(`${baseUrl}/api/addresses`, {
        method: 'POST',
        body: addressData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Update an existing address
   */
  const updateAddress = async (
    addressId: number,
    addressData: AddressPayload
  ): Promise<Address> => {
    try {
      const response = await $fetch<Address>(`${baseUrl}/api/addresses/${addressId}`, {
        method: 'PUT',
        body: addressData,
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Delete an address
   */
  const deleteAddress = async (addressId: number): Promise<void> => {
    try {
      await $fetch(`${baseUrl}/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Set an address as the default address
   */
  const setDefaultAddress = async (addressId: number): Promise<Address[]> => {
    try {
      const response = await $fetch<Address[]>(`${baseUrl}/api/addresses/${addressId}/set-default`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })

      return response
    } catch (error: any) {
      const apiError = handleApiError(error)
      throw apiError
    }
  }

  /**
   * Get countries available for shipping
   */
  const getAvailableCountries = async (): Promise<Array<{ code: string; name: string }>> => {
    try {
      const response = await $fetch<Array<{ code: string; name: string }>>(
        `${baseUrl}/api/addresses/countries`,
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
        `${baseUrl}/api/addresses/countries/${countryCode}/states`,
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
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getAvailableCountries,
    getStatesForCountry,
  }
}