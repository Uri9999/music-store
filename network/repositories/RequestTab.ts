import BaseApi from "../BaseApi";

export default () => ({
    getCreatedByMy() {
        return BaseApi.setAuth().get('request-tabs/created/by-me');
    }
});
