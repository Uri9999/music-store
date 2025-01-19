import { defineStore } from 'pinia';
import type { Profile } from '~/types/user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        profile: null as Profile | null,
        isAuthenticated: false,
        isAdmin: false,
        isStaff: false,
        isAffiliate: false,
        isUser: false,
    }),

    actions: {
        logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            this.isAuthenticated = false;
        },
        setAuthenticated(value = true) {
            this.isAuthenticated = value;
        },
        setProfile(user: Profile) {
            this.profile = user;
            this.isAdmin = user.role_id == 1;
            this.isStaff = user.role_id == 2;
            this.isAffiliate = user.role_id == 3;
            this.isUser = user.role_id == 4;
        },
    },
});
