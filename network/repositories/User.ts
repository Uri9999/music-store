import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/user', payload);
    },
    lock(id: number) {
        return BaseApi.setAuth().post('admin/user/' + id + '/lock');
    },
    unlock(id: number) {
        return BaseApi.setAuth().post('admin/user/' + id + '/unlock');
    },
});
