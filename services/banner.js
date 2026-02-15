export default (context) => {
    const { $axios } = context

    return {
        getBanners() {
            return $axios.$get('/v1/banners/active')
        }
    }
}
