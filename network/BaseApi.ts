import axios from "axios";

class BaseApi {
    public baseURL: string = import.meta.env.VITE_HOST + '/api'
    public method: any = null;
    public timeout: number = 10000; // 10s
    public headers: any = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'No auth'
    }
    public params: object | null = null;
    public data: any = null;
    public url: any = null;

    setHeader(headers: object) {
        this.headers = headers;

        return this;
    }

    resetHeader() {
        this.headers = {};

        return this;
    }

    setAuth() {
        const token = localStorage.getItem('access_token')
        var accessToken = 'No Auth'
        if (token) {
            accessToken = `Bearer ${accessToken}`
        }

        this.headers['Authorization'] = accessToken

        return this;
    }

    // Thêm onUploadProgress vào đây
    post(url: string, data: any = null, onUploadProgress: (progressEvent: any) => void = () => {}) {
        this.headers['Content-Type'] = 'multipart/form-data';
        this.url = url;
        this.method = 'post';
        if (data) {
            this.data = data;
        }

        return this.execute(onUploadProgress);
    }

    get(url: string, params: any = null) {
        this.url = url;
        if (params) {
            this.params = params;
        }
        this.method = 'get';

        return this.execute();
    }

    put(url: string, data: any = null) {
        this.url = url;
        this.method = 'put';

        if (data) {
            this.data = data;
        }

        return this.execute();
    }

    delete(url: string) {
        this.url = url;
        this.method = 'delete';

        return this.execute();
    }

    // Thay đổi hàm execute để nhận thêm onUploadProgress
    execute(onUploadProgress: (progressEvent: any) => void = () => {}) {
        return new Promise(
            (resolve, reject) => {
                axios({
                    baseURL: this.baseURL,
                    method: this.method,
                    url: this.url,
                    timeout: this.timeout,
                    headers: this.headers,
                    params: this.params,
                    data: this.data,
                    onUploadProgress // Thêm onUploadProgress vào đây
                }).then(async response => {
                    const data = response.data
                    const status = data?.status
                    switch (status) {
                        case 200:
                            resolve(data);
                            break
                        case 401:
                            // LocalStorageService.clearAuthInfo()
                        case 403:
                        //TODO: handle permission

                        default:
                            // code block
                    }
                    
                    reject(data);
                }).catch(error => {
                    reject(error);
                });
            }
        )
    }
}

export default new BaseApi();
