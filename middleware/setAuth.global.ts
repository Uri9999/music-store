import { useAuthStore } from '~/stores/authStore';
import type { Profile } from '~/types/user';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    if (process.client) {
        const user = localStorage.getItem('user') as Profile | null;
        const accessToken = localStorage.getItem('access_token');
        if (user) {
            authStore.setProfile(user);
            console.log('authStore', authStore.profile);
        }
        if (accessToken) {
            authStore.setAuthenticated();
        }
    }
});
