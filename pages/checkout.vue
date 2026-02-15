<template>
  <div class="cart-page-wrapper">
      <HeaderWithTopbar containerClass="container" />
      <Breadcrumb :pageTitle="$t('checkout')" />

      <!-- checkout section start -->
      <div class="checkout-area pt-95 pb-100">
          <div class="container">
              <!-- Progress Steps -->
              <div class="checkout-steps mb-50" v-if="currentStep < 5">
                  <div class="steps-wrapper">
                      <div 
                          v-for="(step, index) in steps" 
                          :key="index"
                          class="step-item"
                          :class="{ active: currentStep === index, completed: currentStep > index }"
                      >
                          <div class="step-number">{{ index + 1 }}</div>
                          <div class="step-label">{{ $t(step.label) }}</div>
                      </div>
                  </div>
              </div>

              <!-- Step 1: Customer Information -->
              <div class="row" v-if="currentStep === 0">
                  <div class="col-lg-8 offset-lg-2">
                      <div class="billing-info-wrap">
                          <h3>{{ $t('customer_information') }}</h3>
                          <form @submit.prevent="handleCustomerInfoSubmit">
                              <div class="row">
                                  <div class="col-lg-12">
                                      <div class="billing-info mb-20">
                                          <label>{{ $t('email_address') }} *</label>
                                          <input type="email" v-model="customerInfo.email" required>
                                      </div>
                                  </div>
                                  <div class="col-lg-12">
                                      <div class="billing-info mb-20">
                                          <label>{{ $t('phone') }} *</label>
                                          <input type="tel" v-model="customerInfo.phone" required>
                                      </div>
                                  </div>
                              </div>
                              <div class="place-order mt-25">
                                  <button type="submit" class="btn-hover" :disabled="loading">
                                      {{ loading ? $t('loading') : $t('continue') }}
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>

              <!-- Step 2: Shipping Address -->
              <div class="row" v-if="currentStep === 1">
                  <div class="col-lg-8 offset-lg-2">
                      <div class="billing-info-wrap">
                          <h3>{{ $t('shipping_address') }}</h3>
                          <form @submit.prevent="handleShippingAddressSubmit">
                              <div class="row">
                                  <div class="col-lg-12">
                                      <div class="billing-select mb-20">
                                          <label>{{ $t('country') }} *</label>
                                          <select v-model="shippingAddress.country" required>
                                              <option value="">{{ $t('select_country') }}</option>
                                              <option value="Saudi Arabia">{{ $t('saudi_arabia') }}</option>
                                              <option value="Egypt">{{ $t('egypt') }}</option>
                                              <option value="UAE">{{ $t('uae') }}</option>
                                          </select>
                                      </div>
                                  </div>
                                  <div class="col-lg-12">
                                      <div class="billing-info mb-20">
                                          <label>{{ $t('city') }} *</label>
                                          <input type="text" v-model="shippingAddress.city" required>
                                      </div>
                                  </div>
                                  <div class="col-lg-12">
                                      <div class="billing-info mb-20">
                                          <label>{{ $t('street_address') }} *</label>
                                          <input type="text" v-model="shippingAddress.street" required>
                                      </div>
                                  </div>
                              </div>
                              <div class="place-order mt-25 d-flex justify-content-between">
                                  <button type="button" class="btn-hover btn-secondary" @click="goToPreviousStep">
                                      {{ $t('back') }}
                                  </button>
                                  <button type="submit" class="btn-hover" :disabled="loading">
                                      {{ loading ? $t('loading') : $t('continue') }}
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>

              <!-- Step 3: Shipping Method -->
              <div class="row" v-if="currentStep === 2">
                  <div class="col-lg-8 offset-lg-2">
                      <div class="billing-info-wrap">
                          <h3>{{ $t('shipping_method') }}</h3>
                          <div class="shipping-methods">
                              <div 
                                  v-for="method in shippingMethods" 
                                  :key="method.value"
                                  class="shipping-option mb-20"
                                  :class="{ selected: selectedShippingMethod === method.value }"
                                  @click="selectedShippingMethod = method.value"
                              >
                                  <label class="radio-label">
                                      <input 
                                          type="radio" 
                                          :value="method.value" 
                                          v-model="selectedShippingMethod"
                                      />
                                      <span class="method-name">{{ $t(method.label) }}</span>
                                      <span class="method-description">{{ $t(method.description) }}</span>
                                      <span class="method-price">{{ method.price === 'Free' ? $t('free') : method.price }}</span>
                                  </label>
                              </div>
                          </div>
                          <div class="place-order mt-25 d-flex justify-content-between">
                              <button type="button" class="btn-hover btn-secondary" @click="goToPreviousStep">
                                  {{ $t('back') }}
                              </button>
                              <button 
                                  type="button" 
                                  class="btn-hover" 
                                  :disabled="!selectedShippingMethod || loading"
                                  @click="handleShippingMethodSubmit"
                              >
                                  {{ loading ? $t('loading') : $t('continue') }}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Step 4: Payment Method -->
              <div class="row" v-if="currentStep === 3">
                  <div class="col-lg-8 offset-lg-2">
                      <div class="billing-info-wrap">
                          <h3>{{ $t('payment_method') }}</h3>
                          <div class="payment-methods">
                              <div 
                                  v-for="method in paymentMethods" 
                                  :key="method.value"
                                  class="payment-option mb-20"
                                  :class="{ selected: selectedPaymentMethod === method.value }"
                                  @click="selectedPaymentMethod = method.value"
                              >
                                  <label class="radio-label">
                                      <input 
                                          type="radio" 
                                          :value="method.value" 
                                          v-model="selectedPaymentMethod"
                                      />
                                      <span class="method-name">{{ $t(method.label) }}</span>
                                      <span class="method-description">{{ $t(method.description) }}</span>
                                  </label>
                              </div>
                          </div>
                          <div class="place-order mt-25 d-flex justify-content-between">
                              <button type="button" class="btn-hover btn-secondary" @click="goToPreviousStep">
                                  {{ $t('back') }}
                              </button>
                              <button 
                                  type="button" 
                                  class="btn-hover" 
                                  :disabled="!selectedPaymentMethod || loading"
                                  @click="handlePaymentMethodSubmit"
                              >
                                  {{ loading ? $t('loading') : $t('continue') }}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Step 5: Review & Coupon -->
              <div class="row" v-if="currentStep === 4">
                  <div class="col-lg-7">
                      <div class="billing-info-wrap">
                          <h3>{{ $t('review_order') }}</h3>
                          
                          <!-- Coupon Section -->
                          <div class="coupon-section mb-30">
                              <div class="billing-info">
                                  <label>{{ $t('coupon_code') }}</label>
                                  <div class="coupon-input-wrapper">
                                      <input 
                                          type="text" 
                                          v-model="couponCode" 
                                          :placeholder="$t('enter_coupon')"
                                      />
                                      <button 
                                          type="button" 
                                          class="btn-hover ml-10" 
                                          :disabled="!couponCode || loading"
                                          @click="applyCoupon"
                                      >
                                          {{ $t('apply_coupon') }}
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="col-lg-5">
                      <div class="your-order-area">
                          <h3>{{ $t('your_order') }}</h3>
                          <div class="your-order-wrap gray-bg-4">
                              <div class="your-order-product-info" v-if="orderSummary">
                                  <div class="your-order-top">
                                      <ul>
                                          <li>{{ $t('product') }}</li>
                                          <li>{{ $t('total') }}</li>
                                      </ul>
                                  </div>
                                  
                                  <!-- Items grouped by vendor -->
                                  <div 
                                      v-for="(vendorGroup, vendorName) in orderSummary.items_by_vendor" 
                                      :key="vendorName"
                                      class="vendor-group"
                                  >
                                      <div class="vendor-name">{{ vendorName }}</div>
                                      <div class="your-order-middle">
                                          <ul>
                                              <li v-for="item in vendorGroup.items" :key="item.id">
                                                  <span class="order-middle-left">
                                                      {{ item.name }} X {{ item.quantity }}
                                                  </span>
                                                  <span class="order-price">{{ $t('currency_symbol') }}{{ parseFloat(item.total_price || 0).toFixed(2) }}</span>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                                  
                                  <div class="your-order-bottom">
                                      <ul>
                                          <li class="your-order-shipping">{{ $t('subtotal') }}</li>
                                          <li>{{ $t('currency_symbol') }}{{ parseFloat(orderSummary.subtotal || 0).toFixed(2) }}</li>
                                      </ul>
                                      <ul>
                                          <li class="your-order-shipping">{{ $t('tax') }}</li>
                                          <li>{{ $t('currency_symbol') }}{{ parseFloat(orderSummary.tax || 0).toFixed(2) }}</li>
                                      </ul>
                                      <ul>
                                          <li class="your-order-shipping">{{ $t('shipping') }}</li>
                                          <li>{{ $t('currency_symbol') }}{{ parseFloat(orderSummary.shipping_fee || 0).toFixed(2) }}</li>
                                      </ul>
                                      <ul v-if="orderSummary.discount">
                                          <li class="your-order-shipping">{{ $t('discount') }}</li>
                                          <li class="discount-amount">-{{ $t('currency_symbol') }}{{ parseFloat(orderSummary.discount || 0).toFixed(2) }}</li>
                                      </ul>
                                  </div>
                                  
                                  <div class="your-order-total">
                                      <ul>
                                          <li class="order-total">{{ $t('total') }}</li>
                                          <li>{{ $t('currency_symbol') }}{{ parseFloat(orderSummary.total || 0).toFixed(2) }}</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="place-order mt-25 d-flex justify-content-between">
                              <button type="button" class="btn-hover btn-secondary" @click="goToPreviousStep">
                                  {{ $t('back') }}
                              </button>
                              <button 
                                  type="button" 
                                  class="btn-hover" 
                                  :disabled="loading"
                                  @click="placeOrder"
                              >
                                  {{ loading ? $t('placing_order') : $t('place_order') }}
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Step 6: Order Confirmation -->
              <div class="row" v-if="currentStep === 5">
                  <div class="col-12">
                      <div class="order-confirmation text-center">
                          <div class="success-icon mb-30">
                              <i class="pe-7s-check"></i>
                          </div>
                          <h2>{{ $t('order_success_title') }}</h2>
                          <p class="mb-20">{{ $t('order_success_message') }}</p>
                          <p><strong>{{ $t('order_number') }}:</strong> {{ orderNumber }}</p>
                          <p><strong>{{ $t('total') }}:</strong> {{ $t('currency_symbol') }}{{ parseFloat(orderTotal || 0).toFixed(2) }}</p>
                          
                          <div class="mt-40">
                              <n-link :to="localePath('/')" class="btn-hover">
                                  {{ $t('continue_shopping') }}
                              </n-link>
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Empty Cart Message -->
              <div class="row" v-if="products.length === 0 && currentStep === 0">
                  <div class="col-12">
                      <div class="empty-cart text-center">
                          <div class="icon">
                              <i class="pe-7s-cash"></i>
                          </div>
                          <h4>{{ $t('empty_cart_message') }}</h4>
                          <n-link :to="localePath('/shop')" class="empty-cart__button">{{ $t('shop_now') }}</n-link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- checkout section end -->
      <TheFooter />
  </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import("@/components/HeaderWithTopbar"),
            Breadcrumb: () => import("@/components/Breadcrumb"),
            TheFooter: () => import("@/components/TheFooter"),
        },

        data() {
            return {
                currentStep: 0,
                loading: false,
                sessionKey: null,
                
                // Step data
                customerInfo: {
                    email: '',
                    phone: ''
                },
                shippingAddress: {
                    country: '',
                    city: '',
                    street: ''
                },
                selectedShippingMethod: '',
                selectedPaymentMethod: '',
                couponCode: '',
                orderSummary: null,
                orderNumber: '',
                orderTotal: 0,
                
                // Step definitions
                steps: [
                    { label: 'customer_information' },
                    { label: 'shipping_address' },
                    { label: 'shipping_method' },
                    { label: 'payment_method' },
                    { label: 'review_order' },
                    { label: 'order_confirmation' }
                ],
                
                // Options
                shippingMethods: [
                    { value: 'standard', label: 'standard_shipping', description: 'delivery_3_5_days', price: 'Free' },
                    { value: 'express', label: 'express_shipping', description: 'delivery_1_2_days', price: '+$9.99' }
                ],
                paymentMethods: [
                    { value: 'cod', label: 'cash_on_delivery', description: 'pay_on_receive' },
                    { value: 'online', label: 'online_payment', description: 'secure_online_payment' }
                ]
            }
        },

        computed: {
            products() {
                return this.$store.getters['cart/getCart']
            },
            
            cartKey() {
                // Get cart key from localStorage for guest users
                return localStorage.getItem('cart_key') || null
            }
        },

        methods: {
            async handleCustomerInfoSubmit() {
                this.loading = true
                try {
                    const response = await this.$checkoutService.startCheckout(
                        this.customerInfo.email,
                        this.customerInfo.phone,
                        this.cartKey
                    )
                    this.sessionKey = response.session_key
                    this.goToNextStep()
                } catch (error) {
                    console.error('Customer info error:', error)
                    this.$notify({ 
                        type: 'error', 
                        text: error.response?.data?.message || this.$t('checkout_error')
                    })
                } finally {
                    this.loading = false
                }
            },

            async handleShippingAddressSubmit() {
                this.loading = true
                try {
                    await this.$checkoutService.setShippingAddress(
                        this.sessionKey,
                        this.shippingAddress
                    )
                    this.goToNextStep()
                } catch (error) {
                    console.error('Shipping address error:', error)
                    this.$notify({ 
                        type: 'error', 
                        text: error.response?.data?.message || this.$t('checkout_error')
                    })
                } finally {
                    this.loading = false
                }
            },

            async handleShippingMethodSubmit() {
                this.loading = true
                try {
                    await this.$checkoutService.selectShippingMethod(
                        this.sessionKey,
                        this.selectedShippingMethod
                    )
                    this.goToNextStep()
                } catch (error) {
                    console.error('Shipping method error:', error)
                    this.$notify({ 
                        type: 'error', 
                        text: error.response?.data?.message || this.$t('checkout_error')
                    })
                } finally {
                    this.loading = false
                }
            },

            async handlePaymentMethodSubmit() {
                this.loading = true
                try {
                    await this.$checkoutService.selectPaymentMethod(
                        this.sessionKey,
                        this.selectedPaymentMethod
                    )
                    // Get summary after payment method is selected
                    await this.fetchOrderSummary()
                    this.goToNextStep()
                } catch (error) {
                    console.error('Payment method error:', error)
                    this.$notify({ 
                        type: 'error', 
                        text: error.response?.data?.message || this.$t('checkout_error')
                    })
                } finally {
                    this.loading = false
                }
            },

            async applyCoupon() {
                this.loading = true
                try {
                    await this.$checkoutService.applyCoupon(
                        this.sessionKey,
                        this.couponCode
                    )
                    // Refresh summary after coupon is applied
                    await this.fetchOrderSummary()
                    this.couponCode = ''
                    this.$notify({ 
                        type: 'success', 
                        text: this.$t('coupon_applied_success')
                    })
                } catch (error) {
                    console.error('Coupon error:', error)
                    this.$notify({ 
                        type: 'error', 
                        text: error.response?.data?.message || this.$t('invalid_coupon_code')
                    })
                } finally {
                    this.loading = false
                }
            },

            async fetchOrderSummary() {
                try {
                    const response = await this.$checkoutService.getCheckoutSummary(this.sessionKey)
                    this.orderSummary = response
                } catch (error) {
                    console.error('Summary fetch error:', error)
                    throw error
                }
            },

            async placeOrder() {
                this.loading = true
                try {
                    const response = await this.$checkoutService.confirmOrder(this.sessionKey)
                    this.orderNumber = response.order_number
                    this.orderTotal = response.total_amount
                    
                    // Clear cart after successful order
                    await this.$store.dispatch('cart/fetchCart')
                    
                    if (this.$store.getters['auth/isAuthenticated']) {
                         this.$router.push(this.localePath('/my-account?tab=orders'))
                    } else {
                        this.goToNextStep()
                    }
                } catch (error) {
                    console.error('Place order error:', error)
                    
                    // Handle session expiry
                    if (error.response?.status === 400 && 
                        error.response?.data?.message?.includes('expired')) {
                        this.$notify({ 
                            type: 'error', 
                            text: this.$t('session_expired')
                        })
                        // Reset to start
                        this.resetCheckout()
                    } else {
                        this.$notify({ 
                            type: 'error', 
                            text: error.response?.data?.message || this.$t('failed_place_order')
                        })
                    }
                } finally {
                    this.loading = false
                }
            },

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

            resetCheckout() {
                this.currentStep = 0
                this.sessionKey = null
                this.customerInfo = { email: '', phone: '' }
                this.shippingAddress = { country: '', city: '', street: '' }
                this.selectedShippingMethod = ''
                this.selectedPaymentMethod = ''
                this.couponCode = ''
                this.orderSummary = null
            }
        },

        head() {
            return {
                title: this.$t('checkout')
            }
        },
    };
</script>

<style scoped>
.checkout-steps {
    margin-bottom: 40px;
}

.steps-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.steps-wrapper::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ddd;
    z-index: 0;
}

.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    background: white;
    padding: 0 10px;
}

.step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    font-weight: 600;
    color: #666;
}

.step-item.active .step-number {
    background-color: #a749ff;
    color: white;
}

.step-item.completed .step-number {
    background-color: #28a745;
    color: white;
}

.step-label {
    font-size: 12px;
    text-align: center;
    color: #666;
}

.step-item.active .step-label {
    color: #a749ff;
    font-weight: 600;
}

.shipping-option,
.payment-option {
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
}

.shipping-option.selected,
.payment-option.selected {
    border-color: #a749ff;
    background-color: #f8f5ff;
}

.radio-label {
    display: block;
    cursor: pointer;
    margin: 0;
}

.radio-label input[type="radio"] {
    margin-right: 10px;
}

.method-name {
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
}

.method-description {
    font-size: 13px;
    color: #666;
    display: block;
}

.method-price {
    font-weight: 600;
    color: #a749ff;
    float: right;
}

.coupon-input-wrapper {
    display: flex;
    gap: 10px;
}

.coupon-input-wrapper input {
    flex: 1;
}

.vendor-group {
    margin-bottom: 15px;
}

.vendor-name {
    font-weight: 600;
    color: #333;
    padding: 10px 0 5px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
}

.discount-amount {
    color: #28a745;
    font-weight: 600;
}

.order-confirmation {
    padding: 60px 20px;
}

.success-icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #28a745;
    color: white;
    font-size: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

@media (max-width: 768px) {
    .steps-wrapper {
        flex-wrap: wrap;
    }
    
    .step-item {
        flex-basis: 33.33%;
        margin-bottom: 20px;
    }
    
    .step-label {
        font-size: 10px;
    }
    
    .coupon-input-wrapper {
        flex-direction: column;
    }
}
</style>