<template>
    <div class="register-form">
        <form @submit.prevent="handleRegister">
            <input type="text" v-model="name" placeholder="Name" required>
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <input type="password" v-model="password_confirmation" placeholder="Confirm Password" required>
            <div class="button-box">
                <button type="submit" :disabled="loading">
                    <span v-if="loading">Loading...</span>
                    <span v-else>Register</span>
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
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
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
        async handleRegister() {
            try {
                await this.$store.dispatch('auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                this.$notify({
                    type: 'success',
                    text: 'Registered successfully!'
                })
                this.$router.push('/my-account')
            } catch (error) {
                // Error is handled in store
            }
        }
    }
}
</script>