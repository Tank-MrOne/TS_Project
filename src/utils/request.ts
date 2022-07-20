'use strict'
import axios from "axios";
// vuex
import store from '@/store/index'
// router
import router from '@/router/index';
const requestUrl = 'http://101.34.172.88:9000';
const instance = axios.create({
    baseURL: requestUrl,
    timeout: 30000
})

instance.interceptors.request.use(config => {
    const release = ['auth/login', 'auth/register', 'auth/logout', 'sms/sendCode', 'uib/series/list', 'uib/product/list']
    let url = config.url
    if (config.url.indexOf("?") !== -1) {
        url = url.split("?")[0]
    }
    if (/get/i.test(config.method as string)) {
        config.params = config.params || {};
        config.params.timeStamp = new Date().getTime();
    }
    if (release.includes(url)) {
        return config;
    }
    if (!store.state.token && !sessionStorage.getItem('yongle')) {
        router.push('/login')
    } else {
        config.headers.token = store.state.token || sessionStorage.getItem('yongle')
    }
    return config;
}, error => {
    return Promise.reject(error);
})
instance.interceptors.response.use(
    (response: any) => {
        const res = response.data
        return res
    },
    (error: any) => {
        return Promise.reject('网络开小差儿了，请刷新重试')
    },
)
export default instance