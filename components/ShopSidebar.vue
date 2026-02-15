<template>
    <div class="sidebar-style" :class="classes">
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">{{ $t('search') }}</h4>
            <div class="pro-sidebar-search mb-50 mt-25">
                <form class="pro-sidebar-search-form" @submit.prevent="handleSearch">
                    <input type="text" :placeholder="$t('search_here')" v-model="searchQuery">
                    <button type="submit">
                        <i class="pe-7s-search"></i>
                    </button>
                </form>
            </div>
        </div>

        <!-- category widget  -->
        <div class="sidebar-widget">
            <h4 class="pro-sidebar-title">{{ $t('categories') }}</h4>
            <ul class="sidebar-widget-list mt-20">
                <li class="sidebar-widget-list-left" v-for="(category, index) in categoryList" :key="index">
                    <n-link :to="localePath({ path: '/shop', query: { category: category.slug || category.id } })">
                        <span class="check-mark"></span>
                        {{ category.name || category }}
                    </n-link>
                </li>
            </ul>
        </div>

        <!-- color widget  -->
        <div class="sidebar-widget mt-50">
            <h4 class="pro-sidebar-title">{{ $t('color') }}</h4>
            <ul class="sidebar-widget-list mt-20">
                <li class="sidebar-widget-list-left" v-for="(color, index) in colorList" :key="index" >
                    <n-link :to="localePath({ path: '/shop', query: { color_id: color.id } })">
                        <span class="check-mark" :style="{ backgroundColor: color.hex_code }"></span>
                        {{ color.name }}
                    </n-link>
                </li>
            </ul>
        </div>

        <!-- size widget  -->
        <div class="sidebar-widget mt-50">
            <h4 class="pro-sidebar-title">{{ $t('sizes') }}</h4>
            <ul class="sidebar-widget-list mt-20">
                <li class="sidebar-widget-list-left" v-for="(size, index) in sizeList" :key="index" >
                    <n-link :to="localePath({ path: '/shop', query: { size_id: size.id } })">
                        <span class="check-mark"></span>
                        {{ size.name }} ({{ size.abbreviation }})
                    </n-link>
                </li>
            </ul>
        </div>

        <!-- tag widget  -->
        <div class="sidebar-widget sidebar-widget__tag mt-60">
            <h4 class="pro-sidebar-title">{{ $t('tags') }}</h4>
            <div class="sidebar-widget-tag mt-30">
                <ul>
                    <li v-for="(tag, index) in tagList" :key="index">
                        <n-link :to="localePath({ path: '/shop', query: { tag_id: tag.slug } })">
                            {{ tag.name }}
                        </n-link>
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
                searchQuery: ""
            }
        },
        computed: {
            categoryList() {
                return this.$store.getters.categoryList
            },
            sizeList() {
                return this.$store.getters.sizeList
            },
            colorList() {
                return this.$store.getters.colorList
            },
            tagList() {
                return this.$store.getters.tagList
            }
        },

        methods: {
            handleSearch() {
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        q: this.searchQuery,
                        page: 1
                    }
                })
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
        }
    };
</script>