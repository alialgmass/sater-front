<template>
    <div class="home-page-wrapper">
        <TheHeader />
        <HeroSlider />
        <ServicePolicy />
        <ProductWrapper :isSectionTitle=true />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            HeroSlider: () => import('@/components/hero/HeroSlider'),
            ServicePolicy: () => import('@/components/policy/ServicePolicy'),
            ProductWrapper: () => import('@/components/product/ProductWrapper'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        mounted() {
            this.$store.dispatch('products/fetchProducts')
            this.$store.dispatch('products/fetchAttributes')
            this.$store.dispatch('products/fetchCategories')
        },
        head() {
            return {
                title: 'Home Fashion One'
            }
        },
    };
</script>


