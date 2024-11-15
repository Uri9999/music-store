// /middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        // Kiểm tra nếu đang chạy trên client
        const token = localStorage.getItem('access_token');
        if (!token && to.path !== '/login') {
            return navigateTo('/login');
        }
    }
});
