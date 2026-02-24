<template>
    <div class="home-three-wrapper">
        <HeaderWithTopbar containerClass="container-fluid" />
        <HeroSliderThree />
        <ServicePolicyTwo />
        <ProductWrapperThree />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import('@/components/HeaderWithTopbar'),
            HeroSliderThree: () => import('@/components/hero/HeroSliderThree'),
            ServicePolicyTwo: () => import('@/components/policy/ServicePolicyTwo'),
            ProductWrapperThree: () => import('@/components/product/ProductWrapperThree'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        head() {
            return {
                title: 'home-fashion-three'
            }
        },
    };
</script>


