import BaseApi from '~/network/BaseApi';

export default () => ({
    getByMe() {
        return BaseApi.setAuth().get('carts/get-by-me');
    },
    getCountByMe() {
        return BaseApi.setAuth().get('carts/get-count-by-me');
    },
    add(payload: any) {
        return BaseApi.setAuth().post('carts', payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('carts/' + id);
    },
});
