import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.get('tabs', payload);
    },

    newTab() {
        return BaseApi.get('new-tab');
    },

    randomTab() {
        return BaseApi.get('random-tab');
    },

    show(id: number) {
        return BaseApi.get('tabs/' + id);
    },

    getTabByIds(payload: any) {
        return BaseApi.setAuth().get('/tabs/get/by-ids', payload);
    },

    // only manage
    adminIndex(payload: any) {
        return BaseApi.setAuth().get('admin/tabs', payload);
    },
});
