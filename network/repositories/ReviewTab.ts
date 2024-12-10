import BaseApi from '../BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/review-tab', payload);
    },

    disable(id: number) {
        return BaseApi.setAuth().get('admin/review-tab/disable/' + id);
    },

    enable(id: number) {
        return BaseApi.setAuth().get('admin/review-tab/enable/' + id);
    },
});
