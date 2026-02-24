<template>
    <ul class='mobile-menu'>
        <li v-for='(link, i) in menus' :key='i'>
            <n-link :to="localePath(link.url)" v-if="link.url">
                {{ link.title }}
            </n-link>
            <a href="javascript:void(0)" v-else @click="handleAction(link.action)">
                {{ link.title }}
            </a>
            <span class='submenu-toggle' v-if="link.submenu">
                <i class="pe-7s-angle-down"></i>
            </span>
            <ul class="submenu" v-if="link.submenu">
                <li v-for='(link, i) in link.submenu' :key='i' class="title">
                    <n-link :to="link.url"> {{ link.title }} </n-link>
                    <span class='submenu-toggle' v-if="link.submenu">
                        <i class="pe-7s-angle-down"></i>
                    </span> 
                    <ul class="submenu" v-if="link.submenu">
                        <li v-for='(link, i) in link.submenu' :key='i'>
                            <n-link :to="localePath(link.url)"> {{ link.title }} </n-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            categories() {
                return this.$store.getters.categoryList
            },
            isAuthenticated() {
                return this.$store.getters['auth/isAuthenticated']
            },
            menus() {
                return [
                    {
                        url: '/',
                        title: this.$t('home'),
                        submenu: [
                            {
                                url: '',
                                title: 'Home Group 01',
                                submenu: [
                                    {
                                        url: '/',
                                        title: 'Home Fashion One',
                                    },
                                    {
                                        url: '/home-fashion-two',
                                        title: 'Home Fashion Two',
                                    },
                                    {
                                        url: '/home-fashion-three',
                                        title: 'Home Fashion Three',
                                    },
                                    {
                                        url: '/home-book-store',
                                        title: 'Home Book Store',
                                    }
                                ]
                            },
                            {
                                url: '',
                                title: 'Home Group 02',
                                submenu: [
                                    {
                                        url: '/home-fashion-four',
                                        title: 'Home Fashion Four',
                                    },
                                    {
                                        url: '/home-fashion-five',
                                        title: 'Home Fashion Five',
                                    },
                                    {
                                        url: '/home-fashion-six',
                                        title: 'Home Fashion Six',
                                    }
                                ]
                            },
                            {
                                url: '',
                                title: 'Home Group 03',
                                submenu: [
                                    {
                                        url: '/home-fashion-seven',
                                        title: 'Home Fashion Seven',
                                    },
                                    {
                                        url: '/home-cosmetics',
                                        title: 'Home Cosmetics',
                                    },
                                    {
                                        url: '/home-furniture',
                                        title: 'Home Furniture',
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        url: '/shop',
                        title: this.$t('shop'),
                        submenu: [
                            {
                                url: '/shop',
                                title: this.$t('all_categories'),
                                submenu: this.categories.map(category => ({
                                    url: this.localePath(`/shop?category=${category.slug || category}`),
                                    title: category.name || category
                                }))
                            }
                        ]
                    },
                    {
                        url: '',
                        title: this.$t('pages'),
                        submenu: [
                            {
                                url: '/cart',
                                title: this.$t('cart'),
                            },
                            {
                                url: '/checkout',
                                title: this.$t('checkout'),
                            },
                            {
                                url: '/wishlist',
                                title: this.$t('wishlist'),
                            },
                            {
                                url: '/compare',
                                title: this.$t('compare'),
                            },
                            {
                                url: '/about',
                                title: this.$t('about_us'),
                            },
                            {
                                url: '/my-account',
                                title: this.$t('my_account'),
                            },
                                this.isAuthenticated ? 
                                {
                                    url: '',
                                    title: this.$t('logout'),
                                    action: 'logout'
                                } : 
                                {
                                    url: '/login-register',
                                    title: this.$t('login_register_tab'),
                                },
                            {
                                url: '/contact',
                                title: this.$t('contact'),
                            },
                            {
                                url: '/privacy-policy',
                                title: this.$t('privacy_policy'),
                            },
                            {
                                url: '/terms-conditions',
                                title: this.$t('terms_conditions'),
                            },
                        ]
                    },
                    {
                        url: '/blog',
                        title: this.$t('blog'),
                        submenu: [
                            {
                                url: '/blog',
                                title: this.$t('blog_standard'),
                            },
                            {
                                url: '/blog/blog-sidebar',
                                title: this.$t('blog_sidebar'),
                            },
                            {
                                url: '/blog/blog-no-sidebar',
                                title: this.$t('blog_no_sidebar'),
                            },
                            {
                                url: '/blog/blog-details',
                                title: this.$t('blog_details'),
                            }
                        ]
                    },
                    {
                        url: '/contact',
                        title: this.$t('contact'),
                    }
                ]
            }
        },
        mounted() {
            let getSiblings = function (e) {
                let siblings = []; 
                if(!e.parentNode) {
                    return siblings;
                }
                let sibling  = e.parentNode.firstChild;
                while (sibling) {
                    if (sibling.nodeType === 1 && sibling !== e) {
                        siblings.push(sibling);
                    }
                    sibling = sibling.nextSibling;
                }
                return siblings;
            };

            const subMenuToggle = document.querySelectorAll('.submenu-toggle');
            subMenuToggle.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    if(!this.classList.contains('active')) {
                        this.classList.add('active')
                        this.nextElementSibling.classList.add('active')
                        this.closest('li').classList.add('active')
                        getSiblings(this.closest('li')).forEach(function(item) {
                            item.classList.remove('active')
                            item.querySelectorAll('li, .submenu-toggle, .submenu').forEach(function(child) {
                                child.classList.remove('active')
                            })
                        })
                    } else {
                        this.closest('li').classList.remove('active')
                        this.closest('li').querySelectorAll('li, .submenu-toggle, .submenu').forEach(function(child) {
                            child.classList.remove('active')
                        })
                    }
                })
            })
        },

        methods: {
            handleAction(action) {
                if (action === 'logout') {
                    this.logout()
                }
            },
            async logout() {
                try {
                    await this.$store.dispatch('auth/logout')
                    this.$notify({ type: 'success', text: 'Logged out successfully' })
                    this.$router.push('/')
                } catch (error) {
                    console.error('Logout failed', error)
                }
            }
        }
    }
</script>



<style lang='scss' scoped>
    .mobile-menu {
        li:not(:last-child) {
            margin-bottom: 5px;
        }
        li {
            position: relative;
            a {
                font-weight: 600;
                line-height: 35px;
                text-transform: capitalize;
            }
        }
        .submenu {
            display: none;
            padding-top: 5px;
            padding-left: 15px;
            &.active {
                display: block;
            }
            li {
                margin-bottom: 5px;
                
                &.title > {
                    a {
                        font-weight: 500;
                    }
                }
                .submenu {
                    li {
                        a {
                            line-height: 25px;
                            font-weight: 400;
                        }
                    }
                }
            }
        }
        .submenu-toggle {
            width: 35px;
            height: 35px;
            background-color: #f3f3f3;
            text-align: center;
            font-size: 28px;
            display: inline-block;
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;

            i {
                transition: 0.3s;
                line-height: 35px;
            }
            &.active {
                i {
                    transform: rotate(-180deg);
                }
            }
        }
    }
</style>