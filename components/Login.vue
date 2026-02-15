<template>
    <div class="login-form">
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="email" :placeholder="$t('email_placeholder')" required>
            <input type="password" v-model="password" :placeholder="$t('password_placeholder')" required>
            <div class="button-box">
                <div class="login-toggle-btn">
                    <input type="checkbox">
                    <label>{{ $t('remember_me') }}</label>
                    <a href="#">{{ $t('forgot_password') }}</a>
                </div>
                <button type="submit" :disabled="loading">
                    <span v-if="loading">{{ $t('loading') }}</span>
                    <span v-else>{{ $t('login_submit') }}</span>
                </button>
            </div>
            <p v-if="error" class="text-danger mt-2">{{ error }}</p>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        loading() {
            return this.$store.state.auth.loading
        },
        error() {
            return this.$store.state.auth.error
        }
    },
    methods: {
        async handleLogin() {
            try {
                await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                })
                this.$notify({
                    type: 'success',
                    text: 'Logged in successfully!'
                })
                this.$router.push('/my-account')
            } catch (error) {
                // Error is handled in store
            }
        }
    }
}
</script>