<template>
    <div class="cart-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('cart')" />

        <div class="cart-main-area pt-90 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12" v-if="products.length > 0">
                        <h3 class="cart-page-title">{{ $t('your_cart_items') }}</h3>
                        <div class="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>{{ $t('image') || 'Image' }}</th>
                                        <th>{{ $t('product_name') }}</th>
                                        <th>{{ $t('unit_price') }}</th>
                                        <th>{{ $t('qty') }}</th>
                                        <th>{{ $t('subtotal') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in products" :key="index">
                                        <td class="product-thumbnail">
                                            <n-link :to="localePath(`/product/${item.product_id}`)">
                                                <img :src="item.product && item.product.images ? item.product.images[0]?.url : '/img/placeholder.png'" :alt="item.product ? item.product.name : ''">
                                            </n-link>
                                        </td>
                                        <td class="product-name">
                                            <n-link :to="localePath(`/product/${item.product_id}`)">{{ item.product ? item.product.name : 'Product' }}</n-link>
                                        </td>
                                        <td class="product-price-cart">
                                            <span class="amount">{{ $t('currency_symbol') }}{{ parseFloat(item.price || 0).toFixed(2) }}</span>
                                        </td>
                                        <td class="product-quantity">
                                            <div class="cart-plus-minus">
                                                <button @click="decrementProduct(item)" class="dec qtybutton">-</button>
                                                <input class="cart-plus-minus-box" type="text" :value="item.quantity" readonly>
                                                <button @click="incrementProduct(item)" class="inc qtybutton">+</button>
                                            </div>
                                        </td>
                                        <td class="product-subtotal">{{ $t('currency_symbol') }}{{ (parseFloat(item.price || 0) * item.quantity).toFixed(2) }}</td>
                                        <td class="product-remove">
                                            <button @click="removeProduct(item)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-shiping-update-wrapper">
                                    <div class="cart-shiping-update">
                                        <n-link :to="localePath('/shop')">{{ $t('continue_shopping') }}</n-link>
                                    </div>
                                    <div class="cart-clear">
                                        <button @click="clearCart()">{{ $t('clear_cart') }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                <div class="cart-tax">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gray">{{ $t('estimate_shipping') }}</h4>
                                    </div>
                                    <div class="tax-wrapper">
                                        <p>{{ $t('shipping_estimate_text') }}</p>
                                        <div class="tax-select-wrapper">
                                            <div class="tax-select">
                                                <label>
                                                    * {{ $t('country_label') }}
                                                </label>
                                                <select class="email s-email s-wid">
                                                    <option>{{ $t('bangladesh') }}</option>
                                                    <option>{{ $t('albania') }}</option>
                                                    <option>{{ $t('aland_islands') }}</option>
                                                    <option>{{ $t('afghanistan') }}</option>
                                                    <option>{{ $t('belgium') }}</option>
                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * {{ $t('region_state_label') }}
                                                </label>
                                                <select class="email s-email s-wid">
                                                    <option>{{ $t('bangladesh') }}</option>
                                                    <option>{{ $t('albania') }}</option>
                                                    <option>{{ $t('aland_islands') }}</option>
                                                    <option>{{ $t('afghanistan') }}</option>
                                                    <option>{{ $t('belgium') }}</option>
                                                </select>
                                            </div>
                                            <div class="tax-select">
                                                <label>
                                                    * {{ $t('zip_postal_label') }}
                                                </label>
                                                <input type="text">
                                            </div>
                                            <button class="cart-btn-2" type="submit">{{ $t('get_a_quote') }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="discount-code-wrapper">
                                    <div class="title-wrap">
                                    <h4 class="cart-bottom-title section-bg-gray">{{ $t('use_coupon_code') }}</h4> 
                                    </div>
                                    <div class="discount-code">
                                        <p>{{ $t('coupon_text') }}</p>
                                        <form>
                                            <input type="text" required="" name="name">
                                            <button class="cart-btn-2" type="submit">{{ $t('apply_coupon') }}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="grand-total">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">{{ $t('cart_total_title') }}</h4>
                                    </div>
                                    <h5>{{ $t('total_products') }} <span>{{ $t('currency_symbol') }}{{ parseFloat(total || 0).toFixed(2) }}</span></h5>
                                    <h4 class="grand-total-title">{{ $t('total') }}  <span>{{ $t('currency_symbol') }}{{ parseFloat(total || 0).toFixed(2) }}</span></h4>
                                    <n-link :to="localePath('/checkout')">{{ $t('proceed_to_checkout') }}</n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="empty-cart text-center">
                            <div class="icon">
                                <i class="pe-7s-cart"></i>
                            </div>
                            <h4>{{ $t('empty_cart_message') }}</h4>
                            <n-link :to="localePath('/shop')" class="empty-cart__button">{{ $t('shop_now') }}</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import('@/components/HeaderWithTopbar'),
            Breadcrumb: () => import('@/components/Breadcrumb'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        data() {
            return {
                singleQuantity: 1
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

        mounted() {
            this.$store.dispatch('cart/fetchCart')
        },

        methods: {
            incrementProduct(item) {
                this.$store.dispatch('cart/updateQuantity', {
                    itemId: item.id,
                    quantity: item.quantity + 1
                })
            },

            decrementProduct(item) {
                if (item.quantity > 1) {
                    this.$store.dispatch('cart/updateQuantity', {
                        itemId: item.id,
                        quantity: item.quantity - 1
                    })
                }
            },

            removeProduct(item) {
                this.$notify({ type: 'success', text: this.$t('item_removed') })
                this.$store.dispatch('cart/removeProductFromCart', item.id)
            },

            clearCart() {
                if (confirm(this.$t('clear_cart_confirm'))) {
                    this.$notify({ type: 'success', text: this.$t('cart_cleared') })
                    // Add clearCart action to store if needed, or loop removes
                }
            }
        },

        head() {
            return {
                title: this.$t('cart')
            }
        },
    };
</script>
