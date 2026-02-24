<template>
    <div class="product-area pb-90">
        <div class="container">
            <SectionTitleWithSubTitle :title="$t('daily_deals')" classes="section-title" v-if="isSectionTitle ? true : false" />

            <ul class="nav product-tab-list pt-30 pb-55 justify-content-center">
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="pill" data-bs-target="#new-product" role="tab">{{ $t('new_arrivals') }}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" data-bs-toggle="pill" data-bs-target="#best-product" role="tab">{{ $t('best_sellers') }}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="pill" data-bs-target="#sale-product" role="tab">{{ $t('sale_items') }}</button>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade" id="new-product" role="tabpanel">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-sm-6" v-for="(product, index) in newProducts.slice(0, 8)" :key="index">
                            <ProductGridItem :product="product" :layout="layout" />
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade show active" id="best-product" role="tabpanel">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-sm-6" v-for="(product, index) in bestProducts.slice(0, 8)" :key="index">
                            <ProductGridItem :product="product" :layout="layout" />
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="sale-product" role="tabpanel">
                    <div class="row">
                        <div class="col-xl-3 col-lg-4 col-sm-6" v-for="(product, index) in saleProducts.slice(0, 8)" :key="index">
                            <ProductGridItem :product="product" :layout="layout" />
                        </div>
                    </div>
                </div>
                <div class="view-more text-center mt-20 toggle-btn2">
                    <n-link :to="localePath('/shop')" class="loadMore2">{{ $t('view_more_products') }}</n-link>
                </div>
            </div>
        </div>
        <QuickView />
    </div>
</template>

<script>
    export default {
        props: ['isSectionTitle'],

        components: {
            ProductGridItem: () => import('@/components/product/ProductGridItem'),
            QuickView: () => import('@/components/QuickView'),
        },

        computed: {
            newProducts() {
                return this.$store.getters.getNewProducts
            },
            bestProducts() {
                return this.$store.getters.getBestProducts
            },
            saleProducts() {
                return this.$store.getters.getSaleProducts
            },
        },
        data() {
            return {
                layout: "twoColumn"
            }
        },
    };
</script>