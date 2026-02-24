<template>
    <div class="product-wrap mb-30">
        <div class="product-img">
            <n-link :to="localePath(`/product/${product.id}`)">
                <img class="default-img" :src="productImage" :alt="productName">
                <img v-if="productHoverImage" class="hover-img" :src="productHoverImage" :alt="productName">
            </n-link>
            <div class="product-badges">
                <span class="product-label pink" v-if="product.is_new || product.new">{{ $t('new') }}</span>
                <span class="product-label purple" v-if="product.discount">-{{ product.discount }}%</span>
            </div>
            <div class="product-action" v-if="layout === 'twoColumn' || layout === 'threeColumn'">
                <div class="pro-same-action pro-wishlist">
                    <button class="btn" :title="$t('wishlist')" @click="addToWishlist(product)"> 
                        <i class="pe-7s-like"></i>
                    </button>
                </div>
                <div class="pro-same-action pro-cart">
                    <n-link :to="localePath(`/product/${product.id}`)" class="btn" v-if="(product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0)">
                        {{ $t('select_option') }}
                    </n-link>
                    <button class="btn" :title="$t('add_to_cart')" @click="addToCart(product)" v-else>
                        <i class="pe-7s-cart"></i> 
                        {{ $t('add_to_cart') }}
                    </button>
                </div>
                <div class="pro-same-action pro-quickview">
                    <button class="btn" :title="$t('quick_view')" @click="onClick(product)">
                        <i class="pe-7s-look"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="product-content text-center">
            <h3>
                <n-link :to="localePath(`/product/${product.id}`)">{{ productName }}</n-link>
            </h3>
            <!-- Rating can be dynamically mapped if API provides it -->
            <div class="product-rating" v-if="product.rating">
                <i v-for="n in 5" :key="n" class="fa fa-star-o" :class="{ 'yellow': n <= product.rating }"></i>
            </div>
            <div class="product-price">
                <span>${{ parseFloat(discountedPrice || product.price || 0).toFixed(2) }}</span>
                <span class="old" v-if="discountedPrice">${{ parseFloat(product.price || 0).toFixed(2) }}</span>
            </div>
            <div class="product-content__list-view" v-if="layout === 'list'">
                <p>{{ product.description }}</p>
                <div class="pro-action d-flex align-items-center" >
                    <div class="pro-cart btn-hover">
                        <n-link :to="localePath(`/product/${product.id}`)" class="btn" v-if="(product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0)">
                            {{ $t('select_option') }}
                        </n-link>
                        <button class="btn" :title="$t('add_to_cart')" @click="addToCart(product)" v-else>
                            <i class="pe-7s-cart"></i> 
                            {{ $t('add_to_cart') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["product", "layout"],

        computed: {
            productName() {
                return this.product.name || this.product.title || 'Product'
            },
            productImage() {
                // Try main_image first
                if (this.product.main_image) return this.product.main_image

                const img = this.product.images ? this.product.images[0] : null
                if (!img) return '/img/product/fashion/1.jpg'
                return typeof img === 'string' ? img : (img.url || '/img/product/fashion/1.jpg')
            },
            productHoverImage() {
                const img = this.product.images ? this.product.images[1] : null
                if (!img) return null
                return typeof img === 'string' ? img : (img.url || null)
            },
            discountedPrice() {
                return this.product.discounted_price || this.product.sale_price || null
            }
        },

        methods: {
            async addToCart(product) {
                try {
                    await this.$store.dispatch('cart/addToCart', {
                        product: product,
                        quantity: 1
                    })
                    this.$notify({ type: 'success', text: this.$t('add_to_cart_success') })
                } catch (error) {
                    this.$notify({ type: 'error', text: this.$t('error_occurred') || 'Failed to add to cart' })
                }
            },

            addToWishlist(product) {
                // Implement wishlist dispatch later
                this.$notify({ title: this.$t('add_to_wishlist_success') })
            },

            onClick(product) {
                this.$modal.show('quickview', product);
            }
        },
    };
</script>