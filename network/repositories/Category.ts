import BaseApi from '~/network/BaseApi';

export default () => ({
    store(payload: any) {
        return BaseApi.setAuth().post('orders', payload);
    },

    show(id: number) {
        return BaseApi.setAuth().get('orders/' + id);
    },

    index(payload: any) {
        return BaseApi.setAuth().get('admin/categories', payload);
    },

    delete(id: number) {
        return BaseApi.setAuth().delete('admin/categories/' + id);
    },
});
