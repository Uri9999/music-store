import { defineStore } from 'pinia';
import type { Profile } from '~/types/user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        profile: null as Profile | null,
        isAuthenticated: false,
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
        },
    },
});
