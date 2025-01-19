export default defineNuxtRouteMiddleware((to, from) => {
    const {isAuthenticated, isUser} = useAuthStore();
    if (process.client) {
        if (!isAuthenticated || isUser) {
            return navigateTo('/login');
        }
    }
});
