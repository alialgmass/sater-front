<template>
    <client-only>
        <div class="minicart-wrapper" :class="miniCart">
            <div class="shopping-cart-content" v-if="products.length > 0">
                <ul>
                    <li class="single-shopping-cart" v-for="(item, index) in products" :key="index">
                        <div class="shopping-cart-img">
                            <n-link :to="`/product/${item.product_id}`">
                                <img :src="item.product && item.product.images ? item.product.images[0]?.url : '/img/placeholder.png'" :alt="item.product ? item.product.name : ''">
                            </n-link>
                        </div>
                        <div class="shopping-cart-title">
                            <h4>
                                <n-link :to="`/product/${item.product_id}`">{{ item.product ? item.product.name : 'Product' }}</n-link>
                            </h4>
                            <h6>Qty: {{ item.quantity }}</h6>
                            <span>${{ parseFloat(item.price || 0).toFixed(2) }}</span>
                        </div>
                        <div class="shopping-cart-delete">
                            <button @click="removeProduct(item)">
                                <i class="fa fa-times-circle"></i>
                            </button>
                        </div>
                    </li>
                </ul>
                <div class="shopping-cart-total">
                    <h4>Total : <span class="shop-total">${{ parseFloat(total || 0).toFixed(2) }}</span></h4>
                </div>
                <div class="shopping-cart-btn btn-hover text-center" @click="$emit('minicartClose')">
                    <n-link to="/cart" class="default-btn">view cart</n-link>
                    <n-link to="/checkout" class="default-btn">checkout</n-link>
                </div>
            </div>
            <div class="shopping-cart-content text-center" v-else>
                <p>No items added to cart</p>
            </div>
        </div>
    </client-only>
</template>

<script>
    export default {
        props: ["miniCart"],

        computed: {
            products() {
                return this.$store.getters['cart/getCart']
            },
            total() {
                return this.$store.getters['cart/getTotal']
            }
        },

        methods: {
            removeProduct(item) {
                this.$notify({ type: 'success', text: 'Item removed from cart!'})
                this.$store.dispatch('cart/removeProductFromCart', item.id)
            }
        },
    };
</script>