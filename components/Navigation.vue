<template>
    <ul>
        <li>
            <n-link to="/">Home <i class="fa fa-angle-down"></i></n-link>
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
            <n-link to="/shop"> Shop <i class="fa fa-angle-down"></i></n-link>
            <ul class="mega-menu">
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link to="/shop">Categories</n-link>
                        </li>
                        <li v-for="(category, index) in categories" :key="index">
                            <n-link :to="`/shop?category=${category}`">{{ category }}</n-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li class="mega-menu-title">
                            <n-link to="">product details</n-link>
                        </li>
                        <li>
                            <n-link to="/product/crew-ventile-coat-one">product variation</n-link>
                        </li>
                        <li>
                            <n-link to="/product/product-affiliate">product affiliate</n-link>
                        </li>
                        <li>
                            <n-link to="/product/women-winter-overcoat-one">product simple</n-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li class="mega-menu-img">
                            <n-link to="/shop">
                                <img src="/img/banner/banner-12.png" alt="flone">
                            </n-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <n-link to="">Pages <i class="fa fa-angle-down"></i></n-link>
            <ul class="submenu">
                <li><n-link to="/cart">Cart</n-link></li>
                <li><n-link to="/checkout">Checkout</n-link></li>
                <li><n-link to="/wishlist">Wishlist</n-link></li>
                <li><n-link to="/compare">Compare</n-link></li>
                <li><n-link to="/about">about us</n-link></li>
                <li><n-link to="/my-account">My Account</n-link></li>
                <li><n-link to="/login-register">Login / Register</n-link></li>
                <li><n-link to="/contact">Contact us</n-link></li>
                <li><n-link to="/privacy-policy">Privacy Policy</n-link></li>
                <li><n-link to="/terms-conditions">Terms Conditions</n-link></li>
            </ul>
        </li>
        <li>
            <n-link to="/blog">Blog <i class="fa fa-angle-down"></i></n-link>
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
            <n-link to="/contact">Contact </n-link>
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