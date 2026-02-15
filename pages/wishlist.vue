<template>
    <div class="cart-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb pageTitle="wishlist" />
        
        <!-- wishlist section start -->
        <div class="cart-main-area pt-90 pb-100">
            <div class="container">
                <div class="row" v-if="products.length > 0">
                    <div class="col-12">
                        <h3 class="cart-page-title">Your wishlist items</h3>
                        <div class="table-content table-responsive cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Until Price</th>
                                        <th>Add To Cart</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in products" :key="index">
                                        <td class="product-thumbnail">
                                            <n-link :to="`/product/${product.id}`">
                                                <img :src="product.images ? product.images[0]?.url : '/img/placeholder.png'" :alt="product.name">
                                            </n-link>
                                        </td>
                                        <td class="product-name">
                                            <n-link :to="`/product/${product.id}`">{{ product.name }}</n-link>
                                        </td>
                                        <td class="product-price-cart">
                                            <span class="amount">${{ parseFloat(product.sale_price || product.price || 0).toFixed(2) }}</span>
                                            <del class="old" v-if="product.sale_price">${{ parseFloat(product.price || 0).toFixed(2) }}</del>
                                        </td>
                                        <td class="product-wishlist-cart">
                                            <button @click="addToCart(product)">add to cart</button>
                                        </td>
                                        <td class="product-remove">
                                            <button @click="removeProductFromWishlist(product)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-12">
                        <div class="empty-cart text-center">
                            <div class="icon">
                                <i class="pe-7s-like"></i>
                            </div>
                            <h4>No items found in wishlist</h4>
                            <n-link to="/shop" class="empty-cart__button">Add Item</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- wishlist section end -->
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
        computed: {
            products() {
                return this.$store.state.wishlist.wishlist
            },
        },

        mounted() {
            this.$store.dispatch('wishlist/fetchWishlist')
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

            async removeProductFromWishlist(product) {
                try {
                    await this.$store.dispatch('wishlist/removeFromWishlist', product.id)
                    this.$notify({ type: 'success', text: 'Removed from wishlist!'})
                } catch (error) {
                    this.$notify({ type: 'error', text: 'Failed to remove from wishlist'})
                }
            },
        },

        head() {
            return {
                title: "Wishlist"
            }
        },
    };
</script>
