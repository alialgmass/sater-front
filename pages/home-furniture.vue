<template>
    <div class="home-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <HeroSliderFurniture />
        <BannerStyleFive />
        <ProductWrapperFurniture />
        <DealWithCountdownTwo />
        <ServicePolicyTwo />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import('@/components/HeaderWithTopbar'),
            HeroSliderFurniture: () => import('@/components/hero/HeroSliderFurniture'),
            BannerStyleFive: () => import('@/components/banner/BannerStyleFive'),
            ProductWrapperFurniture: () => import('@/components/product/ProductWrapperFurniture'),
            DealWithCountdownTwo: () => import('@/components/DealWithCountdownTwo'),
            ServicePolicyTwo: () => import('@/components/policy/ServicePolicyTwo'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        head() {
            return {
                title: 'Home Furniture'
            }
        },
    };
</script>


