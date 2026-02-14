<template>
    <div class="cart-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb pageTitle="checkout" />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100">
            <div class="container">
                <div class="row" v-if="products.length > 0">
                    <div class="col-lg-7">
                        <div class="billing-info-wrap">
                            <h3>Billing Details</h3>
                            <div class="row">
                                 <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>First Name</label>
                                        <input type="text" v-model="form.first_name">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Last Name</label>
                                        <input type="text" v-model="form.last_name">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>Company Name</label>
                                        <input type="text" v-model="form.company_name">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-select mb-20">
                                        <label>Country</label>
                                        <select v-model="form.country">
                                            <option>Select a country</option>
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
                                        <label>Street Address</label>
                                        <input class="billing-address" placeholder="House number and street name" type="text" v-model="form.street_address">
                                        <input placeholder="Apartment, suite, unit etc." type="text" v-model="form.apartment">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>Town / City</label>
                                        <input type="text" v-model="form.city">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>State / County</label>
                                        <input type="text" v-model="form.state">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Postcode / ZIP</label>
                                        <input type="text" v-model="form.postcode">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Phone</label>
                                        <input type="text" v-model="form.phone">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Email Address</label>
                                        <input type="text" v-model="form.email">
                                    </div>
                                </div>
                            </div>
                            <div class="additional-info-wrap">
                                <h4>Additional information</h4>
                                <div class="additional-info">
                                    <label>Order notes</label>
                                    <textarea placeholder="Notes about your order, e.g. special notes for delivery. " name="message" v-model="form.notes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="your-order-area">
                            <h3>Your order</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-product-info">
                                    <div class="your-order-top">
                                        <ul>
                                            <li>Product</li>
                                            <li>Total</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-middle">
                                        <ul>
                                            <li v-for="(item, index) in products" :key="index">
                                                <span class="order-middle-left">{{ item.product ? item.product.name : 'Product' }}  X  {{ item.quantity }}</span> <span class="order-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="your-order-bottom">
                                        <ul>
                                            <li class="your-order-shipping">Shipping</li>
                                            <li>Free shipping</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-total">
                                        <ul>
                                            <li class="order-total">Total</li>
                                            <li>${{ total.toFixed(2) }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="place-order mt-25">
                                <button class="btn-hover" @click="placeOrder" :disabled="loading">
                                    {{ loading ? 'Placing Order...' : 'Place Order' }}
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
                            <h4>No items found in cart to checkout</h4>
                            <n-link to="/shop" class="empty-cart__button">Shop Now</n-link>
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
</script>
