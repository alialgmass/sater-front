<template>
    <footer class="footer-area bg-gray pt-100 pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-2 col-sm-4">
                    <div class="copyright mb-30">
                        <div class="footer-logo">
                            <n-link to="/">
                                <img src="/img/logo/logo.png" alt="Sater logo" style="max-height: 40px;">
                            </n-link>
                        </div>
                        <p>© 2026 <a href="#" target="_blank">Flone</a>.<br> {{ $t('all_rights_reserved') }}</p>
                    </div>
                </div>
                <div class="col-lg-2 col-sm-4">
                    <div class="footer-widget mb-30 ml-30">
                        <div class="footer-title">
                            <h3>{{ $t('about_us') }}</h3>
                        </div>
                        <div class="footer-list">
                            <ul>
                                <li><n-link :to="localePath('/about')">{{ $t('about_us') }}</n-link></li>
                                <li><n-link :to="localePath('/shop')">{{ $t('store_location') }}</n-link></li>
                                <li><n-link :to="localePath('/contact')">{{ $t('contact') }}</n-link></li>
                                <li><n-link :to="localePath('/contact')">{{ $t('orders_tracking') }}</n-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-sm-4">
                    <div class="footer-widget mb-30 ml-50">
                        <div class="footer-title">
                            <h3>{{ $t('useful_links') }}</h3>
                        </div>
                        <div class="footer-list">
                            <ul>
                                <li><n-link :to="localePath('/about')">{{ $t('returns') }}</n-link></li>
                                <li><n-link :to="localePath('/about')">{{ $t('support_policy') }}</n-link></li>
                                <li><n-link :to="localePath('/about')">{{ $t('size_guide') }}</n-link></li>
                                <li><n-link :to="localePath('/about')">{{ $t('faqs') }}</n-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2 col-sm-6">
                    <div class="footer-widget mb-30 ml-75">
                        <div class="footer-title">
                            <h3>{{ $t('follow_us') }}</h3>
                        </div>
                        <div class="footer-list">
                            <ul>
                                <li><a href="https://www.facebook.com/" target="_blank">Facebook</a></li>
                                <li><a href="https://twitter.com/" target="_blank">Twitter</a></li>
                                <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                                <li><a href="https://www.youtube.com/" target="_blank">Youtube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="footer-widget mb-30 ml-70">
                        <div class="footer-title">
                            <h3>{{ $t('subscribe') }}</h3>
                        </div>
                        <div class="subscribe-style">
                            <p>{{ $t('subscribe_text') }}</p>
                            <div class="subscribe-form">
                                <form class="mc-form">
                                    <input class="email" type="email" required="" :placeholder="$t('enter_email')" name="email" >
                                    <button class="button" name="subscribe">{{ $t('subscribe') }}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {

    };
</script>