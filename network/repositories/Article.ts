import BaseApi from '~/network/BaseApi';

export default () => ({
    index(payload: any) {
        return BaseApi.setAuth().get('admin/articles', payload);
    },
    show(id: number) {
        return BaseApi.setAuth().get('admin/articles/' + id);
    },
    store(payload: any) {
        return BaseApi.setAuth().post('admin/articles', payload);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/articles/' + id, payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('admin/articles/' + id);
    },
    policy() {
        return BaseApi.get('/policy');
    },
    tutorial() {
        return BaseApi.get('/tutorial');
    },

    getArticle(payload: any) {
        return BaseApi.get('/articles', payload);
    },
    getRandomArticle() {
        return BaseApi.get('/articles/random');
    },
    getDetailArticle(id: number) {
        return BaseApi.get('/articles/' + id);
    },
});
