<template>
    <div class="slider-area nav-style-1">
        <swiper :options="swiperOption">
            <swiper-slide class="single-slider slider-height-1 bg-purple">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="slider-content slider-animation-1">
                                <h3>{{ $t('smart_products') }}</h3>
                                <h1>{{ $t('winter_offer') }} <br>{{ $t('collection_2026') }}</h1>
                                <div class="slider-btn btn-hover">
                                    <n-link :to="localePath('/shop')">{{ $t('shop_now') }}</n-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="slider-single-img slider-img-animation">
                                <img src="/img/slider/single-slide-1.png" alt="image">
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="single-slider slider-height-1 bg-purple">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="slider-content slider-animation-1">
                                <h3>{{ $t('smart_products') }}</h3>
                                <h1>{{ $t('summer_offer') }} <br>{{ $t('collection_2026') }}</h1>
                                <div class="slider-btn btn-hover">
                                    <n-link :to="localePath('/shop')">{{ $t('shop_now') }}</n-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="slider-single-img slider-img-animation">
                                <img src="/img/slider/single-slide-2.png " alt="image">
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>

            <!-- Swiper Navigation Start -->
            <div class="hero-slider-nav swiper-button-prev">
                <i class="pe-7s-angle-left"></i>
            </div>
            <div class="hero-slider-nav swiper-button-next">
                <i class="pe-7s-angle-right"></i>
            </div>
            <!-- Swiper Navigation End -->
        </swiper>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                swiperOption: {
                    loop: true,
                    speed: 750,
                    slidesPerView: 1,
                    spaceBetween: 10,
                    effect: "fade",
                    fadeEffect: { 
                        crossFade: true 
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },
    };
</script>