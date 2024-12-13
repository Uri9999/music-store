import BaseApi from '~/network/BaseApi';

export default () => ({
    login(payload: any) {
        return BaseApi.post('login', payload);
    },

    logout() {
        return BaseApi.setAuth().post('logout');
    },

    register(payload: any) {
        return BaseApi.post('register', payload);
    },

    verifyUser(payload: any) {
        return BaseApi.post('verify-user', payload);
    },

    forgotPassword(payload: any) {
        return BaseApi.post('forgot-password', payload);
    },

    resetPassword(payload: any) {
        return BaseApi.post('reset-password', payload);
    },

    getInfo() {
        return BaseApi.setAuth().get('auth/info');
    },

    updateInfo(payload: any) {
        return BaseApi.setAuth().post('auth/update/info', payload);
    },
});
