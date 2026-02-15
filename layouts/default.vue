<template>
    <div>
        <Nuxt />

        <client-only>
            <notifications position="bottom left" classes='vue-notification success' />
        </client-only>

        <button class="scroll-top" @click="scrollToTop" :class="{ 'show': isVisible }">
            <i class="fa fa-angle-double-up"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: "default",
        data() {
            return {
                isVisible: false,
            };
        },
        methods: {
            scrollToTop() {
                window.scroll({
                    top: 0,
                    behavior: "smooth",
                });
            },
        },
        mounted() {
            this.$store.dispatch('auth/initAuth')
            this.$store.dispatch('cart/initCart')
            this.$store.dispatch('products/fetchCategories')
            window.addEventListener("scroll", () => {
                let scroll = window.scrollY;
                if (scroll >= 500) {
                    this.isVisible = true;
                }
                else {
                    this.isVisible = false;
                }
            });
        },
        head() {
            return this.$nuxtI18nHead({ addSeoAttributes: true })
        }
    };
</script>

