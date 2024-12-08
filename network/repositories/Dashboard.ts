import BaseApi from '~/network/BaseApi';

export default () => ({
    getCount(payload: any) {
        return BaseApi.setAuth().get('admin/dashboard/count', payload);
    },
});
