<template>
    <div class="register-form">
        <form @submit.prevent="handleRegister">
            <input type="text" v-model="name" :placeholder="$t('name_placeholder')" required>
            <input type="email" v-model="email" :placeholder="$t('email_placeholder')" required>
            <input type="password" v-model="password" :placeholder="$t('password_placeholder')" required>
            <input type="password" v-model="password_confirmation" :placeholder="$t('confirm_password_placeholder')" required>
            <div class="button-box">
                <button type="submit" :disabled="loading">
                    <span v-if="loading">{{ $t('loading') }}</span>
                    <span v-else>{{ $t('register_submit') }}</span>
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