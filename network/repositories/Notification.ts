import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('notifications', payload);
    },
    show(id: number) {
        return BaseApi.setAuth().get('notifications/' + id);
    },
    getMyNotify(payload: any) {
        return BaseApi.setAuth().get('notifications/my', payload);
    },
    countNotReadYet() {
        return BaseApi.setAuth().get('notifications/count-not-read');
    },
});
