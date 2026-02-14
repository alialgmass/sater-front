<template>
    <div class="product-wrap mb-30">
        <div class="product-img">
            <n-link :to="`/product/${product.id}`">
                <img class="default-img" :src="productImage" :alt="productName">
                <img v-if="productHoverImage" class="hover-img" :src="productHoverImage" :alt="productName">
            </n-link>
            <div class="product-badges">
                <span class="product-label pink" v-if="product.is_new || product.new">New</span>
                <span class="product-label purple" v-if="product.discount">-{{ product.discount }}%</span>
            </div>
            <div class="product-action" v-if="layout === 'twoColumn' || layout === 'threeColumn'">
                <div class="pro-same-action pro-wishlist">
                    <button class="btn" title="Wishlist" @click="addToWishlist(product)"> 
                        <i class="pe-7s-like"></i>
                    </button>
                </div>
                <div class="pro-same-action pro-cart">
                    <n-link :to="`/product/${product.id}`" class="btn" v-if="product.variants && product.variants.length > 0">
                        select option
                    </n-link>
                    <button class="btn" title="Add To Cart" @click="addToCart(product)" v-else>
                        <i class="pe-7s-cart"></i> 
                        Add to cart
                    </button>
                </div>
                <div class="pro-same-action pro-quickview">
                    <button class="btn" title="Quick View" @click="onClick(product)">
                        <i class="pe-7s-look"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="product-content text-center">
            <h3>
                <n-link :to="`/product/${product.id}`">{{ productName }}</n-link>
            </h3>
            <!-- Rating can be dynamically mapped if API provides it -->
            <div class="product-rating" v-if="product.rating">
                <i v-for="n in 5" :key="n" class="fa fa-star-o" :class="{ 'yellow': n <= product.rating }"></i>
            </div>
            <div class="product-price">
                <span>${{ (product.sale_price || product.price).toFixed(2) }}</span>
                <span class="old" v-if="product.sale_price || (product.discount && product.discount > 0)">${{ product.price.toFixed(2) }}</span>
            </div>
            <div class="product-content__list-view" v-if="layout === 'list'">
                <p>{{ product.description }}</p>
                <div class="pro-action d-flex align-items-center" >
                    <div class="pro-cart btn-hover">
                        <n-link :to="`/product/${product.id}`" class="btn" v-if="product.variants && product.variants.length > 0">
                            select option
                        </n-link>
                        <button class="btn" title="Add To Cart" @click="addToCart(product)" v-else>
                            <i class="pe-7s-cart"></i> 
                            Add to cart
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
                const img = this.product.images ? this.product.images[0] : null
                if (!img) return '/img/product/fashion/1.jpg'
                return typeof img === 'string' ? img : (img.url || '/img/product/fashion/1.jpg')
            },
            productHoverImage() {
                const img = this.product.images ? this.product.images[1] : null
                if (!img) return null
                return typeof img === 'string' ? img : (img.url || null)
            }
        },

        methods: {
            async addToCart(product) {
                try {
                    await this.$store.dispatch('cart/addToCart', {
                        product: product,
                        quantity: 1
                    })
                    this.$notify({ type: 'success', text: 'Add to cart successfully!'})
                } catch (error) {
                    this.$notify({ type: 'error', text: 'Failed to add to cart'})
                }
            },

            addToWishlist(product) {
                // Implement wishlist dispatch later
                this.$notify({ title: 'Add to wishlist successfully!'})
            },

            onClick(product) {
                this.$modal.show('quickview', product);
            }
        },
    };
</script>