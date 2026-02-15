<template>
    <div>
        <header class="header-area">
            <div class="header-top-area header-padding-2 d-none d-lg-block">
                <div :class="containerClass">
                    <div class="header-top-inner">
                        <div class="language-currency-wrap">
                            <div class="same-language-currency language-style">
                                <select name="language" @change="changeLanguage($event)">
                                    <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="$i18n.locale === locale.code">
                                        {{ locale.code === 'en' ? 'English' : 'العربية' }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-padding-1 sticky-bar header-res-padding clearfix" :class="{'is-sticky': isSticky}">
                <div :class="containerClass">
                    <div class="row">
                        <div class="col-lg-2 col-md-6 col-4">
                            <div class="logo">
                                <n-link to="/">
                                    <img src="/img/logo/logo.png" alt="Sater logo" class="img-fluid" style="max-height: 50px;">
                                </n-link>
                            </div>
                        </div>
                        <div class="col-lg-8 d-none d-lg-block">
                            <div class="main-menu">
                                <nav>
                                    <Navigation />
                                </nav>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-8">
                            <div class="header-right-wrap">
                                <div class="same-style header-search d-none d-lg-block">
                                    <button class="search-active" @click="isOpenSearch = !isOpenSearch"><i class="pe-7s-search"></i></button>
                                    <div class="search-content" :class="{ active:isOpenSearch }">
                                        <form>
                                            <input type="text" :placeholder="$t('search')" />
                                            <button class="button-search"><i class="pe-7s-search"></i></button>
                                        </form>
                                    </div> 
                                </div>
                                <div class="same-style account-setting d-none d-lg-block">
                                    <button class="account-setting-active" @click="isOpenAccountSettings = !isOpenAccountSettings"><i class="pe-7s-user-female"></i></button>
                                    <div class="account-dropdown" :class="{ active:isOpenAccountSettings }">
                                        <ul>
                                            <template v-if="!isAuthenticated">
                                                <li><n-link :to="localePath('/login-register')">{{ $t('login') }}</n-link></li>
                                                <li><n-link :to="localePath('/login-register')">{{ $t('register') }}</n-link></li>
                                            </template>
                                            <template v-else>
                                                <li><a href="javascript:void(0)" @click="logout">{{ $t('logout') }}</a></li>
                                            </template>
                                            <li><n-link :to="localePath('/my-account')">{{ $t('my_account') }}</n-link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="same-style header-compare">
                                    <n-link to="/compare">
                                        <i class="pe-7s-shuffle"></i>
                                    </n-link>
                                    <span class="count-style">{{ compareItemCount }}</span>
                                </div>
                                <div class="same-style header-wishlist">
                                    <n-link to="/wishlist"><i class="pe-7s-like"></i></n-link>
                                    <span class="count-style">{{ wishlistItemCount }}</span>
                                </div>
                                <div class="same-style cart-wrap">
                                    <button class="icon-cart" @click="openCart = !openCart">
                                        <i class="pe-7s-shopbag"></i>
                                        <span class="count-style">{{ cartItemCount }}</span>
                                    </button>
                                    <MiniCart :miniCart="{ visible:openCart }" @minicartClose="openCart = !openCart" />
                                </div>
                                <div class="same-style mobile-menu-toggler d-block d-lg-none">
                                    <button class="mobile-aside-button" @click="navOpen = !navOpen">
                                        <i class="pe-7s-menu"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <OffCanvasMobileMenu :class="{'show-mobile-menu' : navOpen}" @toggleAsideMenu="navOpen = !navOpen" />
    </div>
</template>

<script>
    export default {
        components: {
            Navigation: () => import("@/components/Navigation"),
            MiniCart: () => import("@/components/MiniCart"),
        },

        props: ['containerClass'],

        computed: {
            cartItemCount() {
                return this.$store.getters.cartItemCount
            },
            wishlistItemCount() {
                return this.$store.getters.wishlistItemCount
            },
            compareItemCount() {
                return this.$store.getters.compareItemCount
            },
            isAuthenticated() {
                return this.$store.getters['auth/isAuthenticated']
            },
            availableLocales() {
                return this.$i18n.locales
            }
        },

        data() {
            return {
                isSticky: false,
                isOpenSearch: false,
                isOpenAccountSettings: false,
                openCart: false,
                navOpen: false
            }
        },

        mounted(){
            window.addEventListener('scroll', () => {
                let scroll = window.scrollY
                if(scroll >= 200){
                    this.isSticky = true
                } else {
                    this.isSticky = false
                }
            })
        },

        methods: {
            async logout() {
                try {
                    await this.$store.dispatch('auth/logout')
                    this.$notify({ type: 'success', text: 'Logged out successfully' })
                    this.$router.push('/')
                } catch (error) {
                    console.error('Logout failed', error)
                }
            },
            changeLanguage(event) {
                const locale = event.target.value
                this.$router.push(this.switchLocalePath(locale))
            }
        }
    };
</script>