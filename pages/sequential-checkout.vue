<template>
  <div class="checkout-container">
    <div class="checkout-header">
      <h1>{{ $t('checkout.title') }}</h1>
      <div class="progress-bar">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="step"
          :class="{ active: currentStep >= index, completed: currentStep > index }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-label">{{ $t(`checkout.steps.${step.key}`) }}</div>
        </div>
      </div>
    </div>

    <div class="checkout-content">
      <!-- Step 1: Customer Information -->
      <div v-if="currentStep === 0" class="checkout-step">
        <h2>{{ $t('checkout.customerInfo.title') }}</h2>
        <form @submit.prevent="handleCustomerInfoSubmit">
          <div class="form-group">
            <label for="email">{{ $t('checkout.customerInfo.email') }} *</label>
            <input
              id="email"
              v-model="customerInfo.email"
              type="email"
              required
              :placeholder="$t('checkout.customerInfo.emailPlaceholder')"
            />
          </div>
          
          <div class="form-group">
            <label for="phone">{{ $t('checkout.customerInfo.phone') }} *</label>
            <input
              id="phone"
              v-model="customerInfo.phone"
              type="tel"
              required
              :placeholder="$t('checkout.customerInfo.phonePlaceholder')"
            />
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" :disabled="checkout.loading">
              {{ checkout.loading ? $t('common.loading') : $t('common.continue') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Step 2: Shipping Address -->
      <div v-if="currentStep === 1" class="checkout-step">
        <h2>{{ $t('checkout.shippingAddress.title') }}</h2>
        <form @submit.prevent="handleShippingAddressSubmit">
          <div class="form-row">
            <div class="form-group half-width">
              <label for="country">{{ $t('checkout.shippingAddress.country') }} *</label>
              <select
                id="country"
                v-model="shippingAddress.country"
                required
              >
                <option value="">{{ $t('checkout.selectCountry') }}</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <!-- Add more countries as needed -->
              </select>
            </div>
            
            <div class="form-group half-width">
              <label for="city">{{ $t('checkout.shippingAddress.city') }} *</label>
              <input
                id="city"
                v-model="shippingAddress.city"
                type="text"
                required
                :placeholder="$t('checkout.shippingAddress.cityPlaceholder')"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="street">{{ $t('checkout.shippingAddress.street') }} *</label>
            <input
              id="street"
              v-model="shippingAddress.street"
              type="text"
              required
              :placeholder="$t('checkout.shippingAddress.streetPlaceholder')"
            />
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="goToPreviousStep">
              {{ $t('common.back') }}
            </button>
            <button type="submit" class="btn btn-primary" :disabled="checkout.loading">
              {{ checkout.loading ? $t('common.loading') : $t('common.continue') }}
            </button>
          </div>
        </form>
      </div>

      <!-- Step 3: Shipping Method -->
      <div v-if="currentStep === 2" class="checkout-step">
        <h2>{{ $t('checkout.shippingMethod.title') }}</h2>
        
        <div class="shipping-methods">
          <div
            v-for="method in shippingMethods"
            :key="method.value"
            class="shipping-option"
            :class="{ selected: selectedShippingMethod === method.value }"
            @click="selectedShippingMethod = method.value"
          >
            <div class="radio-input">
              <input
                :id="`shipping-${method.value}`"
                v-model="selectedShippingMethod"
                type="radio"
                :value="method.value"
                :name="`shipping-method`"
              />
              <label :for="`shipping-${method.value}`">{{ method.label }}</label>
            </div>
            <div class="shipping-details">
              <p>{{ method.description }}</p>
              <p class="price">{{ method.price }}</p>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goToPreviousStep">
            {{ $t('common.back') }}
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            :disabled="!selectedShippingMethod || checkout.loading"
            @click="handleShippingMethodSubmit"
          >
            {{ checkout.loading ? $t('common.loading') : $t('common.continue') }}
          </button>
        </div>
      </div>

      <!-- Step 4: Payment Method -->
      <div v-if="currentStep === 3" class="checkout-step">
        <h2>{{ $t('checkout.paymentMethod.title') }}</h2>
        
        <div class="payment-methods">
          <div
            v-for="method in paymentMethods"
            :key="method.value"
            class="payment-option"
            :class="{ selected: selectedPaymentMethod === method.value }"
            @click="selectedPaymentMethod = method.value"
          >
            <div class="radio-input">
              <input
                :id="`payment-${method.value}`"
                v-model="selectedPaymentMethod"
                type="radio"
                :value="method.value"
                :name="`payment-method`"
              />
              <label :for="`payment-${method.value}`">{{ method.label }}</label>
            </div>
            <div class="payment-details">
              <p>{{ method.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goToPreviousStep">
            {{ $t('common.back') }}
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            :disabled="!selectedPaymentMethod || checkout.loading"
            @click="handlePaymentMethodSubmit"
          >
            {{ checkout.loading ? $t('common.loading') : $t('common.continue') }}
          </button>
        </div>
      </div>

      <!-- Step 5: Coupon & Review -->
      <div v-if="currentStep === 4" class="checkout-step">
        <h2>{{ $t('checkout.review.title') }}</h2>
        
        <!-- Coupon Section -->
        <div class="coupon-section">
          <div class="form-group">
            <label for="coupon">{{ $t('checkout.coupon.code') }}</label>
            <div class="coupon-input-wrapper">
              <input
                id="coupon"
                v-model="couponCode"
                type="text"
                :placeholder="$t('checkout.coupon.placeholder')"
              />
              <button 
                type="button" 
                class="btn btn-outline"
                :disabled="!couponCode || checkout.loading"
                @click="applyCoupon"
              >
                {{ $t('checkout.coupon.apply') }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="order-summary">
          <h3>{{ $t('checkout.summary.title') }}</h3>
          <div v-if="checkout.checkoutData.summary" class="summary-details">
            <div 
              v-for="(vendorGroup, vendorName) in checkout.checkoutData.summary.items_by_vendor" 
              :key="vendorName"
              class="vendor-group"
            >
              <h4>{{ vendorName }}</h4>
              <div 
                v-for="item in vendorGroup.items" 
                :key="item.id" 
                class="summary-item"
              >
                <span>{{ item.name }} x{{ item.quantity }}</span>
                <span>{{ formatPrice(item.total_price) }}</span>
              </div>
            </div>
            
            <div class="summary-totals">
              <div class="total-row">
                <span>{{ $t('checkout.summary.subtotal') }}</span>
                <span>{{ formatPrice(checkout.checkoutData.summary.subtotal) }}</span>
              </div>
              <div class="total-row">
                <span>{{ $t('checkout.summary.tax') }}</span>
                <span>{{ formatPrice(checkout.checkoutData.summary.tax) }}</span>
              </div>
              <div class="total-row">
                <span>{{ $t('checkout.summary.shipping') }}</span>
                <span>{{ formatPrice(checkout.checkoutData.summary.shipping_fee) }}</span>
              </div>
              <div v-if="checkout.checkoutData.summary.discount" class="total-row discount">
                <span>{{ $t('checkout.summary.discount') }}</span>
                <span>-{{ formatPrice(checkout.checkoutData.summary.discount) }}</span>
              </div>
              <div class="total-row total">
                <span>{{ $t('checkout.summary.total') }}</span>
                <span>{{ formatPrice(checkout.checkoutData.summary.total) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goToPreviousStep">
            {{ $t('common.back') }}
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            :disabled="checkout.loading"
            @click="placeOrder"
          >
            {{ checkout.loading ? $t('common.loading') : $t('checkout.placeOrder') }}
          </button>
        </div>
      </div>

      <!-- Step 6: Order Confirmation -->
      <div v-if="currentStep === 5" class="checkout-step">
        <div class="confirmation-content">
          <div class="success-icon">✓</div>
          <h2>{{ $t('checkout.confirmation.successTitle') }}</h2>
          <p>{{ $t('checkout.confirmation.successMessage') }}</p>
          <p><strong>{{ $t('checkout.confirmation.orderNumber') }}:</strong> {{ orderNumber }}</p>
          <p><strong>{{ $t('checkout.confirmation.totalAmount') }}:</strong> {{ formatPrice(orderTotal) }}</p>
          
          <div class="form-actions">
            <NuxtLink to="/" class="btn btn-primary">
              {{ $t('checkout.confirmation.continueShopping') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCheckout, useCartKey } from '~/composables/checkout'

export default {
  name: 'NewCheckoutPage',
  layout: 'default', // Adjust layout as needed
  
  data() {
    return {
      // State
      currentStep: 0,
      customerInfo: {
        email: '',
        phone: ''
      },
      shippingAddress: {
        country: 'Saudi Arabia',
        city: '',
        street: ''
      },
      selectedShippingMethod: '',
      selectedPaymentMethod: '',
      couponCode: '',
      orderNumber: '',
      orderTotal: 0,
      
      // Options
      shippingMethods: [
        { value: 'standard', label: 'Standard Shipping', description: 'Delivery in 3-5 business days', price: 'Free' },
        { value: 'express', label: 'Express Shipping', description: 'Delivery in 1-2 business days', price: '+$9.99' }
      ],
      paymentMethods: [
        { value: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
        { value: 'online', label: 'Online Payment', description: 'Secure online payment' }
      ],
      
      // Steps definition
      steps: [
        { key: 'customer_info', title: 'Customer Info' },
        { key: 'shipping_address', title: 'Shipping Address' },
        { key: 'shipping_method', title: 'Shipping Method' },
        { key: 'payment_method', title: 'Payment Method' },
        { key: 'review', title: 'Review & Place Order' },
        { key: 'confirmation', title: 'Confirmation' }
      ]
    }
  },
  
  // Initialize the checkout composable
  created() {
    this.checkout = useCheckout();
  },
  
  methods: {
    async handleCustomerInfoSubmit() {
      try {
        // Initialize cart key composable
        const cartKeyHelper = useCartKey()
        const cartKey = cartKeyHelper.getCartKey()
        await this.checkout.startCheckout(this.customerInfo.email, this.customerInfo.phone, cartKey)
        this.goToNextStep()
      } catch (error) {
        console.error('Customer info submission error:', error)
        alert(error.message || this.$t('checkout.errors.initialization') || 'An error occurred during checkout initialization.')
      }
    },
    
    async handleShippingAddressSubmit() {
      try {
        await this.checkout.setShippingAddress(this.shippingAddress)
        this.goToNextStep()
      } catch (error) {
        console.error('Shipping address submission error:', error)
        alert(error.message || this.$t('checkout.errors.shippingAddress') || 'An error occurred while saving your shipping address.')
      }
    },
    
    async handleShippingMethodSubmit() {
      try {
        await this.checkout.selectShippingMethod(this.selectedShippingMethod)
        this.goToNextStep()
      } catch (error) {
        console.error('Shipping method selection error:', error)
        alert(error.message || this.$t('checkout.errors.shippingMethod') || 'An error occurred while selecting your shipping method.')
      }
    },
    
    async handlePaymentMethodSubmit() {
      try {
        await this.checkout.selectPaymentMethod(this.selectedPaymentMethod)
        await this.checkout.getCheckoutSummary() // Get summary before review
        this.goToNextStep()
      } catch (error) {
        console.error('Payment method selection error:', error)
        alert(error.message || this.$t('checkout.errors.paymentMethod') || 'An error occurred while selecting your payment method.')
      }
    },
    
    async applyCoupon() {
      try {
        await this.checkout.applyCoupon(this.couponCode)
        await this.checkout.getCheckoutSummary() // Refresh summary with coupon applied
        this.couponCode = '' // Clear the coupon input
      } catch (error) {
        console.error('Coupon application error:', error)
        alert(error.message || this.$t('checkout.errors.coupon') || 'An error occurred while applying the coupon.')
      }
    },
    
    async placeOrder() {
      try {
        const result = await this.checkout.confirmOrder()
        this.orderNumber = result.order_number
        this.orderTotal = result.total_amount
        this.goToNextStep()
      } catch (error) {
        console.error('Place order error:', error)
        if (error.message.includes('Checkout session expired')) {
          alert(this.$t('checkout.errors.sessionExpired') || 'Checkout session expired. Please restart the checkout process.')
          // Reset checkout and go back to start
          this.checkout.resetCheckout()
          this.currentStep = 0
        } else {
          alert(error.message || this.$t('checkout.errors.orderPlacement') || 'An error occurred while placing your order.')
        }
      }
    },
    
    // Navigation helpers
    goToNextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    },
    
    goToPreviousStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    
    // Format price helper
    formatPrice(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD' // Adjust currency as needed
      }).format(amount)
    }
  },
  
  beforeDestroy() {
    // Optionally reset checkout when leaving the page
    // this.checkout.resetCheckout()
  }
}
</script>

<style scoped>
.checkout-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.checkout-header h1 {
  text-align: center;
  margin-bottom: 30px;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ddd;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  font-weight: bold;
}

.step.active .step-number {
  background-color: #007bff;
  color: white;
}

.step.completed .step-number {
  background-color: #28a745;
  color: white;
}

.step-label {
  font-size: 12px;
  text-align: center;
}

.checkout-step {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group.half-width {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
}

.shipping-methods, .payment-methods {
  margin-bottom: 30px;
}

.shipping-option, .payment-option {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.shipping-option.selected, .payment-option.selected {
  border-color: #007bff;
  background-color: #f8f9ff;
}

.radio-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-input input {
  width: auto;
  margin-right: 10px;
}

.shipping-details, .payment-details {
  margin-left: 25px;
}

.price {
  font-weight: bold;
  color: #007bff;
}

.coupon-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.coupon-input-wrapper {
  display: flex;
  gap: 10px;
}

.coupon-input-wrapper input {
  flex: 1;
}

.order-summary {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.vendor-group h4 {
  margin: 15px 0 10px 0;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.summary-totals {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.total-row.discount {
  color: #28a745;
}

.total-row.total {
  font-weight: bold;
  font-size: 18px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
}

.confirmation-content {
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn {
    width: 100%;
  }
  
  .coupon-input-wrapper {
    flex-direction: column;
  }
}
</style>