import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.get('tabs', payload);
    },

    newTab() {
        return BaseApi.get('new-tab');
    },
});
