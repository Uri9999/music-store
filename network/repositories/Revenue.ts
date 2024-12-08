import BaseApi from '../BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/revenue', payload);
    },
    show(id: number, payload: any) {
        return BaseApi.setAuth().get('admin/revenue/' + id, payload);
    }
});
