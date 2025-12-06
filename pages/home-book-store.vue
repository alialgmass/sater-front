<template>
    <div class="home-book-store">
        <HeaderWithTopBarTwo />
        <HeroSliderBookStoreWrapper />
        <ServicePolicyFive />
        <ProductWrapperBooks />
        <BannerStyleSix />
        <ProductNewWrapper />
        <BrandLogoCarousel />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopBarTwo: () => import('@/components/HeaderWithTopBarTwo'),
            HeroSliderBookStoreWrapper: () => import('@/components/hero/HeroSliderBookStoreWrapper'),
            ServicePolicyFive: () => import('@/components/policy/ServicePolicyFive'),
            ProductWrapperBooks: () => import('@/components/product/ProductWrapperBooks'),
            BannerStyleSix: () => import('@/components/banner/BannerStyleSix'),
            ProductNewWrapper: () => import('@/components/product/ProductNewWrapper'),
            BrandLogoCarousel: () => import('@/components/BrandLogoCarousel'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        head() {
            return {
                title: 'Home Book Store'
            }
        },
    };
</script>