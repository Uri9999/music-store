import Api from '~/network/Api';
import { useAuthStore } from '~/stores/authStore';
import { useConfirm } from 'primevue/useconfirm';
import { useRouter } from 'vue-router';

const authService = () => {
    const confirm = useConfirm();
    const router = useRouter();
    const authStore = useAuthStore();

    const logout = async () => {
        await Api.auth
            .logout()
            .then((res: any) => {
                router.push('/');
                authStore.logout();
            })
            .catch();
    };

    const confirmDelete = () => {
        confirm.require({
            header: 'Xác nhận đăng xuất',
            message: 'Bạn có chắc chắn muốn đăng xuất ?',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Đóng',
            acceptLabel: 'Đăng xuất',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: async () => {
                await logout();
            },
            reject: () => {},
        });
    };

    return {
        logout,
        confirmDelete,
    };
};

export default authService;
