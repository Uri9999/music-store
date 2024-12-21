import BaseApi from '~/network/BaseApi';

export default () => ({
    getMyNotify(payload: any) {
        return BaseApi.setAuth().get('notifications/my', payload);
    },
    countNotReadYet() {
        return BaseApi.setAuth().get('notifications/count-not-read');
    },
});
