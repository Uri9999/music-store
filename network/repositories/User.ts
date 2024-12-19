import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/user', payload);
    },
    getManager(payload: any) {
        return BaseApi.setAuth().get('admin/user/manager', payload);
    },
    lock(id: number) {
        return BaseApi.setAuth().post('admin/user/' + id + '/lock');
    },
    unlock(id: number) {
        return BaseApi.setAuth().post('admin/user/' + id + '/unlock');
    },
    show(id: number) {
        return BaseApi.setAuth().get('admin/user/' + id);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/user/' + id, payload);
    },
});
