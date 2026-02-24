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
                                        <h3 class="panel-title"><span>3 .</span> <a data-bs-toggle="collapse" href="#my-account-orders">{{ $t('orders') }}</a></h3>
                                    </div>
                                    <div id="my-account-orders" class="panel-collapse collapse" :class="{ 'show': activeTab === 'orders' }" data-bs-parent="#faq">
                                        <div class="panel-body">
                                            <div class="myaccount-info-wrapper">
                                                <div class="account-info-wrapper">
                                                    <h4>{{ selectedOrder ? $t('order_details') : $t('orders') }}</h4>
                                                </div>
                                                
                                                <!-- Order Details View -->
                                                <div class="order-details-wrapper" v-if="selectedOrder">
                                                    <div class="row mb-30">
                                                        <div class="col-md-6">
                                                            <h5>{{ $t('order_id') }}: {{ selectedOrder.order_number }}</h5>
                                                            <p>{{ $t('date') }}: {{ new Date(selectedOrder.created_at).toLocaleDateString() }}</p>
                                                            <p>{{ $t('status') }}: <span class="badge bg-primary">{{ selectedOrder.status }}</span></p>
                                                        </div>
                                                        <div class="col-md-6 text-md-end">
                                                            <button class="btn btn-secondary" @click="closeOrderDetails">{{ $t('back_to_orders') }}</button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row mb-30">
                                                        <div class="col-md-6">
                                                            <div class="card">
                                                                <div class="card-header">{{ $t('shipping_info') }}</div>
                                                                <div class="card-body">
                                                                    <p v-if="selectedOrder.shipping_address">
                                                                        {{ selectedOrder.shipping_address.street }}<br>
                                                                        {{ selectedOrder.shipping_address.city }}, {{ selectedOrder.shipping_address.country }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <div class="card">
                                                                <div class="card-header">{{ $t('billing_info') }}</div>
                                                                <div class="card-body">
                                                                    <p>{{ $t('payment_method') }}: {{ selectedOrder.payment_method }}</p>
                                                                    <p>{{ $t('payment_status') }}: {{ selectedOrder.payment_status }}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="table-responsive">
                                                        <table class="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>{{ $t('items') }}</th>
                                                                    <th>{{ $t('quantity') }}</th>
                                                                    <th>{{ $t('price') }}</th>
                                                                    <th>{{ $t('total') }}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in selectedOrder.items" :key="item.id">
                                                                    <td>{{ item.product_name }}</td>
                                                                    <td>{{ item.quantity }}</td>
                                                                    <td>${{ parseFloat(item.price).toFixed(2) }}</td>
                                                                    <td>${{ parseFloat(item.total).toFixed(2) }}</td>
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td colspan="3" class="text-end"><strong>{{ $t('total') }}</strong></td>
                                                                    <td><strong>${{ parseFloat(selectedOrder.total_amount).toFixed(2) }}</strong></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>

                                                <!-- Orders List View -->
                                                <div class="account-orders-table table-responsive" v-else-if="orders.length > 0">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>{{ $t('order_id') }}</th>
                                                                <th>{{ $t('date') }}</th>
                                                                <th>{{ $t('status') }}</th>
                                                                <th>{{ $t('total') }}</th>
                                                                <th>{{ $t('action') }}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="order in orders" :key="order.id">
                                                                <td>{{ order.order_number }}</td>
                                                                <td>{{ new Date(order.created_at).toLocaleDateString() }}</td>
                                                                <td>{{ order.status }}</td>
                                                                <td>${{ parseFloat(order.total_amount).toFixed(2) }}</td>
                                                                <td><a href="#" class="check-btn sqr-btn" @click.prevent="viewOrder(order.order_number)">{{ $t('view') }}</a></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div v-else class="text-center mt-20">
                                                    <p>{{ $t('no_orders') }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default single-my-account">
                                    <div class="panel-heading my-account-title">
                                        <h3 class="panel-title"><span>4 .</span> <a data-bs-toggle="collapse" href="#my-account-3">{{ $t('modify_address_book') }}   </a></h3>
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
                password: {
                    current: '',
                    new: '',
                    confirm: ''
                },
                loading: false,
                loading: false,
                orders: [],
                selectedOrder: null,
                activeTab: 'info' // Default tab
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
                await this.fetchOrders()
            }
            if (this.$route.query.tab === 'orders') {
                this.activeTab = 'orders'
                // Close other tabs logic if needed, but 'show' class handling usually suffices for bootstrap accordion if not using v-model
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
            },
            async fetchOrders() {
                try {
                    const response = await this.$orderService.getOrders()
                    this.orders = response.orders || response.data || (Array.isArray(response) ? response : [])
                } catch (error) {
                    console.error('Failed to fetch orders', error)
                }
            },
            async viewOrder(orderId) {
                this.loading = true
                try {
                    const response = await this.$orderService.getOrder(orderId)
                    this.selectedOrder = response.order || response.data || response
                } catch (error) {
                    console.error('Failed to fetch order details', error)
                    this.$notify({ type: 'error', text: 'Failed to LOAD order details' })
                } finally {
                    this.loading = false
                }
            },
            closeOrderDetails() {
                this.selectedOrder = null
            }
        },
        head() {
            return {
                title: "My Account"
            }
        }
    }
</script>
