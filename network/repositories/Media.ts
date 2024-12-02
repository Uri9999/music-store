import BaseApi from '~/network/BaseApi';

export default () => ({
    upload(collection: string, file: any, onUploadProgress: (progressEvent: any) => void) {
        return BaseApi.setAuth().post('admin/media/upload', { collection: collection, file: file }, onUploadProgress);
    },
});
