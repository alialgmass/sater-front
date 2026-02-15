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
                    <n-link :to="localePath(`?category=${category.slug || slugify(category)}`)">
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
                    <n-link :to="localePath(`?color=${slugify(color)}`)">
                        <span class="check-mark"></span>
                        {{ color }}
                    </n-link>
                </li>
            </ul>
        </div>

        <!-- size widget  -->
        <div class="sidebar-widget mt-50">
            <h4 class="pro-sidebar-title">{{ $t('sizes') }}</h4>
            <ul class="sidebar-widget-list mt-20">
                <li class="sidebar-widget-list-left" v-for="(size, index) in sizeList" :key="index" >
                    <n-link :to="localePath(`?size=${slugify(size)}`)">
                        <span class="check-mark"></span>
                        {{ size }}
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
                        <n-link :to="localePath(`?tag=${slugify(tag)}`)">
                            {{ tag }}
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