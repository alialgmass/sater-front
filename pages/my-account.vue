<template>
    <div class="shop-page-wrapper">
        <HeaderWithTopbar containerClass="container" />
        <Breadcrumb :pageTitle="$t('my_account')" />
        
        <div class="my-account-area pb-80 pt-100">
            <div class="container">
                <div class="row">
                    <div class="ms-auto me-auto col-lg-9">
                        <div class="my-account-wrapper">
                            <div id="faq" class="panel-group">
                                <div class="panel panel-default single-my-account">
                                    <div class="panel-heading my-account-title">
                                        <h3 class="panel-title"><span>1 .</span> <a data-bs-toggle="collapse" href="#my-account-1">{{ $t('edit_account_info') }} </a></h3>
                                    </div>
                                    <div id="my-account-1" class="panel-collapse collapse show" data-bs-parent="#faq">
                                        <div class="panel-body">
                                            <div class="myaccount-info-wrapper">
                                                <div class="account-info-wrapper">
                                                    <h4>{{ $t('account_information') }}</h4>
                                                    <h5>{{ $t('personal_details') }}</h5>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="billing-info">
                                                            <label>First Name</label>
                                                            <input type="text" v-model="profile.first_name">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="billing-info">
                                                            <label>Last Name</label>
                                                            <input type="text" v-model="profile.last_name">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="billing-info">
                                                            <label>Email Address</label>
                                                            <input type="email" v-model="profile.email" readonly>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="billing-info">
                                                            <label>{{ $t('phone') }}</label>
                                                            <input type="text" v-model="profile.phone">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-6 col-md-6">
                                                        <div class="billing-info">
                                                            <label>{{ $t('fax') }}</label>
                                                            <input type="text" v-model="profile.fax">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="billing-back-btn">
                                                    <div class="billing-back">
                                                        <a href="#"><i class="fa fa-arrow-up"></i> {{ $t('back') }}</a>
                                                    </div>
                                                    <div class="billing-btn">
                                                        <button type="button" @click="updateProfile" :disabled="loading">
                                                            {{ loading ? $t('updating') : $t('continue') }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default single-my-account">
                                    <div class="panel-heading my-account-title">
                                        <h3 class="panel-title"><span>2 .</span> <a data-bs-toggle="collapse" href="#my-account-2">{{ $t('change_password') }} </a></h3>
                                    </div>
                                    <div id="my-account-2" class="panel-collapse collapse" data-bs-parent="#faq">
                                        <div class="panel-body">
                                            <div class="myaccount-info-wrapper">
                                                <div class="account-info-wrapper">
                                                    <h4>{{ $t('change_password') }}</h4>
                                                    <h5>{{ $t('password') }}</h5>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="billing-info">
                                                            <label>Password</label>
                                                            <input type="password" v-model="password.new">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 col-md-12">
                                                        <div class="billing-info">
                                                            <label>Password Confirm</label>
                                                            <input type="password" v-model="password.confirm">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="billing-back-btn">
                                                    <div class="billing-back">
                                                        <a href="#"><i class="fa fa-arrow-up"></i> {{ $t('back') }}</a>
                                                    </div>
                                                    <div class="billing-btn">
                                                        <button type="button" @click="changePassword">{{ $t('continue') }}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default single-my-account">
                                    <div class="panel-heading my-account-title">
                                        <h3 class="panel-title"><span>3 .</span> <a data-bs-toggle="collapse" href="#my-account-3">{{ $t('modify_address_book') }}   </a></h3>
                                    </div>
                                    <div id="my-account-3" class="panel-collapse collapse" data-bs-parent="#faq">
                                        <div class="panel-body">
                                            <div class="myaccount-info-wrapper">
                                                <div class="account-info-wrapper">
                                                    <h4>{{ $t('address_book_entries') }}</h4>
                                                </div>
                                                <div class="entries-wrapper">
                                                    <div class="row">
                                                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                                                            <div class="entries-info text-center">
                                                                <p>Keith L. Castro </p>
                                                                <p>  559 Pratt Avenue </p>
                                                                <p> Orchards, WA 98662 </p>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                                                            <div class="entries-edit-delete text-center">
                                                                <button class="edit">Edit</button>
                                                                <button>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="billing-back-btn">
                                                    <div class="billing-back">
                                                        <a href="#"><i class="fa fa-arrow-up"></i> {{ $t('back') }}</a>
                                                    </div>
                                                    <div class="billing-btn">
                                                        <button type="submit">{{ $t('continue') }}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            HeaderWithTopbar: () => import("@/components/HeaderWithTopbar"),
            Breadcrumb: () => import("@/components/Breadcrumb"),
            TheFooter: () => import("@/components/TheFooter"),
        },
        data() {
            return {
                profile: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    fax: ''
                },
                password: {
                    current: '',
                    new: '',
                    confirm: ''
                },
                loading: false
            }
        },
        computed: {
            user() {
                return this.$store.state.auth.user
            }
        },
        watch: {
            user: {
                immediate: true,
                handler(val) {
                    if (val) {
                        this.profile = {
                            first_name: val.first_name || '',
                            last_name: val.last_name || '',
                            email: val.email || '',
                            phone: val.phone || '',
                            fax: val.fax || ''
                        }
                    }
                }
            }
        },
        async mounted() {
            if (this.$store.state.auth.isAuthenticated) {
                await this.$store.dispatch('auth/fetchProfile')
            }
        },
        methods: {
            async updateProfile() {
                this.loading = true
                try {
                    await this.$store.dispatch('auth/updateProfile', this.profile)
                    this.$notify({ type: 'success', text: 'Profile updated successfully!'})
                } catch (error) {
                    this.$notify({ type: 'error', text: 'Failed to update profile'})
                } finally {
                    this.loading = false
                }
            },
            async changePassword() {
                // Implement change password logic if API supports it
                this.$notify({ type: 'info', text: 'Password change functionality coming soon'})
            }
        },
        head() {
            return {
                title: "My Account"
            }
        }
    }
</script>
