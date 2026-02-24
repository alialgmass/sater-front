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
                                <p>{{ $t('showing') }} {{perPage * currentPage - perPage + 1}} {{ $t('to') }} {{perPage * currentPage > getTotal ? getTotal : perPage * currentPage}} {{ $t('of') }} {{getTotal}} {{ $t('results') }}</p>
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
                                <div class="col-xl-4 col-sm-6" v-for="(product, index) in products" :key="index" >
                                    <ProductGridItem :product="product" :layout="layout"  />
                                </div>
                            </div>
                        </div>
                        <!-- end shop product -->

                        <div v-if="getPaginateCount > 1">
                            <pagination class="pro-pagination-style shop-pagination mt-30" v-model="currentPage" :per-page="perPage" :records="getTotal" @paginate="paginateClickCallback" :page-count="getPaginateCount" />
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
            getPaginateCount() {
                return this.$store.state.products.pagination ? this.$store.state.products.pagination.last_page : 1;
            },
            getTotal() {
                return this.$store.state.products.pagination ? this.$store.state.products.pagination.total : 0;
            }
        },

        mounted(){
            this.fetchProducts()
            this.$store.dispatch('products/fetchAttributes')
            this.$store.dispatch('products/fetchCategories')
        },

        methods: {
            async fetchProducts() {
                const query = this.$route.query;
                const params = {
                    page: query.page || 1,
                    per_page: this.perPage,
                    category_id: query.category_id,
                    color_id: query.color_id,
                    size_id: query.size_id,
                    tag_id: query.tag_id,
                    min_price: query.min_price,
                    max_price: query.max_price,
                    on_sale: query.on_sale,
                    q: query.q,
                    sort: this.selectedPrice === 'low2high' ? 'price_asc' : (this.selectedPrice === 'high2low' ? 'price_desc' : null)
                }
                
                // Cleanup undefined params
                Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

                await this.$store.dispatch('products/fetchProducts', params)
                this.currentPage = Number(query.page || 1)
            },

            paginateClickCallback(page) {
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        page: page
                    }
                })
            }
        },

        watch: {
            '$route.query': {
                deep: true,
                handler() {
                    this.fetchProducts()
                }
            },

            selectedPrice(){
                this.fetchProducts()
            }
        },

        head() {
            return {
                title: this.$t('shop')
            }
        },
    };
</script>
