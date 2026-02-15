<template>
    <ul>
        <li>
            <n-link :to="localePath('/')">{{ $t('home') }} <i class="fa fa-angle-down"></i></n-link>
            <ul class="mega-menu mega-menu-padding">
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link to="">Home Group 01</n-link>
                        </li>
                        <li>
                            <n-link to="/">Home Fashion One</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-two">Home Fashion Two</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-three">Home Fashion Three</n-link>
                        </li>
                        <li>
                            <n-link to="/home-book-store">Home Book Store</n-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link to="">Home Group 02</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-four">Home Fashion Four</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-five">Home Fashion Five</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-six">Home Fashion Six</n-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link to="">Home Group 03</n-link>
                        </li>
                        <li>
                            <n-link to="/home-fashion-seven">Home Fashion Seven</n-link>
                        </li>
                        <li>
                            <n-link to="/home-cosmetics">Home Cosmetics</n-link>
                        </li>
                        <li>
                            <n-link to="/home-furniture">Home Furniture</n-link>
                        </li>
                    </ul>
                </li>
            </ul>
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
            <n-link to="">{{ $t('pages') }} <i class="fa fa-angle-down"></i></n-link>
            <ul class="submenu">
                <li><n-link :to="localePath('/cart')">{{ $t('cart') }}</n-link></li>
                <li><n-link :to="localePath('/checkout')">{{ $t('checkout') }}</n-link></li>
                <li><n-link :to="localePath('/wishlist')">{{ $t('wishlist') }}</n-link></li>
                <li><n-link :to="localePath('/compare')">{{ $t('compare') }}</n-link></li>
                <li><n-link :to="localePath('/about')">{{ $t('about_us') }}</n-link></li>
                <li><n-link :to="localePath('/my-account')">{{ $t('my_account') }}</n-link></li>
                <li><n-link :to="localePath('/login-register')">{{ $t('login') }} / {{ $t('register') }}</n-link></li>
                <li><n-link :to="localePath('/contact')">{{ $t('contact') }}</n-link></li>
                <li><n-link :to="localePath('/privacy-policy')">Privacy Policy</n-link></li>
                <li><n-link :to="localePath('/terms-conditions')">Terms Conditions</n-link></li>
            </ul>
        </li>
        <li>
            <n-link :to="localePath('/blog')">{{ $t('blog') }} <i class="fa fa-angle-down"></i></n-link>
            <ul class="submenu">
                <li>
                    <n-link to="/blog">blog standard</n-link>
                </li>
                <li>
                    <n-link to="/blog/blog-right-sidebar">blog right sidebar</n-link>
                </li>
                <li>
                    <n-link to="/blog/blog-without-sidebar">blog No sidebar</n-link>
                </li>
                <li>
                    <n-link to="/blog/a-guide-to-latest-trends-product">blog details</n-link>
                </li>
            </ul>
        </li>
        <li>
            <n-link :to="localePath('/contact')">{{ $t('contact') }} </n-link>
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