<template>
    <div class="product-details-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="product ? (product.name || product.title) : 'Loading...'" />
        <ProductDetailsWrapper :product="product" v-if="product" />
        <div v-else class="text-center pt-100 pb-100">
            <p>Loading product details...</p>
        </div>
        <ProductDetailsDescriptionReview v-if="product" />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.slug
            }
        },

        async asyncData({ store, params, error }) {
            try {
                const id = params.slug;
                await store.dispatch('products/fetchProduct', id);
                return { id };
            } catch (e) {
                error({ statusCode: 404, message: 'Product not found' });
            }
        },

        computed: {
            product() {
                return this.$store.state.products.product;
            },
        },

        head() {
            return {
                title: this.product ? (this.product.name || 'Product Details') : 'Product Details'
            }
        },

        methods: {
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
    };
</script>
