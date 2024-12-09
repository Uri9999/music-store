import BaseApi from '~/network/BaseApi';

export default () => ({
    index() {
        return BaseApi.get('subscriptions');
    },
});
