<template>
    <div class="compare-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('compare')" />
        
        <!-- Compare section start -->
        <div class="compare-page-wrapper pt-100 pb-100">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Compare Page Content Start -->
                        <div class="compare-page-content-wrap" v-if="products.length > 0">
                            <div class="compare-table table-responsive">
                                <table class="table table-bordered mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="first-column">{{ $t('product_label') }}</td>
                                            <td class="product-image-title" v-for="(product, index) in products" :key="index">
                                                <n-link :to="localePath(`/product/${slugify(product.title)}`)" class="image">
                                                    <img class="img-fluid" :src="product.images[0]" :alt="product.title">
                                                </n-link>
                                                <h4 class="title">
                                                    <n-link :to="localePath(`/product/${slugify(product.title)}`)">{{ product.title }}</n-link>
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">{{ $t('description_label') }}</td>
                                            <td class="pro-desc" v-for="(product, index) in products" :key="index">
                                                <p>{{ product.description }}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">{{ $t('price_label') }}</td>
                                            <td class="pro-price" v-for="(product, index) in products" :key="index">
                                                <span>${{ parseFloat(discountedPrice(product) || 0).toFixed(2) }}</span>
                                                <del class="old" v-if="product.discount > 0">${{ parseFloat(product.price || 0).toFixed(2) }}</del>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">{{ $t('add_to_cart') }}</td>
                                            <td v-for="(product, index) in products" :key="index">
                                                <button @click="addToCart(product)" class="btn">{{ $t('add_to_cart') }}</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">{{ $t('rating_label') }}</td>
                                            <td class="pro-ratting" v-for="(product, index) in products" :key="index">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-o"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="first-column">{{ $t('remove_label') }}</td>
                                            <td class="pro-remove" v-for="(product, index) in products" :key="index">
                                                <button @click="removeFromCompare(product)"><i class="fa fa-trash-o"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Compare Page Content End -->

                        <div class="empty-cart text-center" v-else>
                            <div class="icon">
                                <i class="pe-7s-shuffle"></i>
                            </div>
                            <h4>{{ $t('empty_compare_message') }}</h4>
                            <n-link :to="localePath('/shop')" class="empty-cart__button">{{ $t('add_item') }}</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Compare section end -->
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
                return this.$store.getters.getCompare
            },
        },

        methods: {
            addToCart(product) {
                const prod = {...product, cartQuantity: 1}
                // for notification
                if (this.$store.state.cart.find(el => product.id === el.id)) {
                    this.$notify({ title: this.$t('already_in_cart') })
                } else {
                    this.$notify({ title: this.$t('add_to_cart_success') })
                }
                this.$store.dispatch('addToCartItem', prod)
            },

            removeFromCompare(product) {
                // for notification
                this.$notify({ title: this.$t('item_removed_compare') })
                this.$store.dispatch('removeFromCompare', product)
            },

            discountedPrice(product) {
                return product.price - (product.price *(product.discount)/100)
            },

            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            }
        },

        head() {
            return {
                title: this.$t('compare')
            }
        },
    };
</script>
