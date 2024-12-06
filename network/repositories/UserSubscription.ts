import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/user-subscriptions', payload);
    },

    approve(id: number) {
        return BaseApi.setAuth().post('admin/user-subscriptions/approve/' + id);
    },

    reject(id: number) {
        return BaseApi.setAuth().post('admin/user-subscriptions/reject/' + id);
    },
});
