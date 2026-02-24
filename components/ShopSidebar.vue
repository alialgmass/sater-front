<template>
    <div class="sidebar-style" :class="classes">
        <!-- Search Widget -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-search"></i>
                {{ $t('search') }}
            </h4>
            <div class="pro-sidebar-search">
                <form class="pro-sidebar-search-form" @submit.prevent="handleSearch">
                    <input 
                        type="text" 
                        :placeholder="$t('search_here')" 
                        v-model="searchQuery"
                        class="search-input"
                    >
                    <button type="submit" class="search-btn">
                        <i class="pe-7s-search"></i>
                    </button>
                </form>
            </div>
        </div>

        <!-- Category Widget -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-albums"></i>
                {{ $t('categories') }}
            </h4>
            <ul class="sidebar-widget-list">
                <li class="sidebar-widget-list-item" v-for="(category, index) in visibleCategories" :key="index">
                    <div class="category-item-wrap">
                        <div class="category-item-header">
                            <button 
                                @click="toggleFilter('category_id', category.id)" 
                                :class="['category-btn', { active: isFilterActive('category_id', category.id) }]"
                            >
                                <span class="check-mark"></span>
                                <span class="category-name">{{ category.name }}</span>
                            </button>
                            <button 
                                v-if="category.children && category.children.length > 0" 
                                class="expand-icon" 
                                @click.stop="toggleCategoryChildren(category.id)"
                            >
                                <i :class="isCategoryExpanded(category.id) ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                            </button>
                        </div>
                        <transition name="slide-fade">
                            <ul 
                                v-if="category.children && category.children.length > 0 && isCategoryExpanded(category.id)" 
                                class="sidebar-widget-list-child"
                            >
                                <li v-for="(child, childIndex) in category.children" :key="childIndex">
                                    <button 
                                        @click="toggleFilter('category_id', child.id)" 
                                        :class="['category-btn child-btn', { active: isFilterActive('category_id', child.id) }]"
                                    >
                                        <span class="check-mark"></span>
                                        <span class="category-name">{{ child.name }}</span>
                                    </button>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </li>
            </ul>
            <div class="show-more-btn" v-if="categoriesTree.length > categoryLimit">
                <button @click="toggleCategoryList" class="btn-show-more">
                    {{ isCategoryListExpanded ? $t('show_less') : $t('show_more') }}
                    <i :class="isCategoryListExpanded ? 'fa fa-angle-up' : 'fa fa-angle-down'"></i>
                </button>
            </div>
        </div>

        <!-- Price Filter Widget -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-cash"></i>
                {{ $t('price_filter') }}
            </h4>
            <div class="price-filter">
                <div class="price-input-wrap">
                    <div class="price-input">
                        <input 
                            type="number" 
                            :placeholder="$t('min')" 
                            v-model.number="minPrice" 
                            @change="updatePriceFilter"
                            class="price-field"
                        >
                        <span class="separator">—</span>
                        <input 
                            type="number" 
                            :placeholder="$t('max')" 
                            v-model.number="maxPrice" 
                            @change="updatePriceFilter"
                            class="price-field"
                        >
                    </div>
                </div>
                <div class="on-sale-filter">
                    <button 
                        @click="toggleOnSale" 
                        :class="['sale-btn', { active: isOnSale }]"
                    >
                        <span class="check-mark sale-mark"></span>
                        <span>{{ $t('on_sale') }}</span>
                        <span class="sale-badge" v-if="isOnSale">✓</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Color Widget -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-drop"></i>
                {{ $t('color') }}
            </h4>
            <ul class="sidebar-widget-list color-list">
                <li class="sidebar-widget-list-left" v-for="(color, index) in colorList" :key="index">
                    <button 
                        @click="toggleFilter('color_id', color.id)" 
                        :class="['color-btn', { active: isFilterActive('color_id', color.id) }]"
                    >
                        <span class="color-swatch" :style="{ backgroundColor: color.hex_code }">
                            <i v-if="isFilterActive('color_id', color.id)" class="fa fa-check"></i>
                        </span>
                        <span class="color-name">{{ color.name }}</span>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Size Widget -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-menu"></i>
                {{ $t('sizes') }}
            </h4>
            <ul class="sidebar-widget-list size-list">
                <li class="sidebar-widget-list-left" v-for="(size, index) in sizeList" :key="index">
                    <button 
                        @click="toggleFilter('size_id', size.id)" 
                        :class="['size-btn', { active: isFilterActive('size_id', size.id) }]"
                    >
                        {{ size.name }}
                    </button>
                </li>
            </ul>
        </div>

        <!-- Tag Widget -->
        <div class="sidebar-widget sidebar-widget__tag">
            <h4 class="pro-sidebar-title">
                <i class="pe-7s-ticket"></i>
                {{ $t('tags') }}
            </h4>
            <div class="sidebar-widget-tag">
                <ul class="tag-list">
                    <li v-for="(tag, index) in tagList" :key="index">
                        <button 
                            @click="toggleFilter('tag_id', tag.id)" 
                            :class="['tag-btn', { active: isFilterActive('tag_id', tag.id) }]"
                        >
                            {{ tag.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["classes"],
        data() {
            return {
                searchQuery: this.$route.query.q || "",
                minPrice: this.$route.query.min_price || null,
                maxPrice: this.$route.query.max_price || null,
                categoryLimit: 5,
                isCategoryListExpanded: false,
                expandedCategories: []
            }
        },
        computed: {
            categoryList() {
                return this.$store.state.products.categories
            },
            categoriesTree() {
                const categories = JSON.parse(JSON.stringify(this.categoryList || []));
                const map = {};
                const roots = [];

                categories.forEach(cat => {
                    map[cat.id] = cat;
                    if (!cat.children) {
                        cat.children = [];
                    }
                });

                categories.forEach(cat => {
                    if (cat.parent_id && map[cat.parent_id]) {
                        map[cat.parent_id].children.push(cat);
                    } else if (!cat.parent_id) {
                        roots.push(cat);
                    }
                });

                return roots;
            },
            visibleCategories() {
                if (this.isCategoryListExpanded) {
                    return this.categoriesTree;
                }
                return this.categoriesTree.slice(0, this.categoryLimit);
            },
            sizeList() {
                return this.$store.state.products.sizes
            },
            colorList() {
                return this.$store.state.products.colors
            },
            tagList() {
                return this.$store.state.products.tags
            },
            isOnSale() {
                return this.$route.query.on_sale === '1'
            }
        },

        methods: {
            handleSearch() {
                this.updateQuery({ q: this.searchQuery, page: 1 })
            },
            toggleFilter(key, value) {
                let currentValues = this.$route.query[key] || []
                if (!Array.isArray(currentValues)) {
                    currentValues = [currentValues]
                }
                
                const index = currentValues.indexOf(String(value))
                if (index > -1) {
                    currentValues.splice(index, 1)
                } else {
                    currentValues.push(String(value))
                }

                this.updateQuery({ [key]: currentValues, page: 1 })
            },
            isFilterActive(key, value) {
                const currentValues = this.$route.query[key] || []
                if (Array.isArray(currentValues)) {
                    return currentValues.includes(String(value))
                }
                return currentValues === String(value)
            },
            updatePriceFilter() {
                this.updateQuery({ 
                    min_price: this.minPrice || undefined, 
                    max_price: this.maxPrice || undefined,
                    page: 1 
                })
            },
            toggleOnSale() {
                this.updateQuery({ on_sale: this.isOnSale ? undefined : '1', page: 1 })
            },
            toggleCategoryList() {
                this.isCategoryListExpanded = !this.isCategoryListExpanded;
            },
            toggleCategoryChildren(id) {
                const index = this.expandedCategories.indexOf(id);
                if (index > -1) {
                    this.expandedCategories.splice(index, 1);
                } else {
                    this.expandedCategories.push(id);
                }
            },
            isCategoryExpanded(id) {
                return this.expandedCategories.includes(id);
            },
            updateQuery(newQuery) {
                this.$router.push({
                    path: this.$route.path,
                    query: {
                        ...this.$route.query,
                        ...newQuery
                    }
                })
            }
        }
    };
</script>

