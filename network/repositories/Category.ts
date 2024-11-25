import BaseApi from '~/network/BaseApi';

export default () => ({
    store(payload: any) {
        return BaseApi.setAuth().post('admin/categories', payload);
    },

    update(id: number, payload: any) {
        return BaseApi.setAuth().put('admin/categories/' + id, payload);
    },

    show(id: number) {
        return BaseApi.setAuth().get('admin/categories/' + id);
    },

    index(payload: any) {
        return BaseApi.setAuth().get('admin/categories', payload);
    },

    delete(id: number) {
        return BaseApi.setAuth().delete('admin/categories/' + id);
    },
});
