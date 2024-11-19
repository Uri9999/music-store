import BaseApi from '../BaseApi';

export default () => ({
    getCreatedByMy() {
        return BaseApi.setAuth().get('request-tabs/created/by-me');
    },
    store(payload: any) {
        return BaseApi.setAuth().post('request-tabs', payload);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().put('request-tabs/' + id, payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('request-tabs/' + id);
    },
});
