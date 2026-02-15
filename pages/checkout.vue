<template>
    <div class="cart-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('checkout')" />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100">
            <div class="container">
                <div class="row" v-if="products.length > 0">
                    <div class="col-lg-7">
                        <div class="billing-info-wrap">
                            <h3>{{ $t('billing_details') }}</h3>
                            <div class="row">
                                 <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('first_name') }}</label>
                                        <input type="text" v-model="form.first_name">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('last_name') }}</label>
                                        <input type="text" v-model="form.last_name">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('company_name') }}</label>
                                        <input type="text" v-model="form.company_name">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-select mb-20">
                                        <label>{{ $t('country') }}</label>
                                        <select v-model="form.country">
                                            <option>{{ $t('select_country') }}</option>
                                            <option>Azerbaijan</option>
                                            <option>Bahamas</option>
                                            <option>Bahrain</option>
                                            <option>Bangladesh</option>
                                            <option>Barbados</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('street_address') }}</label>
                                        <input class="billing-address" :placeholder="$t('house_placeholder')" type="text" v-model="form.street_address">
                                        <input :placeholder="$t('apartment_placeholder')" type="text" v-model="form.apartment">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('city') }}</label>
                                        <input type="text" v-model="form.city">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('state') }}</label>
                                        <input type="text" v-model="form.state">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('postcode') }}</label>
                                        <input type="text" v-model="form.postcode">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('phone') }}</label>
                                        <input type="text" v-model="form.phone">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>{{ $t('email_address') }}</label>
                                        <input type="text" v-model="form.email">
                                    </div>
                                </div>
                            </div>
                            <div class="additional-info-wrap">
                                <h4>{{ $t('additional_info') }}</h4>
                                <div class="additional-info">
                                    <label>{{ $t('order_notes') }}</label>
                                    <textarea :placeholder="$t('order_notes_placeholder')" name="message" v-model="form.notes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="your-order-area">
                            <h3>{{ $t('your_order') }}</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-product-info">
                                    <div class="your-order-top">
                                        <ul>
                                            <li>{{ $t('product') || 'Product' }}</li>
                                            <li>{{ $t('total') }}</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-middle">
                                        <ul>
                                            <li v-for="(item, index) in products" :key="index">
                                                <span class="order-middle-left">{{ item.product ? item.product.name : 'Product' }}  X  {{ item.quantity }}</span> <span class="order-price">${{ (parseFloat(item.price || 0) * item.quantity).toFixed(2) }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="your-order-bottom">
                                        <ul>
                                            <li class="your-order-shipping">{{ $t('shipping') }}</li>
                                            <li>{{ $t('free_shipping_label') }}</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-total">
                                        <ul>
                                            <li class="order-total">{{ $t('total') }}</li>
                                            <li>${{ parseFloat(total || 0).toFixed(2) }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="place-order mt-25">
                                <button class="btn-hover" @click="placeOrder" :disabled="loading">
                                    {{ loading ? $t('placing_order') : $t('place_order') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
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
                form: {
                    first_name: '',
                    last_name: '',
                    company_name: '',
                    country: 'Azerbaijan',
                    street_address: '',
                    apartment: '',
                    city: '',
                    state: '',
                    postcode: '',
                    phone: '',
                    email: '',
                    notes: ''
                },
                loading: false
            }
        },

        computed: {
            products() {
                return this.$store.getters['cart/getCart']
            },

            total() {
                return this.$store.getters['cart/getTotal']
            },
        },

        methods: {
            async placeOrder() {
                this.loading = true
                try {
                    const orderData = {
                        billing_details: this.form,
                        items: this.products.map(item => ({
                            product_id: item.product_id,
                            quantity: item.quantity,
                            price: item.price
                        })),
                        total: this.total
                    }
                    const response = await this.$orderService.checkout(orderData)
                    this.$notify({ type: 'success', text: 'Order placed successfully!'})
                    this.$store.dispatch('cart/fetchCart') // Clear or refresh cart
                    this.$router.push('/my-account')
                } catch (error) {
                    this.$notify({ type: 'error', text: 'Failed to place order'})
                } finally {
                    this.loading = false
                }
            }
        },

        head() {
            return {
                title: "Checkout"
            }
        },
    };
</script>
