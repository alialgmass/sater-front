<template>
    <ul>
        <li>
            <n-link :to="localePath('/')">{{ $t('home') }}</n-link>
        </li>
        <li>
            <n-link :to="localePath('/shop')"> {{ $t('shop') }} <i class="fa fa-angle-down"></i></n-link>
            <ul class="mega-menu">
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link :to="localePath('/shop')">{{ $t('all_categories') }}</n-link>
                        </li>
                        <li v-for="(category, index) in categories" :key="index">
                            <n-link :to="localePath(`/shop?category=${category.slug || category}`)">{{ category.name || category }}</n-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <n-link :to="localePath('/about')">{{ $t('about_us') }}</n-link>
        </li>
        <li>
            <n-link :to="localePath('/contact')">{{ $t('contact') }}</n-link>
        </li>
    </ul>
</template>

<script>
    export default {
        computed: {
            categories() {
                return this.$store.getters.categoryList
            }
        }
    }
</script>