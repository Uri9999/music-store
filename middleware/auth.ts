export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('access_token');
        if (!token && to.path !== '/login') {
            return navigateTo('/login');
        }
    }
});
