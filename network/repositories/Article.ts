import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/articles', payload);
    },
    show(id: number) {
        return BaseApi.setAuth().get('admin/articles/' + id);
    },
    store(payload: any) {
        return BaseApi.setAuth().post('admin/articles', payload);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/articles/' + id, payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('admin/articles/' + id);
    },
});
