<template>
    <div class="breadcrumb-area pt-35 pb-35 bg-gray-3" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="container">
            <div class="breadcrumb-content text-center">
                <ul>
                    <li>
                        <n-link :to="localePath('/')">{{ $t('home') }}</n-link>
                    </li>
                    <li class="active">{{ pageTitle }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    [dir="rtl"] {
        .breadcrumb-content {
            ul {
                li {
                    margin-right: 0;
                    margin-left: 15px;
                    &:last-child {
                         margin-left: 0;
                    }
                    &::after {
                        content: "/";
                        padding-left: 15px;
                        padding-right: 0;
                    }
                    &.active {
                        &::after {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        props: ["pageTitle"]
    };
</script>