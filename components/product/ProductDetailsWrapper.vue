<template>
    <div class="shop-area pt-100 pb-100">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="product-details-slider">
                        <div class="product-details-img">
                            <div class="product-badges">
                                <span class="product-label pink" v-if="product.new || product.is_new">{{ $t('new') }}</span>
                                <span class="product-label purple" v-if="product.discount">-{{ product.discount }}%</span>
                            </div>
                            <swiper :options="swiperOptionTop" ref="swiperTop">
                                <div class="large-img swiper-slide" v-for="(image, index) in product.images" :key="index">
                                    <img class="img-fluid" :src="typeof image === 'string' ? image : image.url" :alt="product.name || product.title">
                                </div>
                                <div class="quickview-nav swiper-button-prev">
                                    <i class="pe-7s-angle-left"></i>
                                </div>
                                <div class="quickview-nav swiper-button-next">
                                    <i class="pe-7s-angle-right"></i>
                                </div>
                            </swiper>
                            <swiper class="mt-2" :options="swiperOptionThumbs" ref="swiperThumbs">
                                <div class="thumb-img swiper-slide" v-for="(image, index) in product.images" :key="index">
                                    <img class="img-fluid" :src="typeof image === 'string' ? image : image.url" :alt="product.name || product.title">
                                </div>
                            </swiper>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-content ml-70">
                        <h2>{{ product.name || product.title }}</h2>
                        <div class="product-details-price">
                            <span>${{ parseFloat(getDiscountedPrice).toFixed(2) }}</span>
                            <span class="old" v-if="hasDiscount">${{ parseFloat(product.price || 0).toFixed(2) }}</span>
                        </div>
                        <div class="pro-details-rating-wrap">
                            <div class="pro-details-rating" v-if="product.rating == 5">
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                            </div>
                            <div class="pro-details-rating" v-if="product.rating == 4">
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <div class="pro-details-rating" v-if="product.rating == 3">
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <div class="pro-details-rating" v-if="product.rating == 2">
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <div class="pro-details-rating" v-if="product.rating == 1">
                                <i class="fa fa-star-o yellow"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <span><a href="#">{{ product.rating }} {{ $t('reviews') }}</a></span>
                        </div>
                        <p>{{ product.description }}</p>
                        <div class="pro-details-size-color" v-if="product.variation">
                            <div class="pro-details-color-wrap">
                                <h6 class="label">{{ $t('color_label') }}</h6>
                                <div class="pro-details-color-content">
                                    <label :class="item" class="radio" v-for="(item, index) in product.variation.color" :key="index" >
                                        <input type="radio" name="colorGroup"/>
                                        <span class="check-mark"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="pro-details-size-wrap">
                                <h6 class="label">{{ $t('size_label') }}</h6>
                                <div class="pro-details-size-content">
                                    <label class="radio" v-for="(item, index) in product.variation.sizes" :key="index">
                                        <input type="radio" name="sizeGroup" />
                                        <span class="check-mark">{{ item }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="pro-details-quality">
                            <div class="cart-plus-minus">
                                <button @click="decreaseQuantity()" class="dec qtybutton">-</button>
                                <input class="cart-plus-minus-box" type="text" :value="singleQuantity" readonly>
                                <button @click="increaseQuantity()" class="inc qtybutton">+</button>
                            </div>
                            <div class="pro-details-cart btn-hover">
                                <button @click="addToCart(product)">{{ $t('add_to_cart') }}</button>
                            </div>
                            <div class="pro-details-wishlist">
                                <button @click="addToWishlist(product)" title="wishlist"><i class="fa fa-heart-o"></i></button>
                            </div>
                            <div class="pro-details-compare">
                                <button @click="addToCompare(product)" title="compare"><i class="pe-7s-shuffle"></i></button>
                            </div>
                        </div>
                        <div class="pro-details-meta">
                            <span class="label">{{ $t('categories_label') }}</span>
                            <ul v-if="product.category">
                                <li>
                                    <n-link :to="localePath(`/shop?category=${product.category.slug || product.category.id}`)">{{ product.category.name || product.category.title || 'Category' }}</n-link>
                                </li>
                            </ul>
                            <ul v-else-if="product.categories">
                                <li v-for="(category, index) in product.categories" :key="index">
                                    <n-link :to="localePath(`/shop?category=${category.slug || category.id || category}`)">{{ category.name || category.title || category }}</n-link>
                                </li>
                            </ul>
                        </div>
                        <div class="pro-details-meta">
                            <span class="label">{{ $t('tag_label') }}</span>
                            <ul>
                                <li v-for="(tag, index) in product.tag" :key="index">
                                    <n-link :to="localePath(`/shop?tag=${slugify(tag)}`)">{{ tag }},</n-link>
                                </li>
                            </ul>
                        </div>
                        <div class="pro-details-social">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank">
                                        <i class="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://dribbble.com/" target="_blank">
                                        <i class="fa fa-dribbble"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.pinterest.com/" target="_blank">
                                        <i class="fa fa-pinterest-p"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/" target="_blank">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank">
                                        <i class="fa fa-linkedin"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['product'],

        computed: {
            getDiscountedPrice() {
                return this.product.discounted_price || this.product.sale_price || this.product.price || 0
            },
            hasDiscount() {
                return !!(this.product.discounted_price || this.product.sale_price || (this.product.discount && this.product.discount > 0))
            }
        },

        data() {
            return {
                singleQuantity: 1,

                swiperOptionTop: {
                    loop: true,
                    slidesPerView : 1,
                    spaceBetween: 10,
                    effect: 'fade',
                    loopedSlides: 5, // looped slides should be the same
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },

                swiperOptionThumbs: {
                    loop: true,
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 5,
                    freeMode: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    slideToClickedSlide: true,
                    loopedSlides: 5, // looped slides should be the same
                },
            }
        },

        mounted() {
            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.$swiper
                const swiperThumbs = this.$refs.swiperThumbs.$swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
            })
        },

        methods: {
            addToCart(product) {
                const prod = {...product, cartQuantity: this.singleQuantity}
                // for notification
                if (this.$store.state.cart.find(el => product.id === el.id)) {
                    this.$notify({ title: this.$t('already_in_cart') })
                } else {
                    this.$notify({ title: this.$t('add_to_cart_success') })
                }
                this.$store.dispatch('addToCartItem', prod)
            },

            discountedPrice(product) {
                return product.discounted_price || product.sale_price || (product.price - (product.price * (product.discount || 0) / 100))
            },

            increaseQuantity(){
                if(this.product.quantity > this.singleQuantity) this.singleQuantity++
            },

            decreaseQuantity() {
                if(this.singleQuantity > 1) this.singleQuantity--
            },

            addToWishlist(product) {
                // for notification
                if (this.$store.state.wishlist.find(el => product.id === el.id)) {
                    this.$notify({ title: this.$t('already_in_wishlist') })
                } else {
                    this.$notify({ title: this.$t('add_to_wishlist_success') })
                }
                this.$store.dispatch('addToWishlist', product)
            },

            addToCompare(product) {
                // for notification
                if (this.$store.state.compare.find(el => product.id === el.id)) {
                    this.$notify({ title: this.$t('already_in_compare') })
                } else {
                    this.$notify({ title: this.$t('add_to_compare_success') })
                }
                this.$store.dispatch('addToCompare', product)
            },

            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
                    
            }
        },
    };
</script>