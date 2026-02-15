<template>
    <div class="support-area pt-100 pb-90">
        <div class="container">
            <div class="row mtn-30">
                <div class="col-lg-3 col-sm-6 mt-30" v-for="(policy, index) in policies" :key="index">
                    <div class="support-wrap support-1">
                        <div class="support-icon">
                            <img class="animated" :src="policy.icon" :alt="policy.title">
                        </div>
                        <div class="support-content">
                            <h5>{{ policy.title }}</h5>
                            <p>{{ policy.subTitle }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                policies: [
                    {
                        icon: "/img/icon-img/support-1.png",
                        title: this.$t('free_shipping'),
                        subTitle: this.$t('free_shipping_subtitle')
                    },
                    {
                        icon: "/img/icon-img/support-2.png",
                        title: this.$t('support_24_7'),
                        subTitle: this.$t('support_24_7_subtitle')
                    },
                    {
                        icon: "/img/icon-img/support-3.png",
                        title: this.$t('money_return'),
                        subTitle: this.$t('money_return_subtitle')
                    },
                    {
                        icon: "/img/icon-img/support-4.png",
                        title: this.$t('order_discount'),
                        subTitle: this.$t('order_discount_subtitle')
                    },
                ]
            }
        },
    };
</script>
