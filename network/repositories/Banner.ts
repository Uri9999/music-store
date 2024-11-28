import BaseApi from '~/network/BaseApi';

export default () => ({
    index() {
        return BaseApi.setAuth().get('admin/banners');
    },
    show(id: number) {
        return BaseApi.setAuth().get('admin/banners/' + id);
    },
    store(payload: any) {
        return BaseApi.setAuth().post('admin/banners', payload);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/banners/' + id, payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('admin/banners/' + id);
    },
});
