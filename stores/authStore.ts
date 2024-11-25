import { defineStore } from 'pinia';
import type { Profile } from '~/types/user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        profile: null as Profile | null,
        isAuthenticated: false,
        isAdmin: false,
    }),

    actions: {
        logout() {
            localStorage.removeItem('token');
            this.isAuthenticated = false;
        },
        setAuthenticated(value = true) {
            this.isAuthenticated = value;
        },
        setProfile(user: Profile) {
            this.profile = user;
            this.isAdmin = user.role_id == 1;
        },
    },
});
