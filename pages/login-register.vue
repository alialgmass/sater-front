<template>
    <div class="shop-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('login_register_tab')" />
        
        <div class="login-register-area pt-100 pb-100">
            <div class="container">
                <div class="login-register-tab-list nav">
                    <button @click="comA('Login')" :class="{ active: isActive === 'Login' }" >
                        {{ $t('login') }}
                    </button>
                    <button @click="comA('Register')" :class="{ active: isActive === 'Register' }" >
                        {{ $t('register') }}
                    </button>
                </div>
                <div class="row">
                    <div class="col-lg-7 col-12 ms-auto me-auto">
                        <component :is="isActive" />
                    </div>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script>
    import HeaderWithTopbar from "@/components/HeaderWithTopbar";
    import Login from "@/components/Login";
    import Register from "@/components/Register";
    import Breadcrumb from "@/components/Breadcrumb";
    import TheFooter from "@/components/TheFooter";
    export default {
        components: {
            HeaderWithTopbar,
            Login,
            Register,
            Breadcrumb,
            TheFooter
        },

        data() {
            return {
                isActive: "Login",
            };
        },

        methods: {
            comA(item) {
                this.isActive = item;
            }
        },
        head() {
            return {
                title: this.$t('login_register_tab')
            }
        }
    };
</script>
