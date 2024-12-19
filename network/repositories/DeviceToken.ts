import BaseApi from '~/network/BaseApi';

export default () => ({
    store(data: any) {
        // token
        return BaseApi.setAuth().post('device-tokens', data)
    }
});
