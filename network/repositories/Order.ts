import BaseApi from '~/network/BaseApi';

export default () => ({
    store(payload: any) {
        return BaseApi.setAuth().post('orders', payload);
    },

    getMyOrder() {
        return BaseApi.setAuth().get('orders/created-by-me');
    },

    index(payload: any) {
        return BaseApi.setAuth().get('admin/orders', payload);
    },

    adminShow(id: number) {
        return BaseApi.setAuth().get('admin/orders/' + id);
    },
});
