<template>
    <div class="shop-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('shop')" />
        
        <!-- product items wrapper -->
        <div class="shop-area pt-100 pb-100">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <!-- shop top bar -->
                        <div class="shop-top-bar">
                            <div class="select-showing-wrap">
                                <div class="shop-select">
                                    <select v-model="selectedPrice">
                                        <option value="default">{{ $t('default_sort') }}</option>
                                        <option value="low2high">{{ $t('price_low_high') }}</option>
                                        <option value="high2low">{{ $t('price_high_low') }}</option>
                                    </select>
                                </div>
                                <p>{{ $t('showing') }} {{perPage * currentPage - perPage + 1}} {{ $t('to') }} {{perPage * currentPage > filterItems.length ? filterItems.length : perPage * currentPage}} {{ $t('of') }} {{filterItems.length}} {{ $t('results') }}</p>
                            </div>
                            <div class="shop-tab">
                                <button @click="layout = 'twoColumn'" :class="{ active : layout === 'twoColumn' }">
                                    <i class="fa fa-th-large"></i>
                                </button>
                                <button @click="layout = 'threeColumn'" :class="{ active : layout === 'threeColumn' }">
                                    <i class="fa fa-th"></i>
                                </button>
                                <button @click="layout = 'list'" :class="{ active : layout === 'list' }">
                                    <i class="fa fa-list-ul"></i>
                                </button>
                            </div>
                        </div>
                        <!-- end shop top bar -->

                        <!-- shop product -->
                        <div class="shop-bottom-area mt-35">
                            <div class="row product-layout" :class="{ 'list': layout === 'list', 'grid three-column': layout === 'threeColumn', 'grid two-column': layout === 'twoColumn' }">
                                <div class="col-xl-4 col-sm-6" v-for="(product, index) in getItems" :key="index" >
                                    <ProductGridItem :product="product" :layout="layout"  />
                                </div>
                            </div>
                        </div>
                        <!-- end shop product -->

                        <div v-if="getPaginateCount > 1">
                            <pagination class="pro-pagination-style shop-pagination mt-30" v-model="currentPage" :per-page="perPage" :records="filterItems.length" @paginate="paginateClickCallback" :page-count="getPaginateCount" />
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <ShopSidebar classes="mr-30" />
                    </div>
                </div>
            </div>
        </div>
        <!-- end product items wrapper -->

        <QuickView />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import('@/components/HeaderWithTopbar'),
            Breadcrumb: () => import('@/components/Breadcrumb'),
            ProductGridItem: () => import('@/components/product/ProductGridItem'),
            QuickView: () => import('@/components/QuickView'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                layout: "threeColumn",
                filterItems: [],
                prevSelectedCategoryName: '',
                prevSelectedTagName: '',
                prevSelectedSizeName: '',
                prevSelectedColorName: '',
                currentPage: 1,
                perPage: 9,
                selectedPrice: 'default'
            }
        },

        computed: {
            products() {
                return this.$store.state.products.products
            },

            getItems() {
                return this.products;
            },
            getPaginateCount() {
                return this.$store.state.products.pagination ? this.$store.state.products.pagination.last_page : 1;
            },
        },

        mounted(){
            this.fetchProducts()
        },

        methods: {
            async fetchProducts() {
                const params = {
                    page: this.currentPage,
                    per_page: this.perPage,
                    category: this.$route.query.category,
                    q: this.$route.query.q,
                    sort: this.selectedPrice === 'low2high' ? 'price_asc' : (this.selectedPrice === 'high2low' ? 'price_desc' : null)
                }
                await this.$store.dispatch('products/fetchProducts', params)
            },

            paginateClickCallback(page) {
                this.currentPage = Number(page);
                this.fetchProducts()
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
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

        watch: {
            $route(){
                this.updateProductData()
            },

            selectedPrice(){
                switch (this.selectedPrice) {
                    case "low2high":
                        this.filterItems =  this.filterItems.sort((a, b)=> this.discountedPrice(a) - this.discountedPrice(b))
                        break;
                    case "high2low":
                        this.filterItems =  this.filterItems.sort((a, b)=> this.discountedPrice(b) -  this.discountedPrice(a))
                        break;
                    default:
                        this.filterItems = [...this.products]
                }
            }
        },

        head() {
            return {
                title: this.$t('shop')
            }
        },
    };
</script>
