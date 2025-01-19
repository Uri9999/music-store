import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (process.client) {
        const user = localStorage.getItem('user') as string | null;
        
        const accessToken = localStorage.getItem('access_token');
        if (user) {
            authStore.setProfile(JSON.parse(user));
        }
        if (accessToken) {
            authStore.setAuthenticated();
        }
    }
});
