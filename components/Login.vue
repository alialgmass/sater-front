<template>
    <div class="login-form">
        <form @submit.prevent="handleLogin">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <div class="button-box">
                <div class="login-toggle-btn">
                    <input type="checkbox">
                    <label>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" :disabled="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-else>Login</span>
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