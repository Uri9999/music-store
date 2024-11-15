// /stores/authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as { email: string; name: string } | null, // Lưu thông tin người dùng
        isAuthenticated: false,
    }),

    actions: {
        logout() {
            localStorage.removeItem('token'); // Xóa token
            this.isAuthenticated = false;
        },
        setAuthenticated(value = true) {
            this.isAuthenticated = value;
        },
    },
});
