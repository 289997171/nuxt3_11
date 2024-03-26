export default defineNuxtRouteMiddleware((to, from) => {
    // 未登录 且 是
    if (to.query.key !== 'xxx') {
        return navigateTo('/', {replace: true})
    }
})