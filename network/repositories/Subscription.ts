import BaseApi from '~/network/BaseApi';

export default () => ({
    index() {
        return BaseApi.get('subscriptions');
    },
    register(payload: any) {
        return BaseApi.setAuth().post('subscription/register', payload);
    },
    show(id: number) {
        return BaseApi.setAuth().post('subscription/' + id);
    },
    list() {
        return BaseApi.setAuth().get('subscription/list');
    },
});
