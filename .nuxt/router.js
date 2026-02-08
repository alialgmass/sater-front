import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _35b5ab6c = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _d4849e26 = () => interopDefault(import('..\\pages\\blog\\index.vue' /* webpackChunkName: "pages/blog/index" */))
const _44195273 = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _3ab5cc19 = () => interopDefault(import('..\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _17fcc262 = () => interopDefault(import('..\\pages\\compare.vue' /* webpackChunkName: "pages/compare" */))
const _3300941d = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _01168fb0 = () => interopDefault(import('..\\pages\\home-book-store.vue' /* webpackChunkName: "pages/home-book-store" */))
const _6fc542ae = () => interopDefault(import('..\\pages\\home-cosmetics.vue' /* webpackChunkName: "pages/home-cosmetics" */))
const _42e7f312 = () => interopDefault(import('..\\pages\\home-fashion-five.vue' /* webpackChunkName: "pages/home-fashion-five" */))
const _7f4faf86 = () => interopDefault(import('..\\pages\\home-fashion-four.vue' /* webpackChunkName: "pages/home-fashion-four" */))
const _05708a5d = () => interopDefault(import('..\\pages\\home-fashion-seven.vue' /* webpackChunkName: "pages/home-fashion-seven" */))
const _9c447a9c = () => interopDefault(import('..\\pages\\home-fashion-six.vue' /* webpackChunkName: "pages/home-fashion-six" */))
const _057e8124 = () => interopDefault(import('..\\pages\\home-fashion-three.vue' /* webpackChunkName: "pages/home-fashion-three" */))
const _03adf9c8 = () => interopDefault(import('..\\pages\\home-fashion-two.vue' /* webpackChunkName: "pages/home-fashion-two" */))
const _05e4fc17 = () => interopDefault(import('..\\pages\\home-furniture.vue' /* webpackChunkName: "pages/home-furniture" */))
const _6d5f669a = () => interopDefault(import('..\\pages\\login-register.vue' /* webpackChunkName: "pages/login-register" */))
const _5b794fc2 = () => interopDefault(import('..\\pages\\my-account.vue' /* webpackChunkName: "pages/my-account" */))
const _303cf92a = () => interopDefault(import('..\\pages\\privacy-policy.vue' /* webpackChunkName: "pages/privacy-policy" */))
const _2f20d749 = () => interopDefault(import('..\\pages\\shop.vue' /* webpackChunkName: "pages/shop" */))
const _7f56aa6b = () => interopDefault(import('..\\pages\\shop-grid-full-width.vue' /* webpackChunkName: "pages/shop-grid-full-width" */))
const _3badf4b3 = () => interopDefault(import('..\\pages\\shop-grid-no-sidebar.vue' /* webpackChunkName: "pages/shop-grid-no-sidebar" */))
const _14df0318 = () => interopDefault(import('..\\pages\\shop-grid-right-sidebar.vue' /* webpackChunkName: "pages/shop-grid-right-sidebar" */))
const _8415a84c = () => interopDefault(import('..\\pages\\shop-grid-two-column.vue' /* webpackChunkName: "pages/shop-grid-two-column" */))
const _4b6babda = () => interopDefault(import('..\\pages\\shop-list-full-width.vue' /* webpackChunkName: "pages/shop-list-full-width" */))
const _67666a08 = () => interopDefault(import('..\\pages\\shop-list-standard.vue' /* webpackChunkName: "pages/shop-list-standard" */))
const _29af8691 = () => interopDefault(import('..\\pages\\terms-conditions.vue' /* webpackChunkName: "pages/terms-conditions" */))
const _5c3045d0 = () => interopDefault(import('..\\pages\\wishlist.vue' /* webpackChunkName: "pages/wishlist" */))
const _3562a2b5 = () => interopDefault(import('..\\pages\\blog\\blog-right-sidebar.vue' /* webpackChunkName: "pages/blog/blog-right-sidebar" */))
const _75d46a3e = () => interopDefault(import('..\\pages\\blog\\blog-without-sidebar.vue' /* webpackChunkName: "pages/blog/blog-without-sidebar" */))
const _5e4e1a33 = () => interopDefault(import('..\\pages\\product\\product-affiliate.vue' /* webpackChunkName: "pages/product/product-affiliate" */))
const _04dd050f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _d7f1e0b6 = () => interopDefault(import('..\\pages\\blog\\_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _36a3c44e = () => interopDefault(import('..\\pages\\product\\_slug.vue' /* webpackChunkName: "pages/product/_slug" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _35b5ab6c,
    name: "about"
  }, {
    path: "/blog",
    component: _d4849e26,
    name: "blog"
  }, {
    path: "/cart",
    component: _44195273,
    name: "cart"
  }, {
    path: "/checkout",
    component: _3ab5cc19,
    name: "checkout"
  }, {
    path: "/compare",
    component: _17fcc262,
    name: "compare"
  }, {
    path: "/contact",
    component: _3300941d,
    name: "contact"
  }, {
    path: "/home-book-store",
    component: _01168fb0,
    name: "home-book-store"
  }, {
    path: "/home-cosmetics",
    component: _6fc542ae,
    name: "home-cosmetics"
  }, {
    path: "/home-fashion-five",
    component: _42e7f312,
    name: "home-fashion-five"
  }, {
    path: "/home-fashion-four",
    component: _7f4faf86,
    name: "home-fashion-four"
  }, {
    path: "/home-fashion-seven",
    component: _05708a5d,
    name: "home-fashion-seven"
  }, {
    path: "/home-fashion-six",
    component: _9c447a9c,
    name: "home-fashion-six"
  }, {
    path: "/home-fashion-three",
    component: _057e8124,
    name: "home-fashion-three"
  }, {
    path: "/home-fashion-two",
    component: _03adf9c8,
    name: "home-fashion-two"
  }, {
    path: "/home-furniture",
    component: _05e4fc17,
    name: "home-furniture"
  }, {
    path: "/login-register",
    component: _6d5f669a,
    name: "login-register"
  }, {
    path: "/my-account",
    component: _5b794fc2,
    name: "my-account"
  }, {
    path: "/privacy-policy",
    component: _303cf92a,
    name: "privacy-policy"
  }, {
    path: "/shop",
    component: _2f20d749,
    name: "shop"
  }, {
    path: "/shop-grid-full-width",
    component: _7f56aa6b,
    name: "shop-grid-full-width"
  }, {
    path: "/shop-grid-no-sidebar",
    component: _3badf4b3,
    name: "shop-grid-no-sidebar"
  }, {
    path: "/shop-grid-right-sidebar",
    component: _14df0318,
    name: "shop-grid-right-sidebar"
  }, {
    path: "/shop-grid-two-column",
    component: _8415a84c,
    name: "shop-grid-two-column"
  }, {
    path: "/shop-list-full-width",
    component: _4b6babda,
    name: "shop-list-full-width"
  }, {
    path: "/shop-list-standard",
    component: _67666a08,
    name: "shop-list-standard"
  }, {
    path: "/terms-conditions",
    component: _29af8691,
    name: "terms-conditions"
  }, {
    path: "/wishlist",
    component: _5c3045d0,
    name: "wishlist"
  }, {
    path: "/blog/blog-right-sidebar",
    component: _3562a2b5,
    name: "blog-blog-right-sidebar"
  }, {
    path: "/blog/blog-without-sidebar",
    component: _75d46a3e,
    name: "blog-blog-without-sidebar"
  }, {
    path: "/product/product-affiliate",
    component: _5e4e1a33,
    name: "product-product-affiliate"
  }, {
    path: "/",
    component: _04dd050f,
    name: "index"
  }, {
    path: "/blog/:slug",
    component: _d7f1e0b6,
    name: "blog-slug"
  }, {
    path: "/product/:slug?",
    component: _36a3c44e,
    name: "product-slug"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
