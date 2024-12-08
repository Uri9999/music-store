import BaseApi from '~/network/BaseApi';

export default () => ({
    getCount(payload: any) {
        return BaseApi.setAuth().get('admin/dashboard/count', payload);
    },

    getUserStats(payload: any) {
        return BaseApi.setAuth().get('admin/dashboard/user-stats', payload);
    },

    getOrderStats(payload: any) {
        return BaseApi.setAuth().get('admin/dashboard/order-stats', payload);
    },

    getTabStats(payload: any) {
        return BaseApi.setAuth().get('admin/dashboard/tab-stats', payload);
    },
});
