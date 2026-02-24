<template>
    <div class="home-cosmetics">
        <HeaderWithTopbar containerClass="container-fluid" />
        <HeroSliderCosmetics />
        <ProductWrapperCosmetics />
        <ServicePolicyFour />
        <TestimonialOne />
        <BannerStyleFour />
        <BrandLogoCarousel />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import('@/components/HeaderWithTopbar'),
            HeroSliderCosmetics: () => import('@/components/hero/HeroSliderCosmetics'),
            ProductWrapperCosmetics: () => import('@/components/product/ProductWrapperCosmetics'),
            ServicePolicyFour: () => import('@/components/policy/ServicePolicyFour'),
            TestimonialOne: () => import('@/components/TestimonialOne'),
            BrandLogoCarousel: () => import('@/components/BrandLogoCarousel'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        head() {
            return {
                title: 'Home Cosmetics'
            }
        }
    };
</script>


