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
        return BaseApi.setAuth().get('tabs/' + id);
    },

    getTabByIds(payload: any) {
        return BaseApi.setAuth().get('/tabs/get/by-ids', payload);
    },

    getTabByUserId(payload: any, userId: number) {
        return BaseApi.get('/tabs/by-user-id/' + userId, payload);
    },

    // only manage
    adminIndex(payload: any) {
        return BaseApi.setAuth().get('admin/tabs', payload);
    },

    adminStore(payload: any) {
        return BaseApi.setAuth().post('admin/tabs', payload);
    },

    adminShow(id: number) {
        return BaseApi.setAuth().get('admin/tabs/' + id);
    },

    adminDelete(id: number) {
        return BaseApi.setAuth().delete('admin/tabs/' + id);
    },

    adminRemoveTabImage(tabId: number, mediaId: number) {
        return BaseApi.setAuth().delete(
            `admin/tabs/${tabId}/images/${mediaId}`,
        );
    },

    adminUpdateTab(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/tabs/' + id, payload);
    },
});
