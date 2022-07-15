'use strict'
// import axios from "axios";

// const requestUrl = window.location.host === "www.xx.com" ? "https://xxx.com/"  : 'http://xx.xx.xx.xx:8001';
// const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'apps' : requestUrl,
//     timeout: 30000
// })

// instance.interceptors.request.use(config => {
//     if (/get/i.test(config.method as string)) {
//         config.params = config.params || {};
//         config.params.timeStamp = new Date().getTime();
//     }
//     return config;
// }, error => {
//     return Promise.reject(error);
// })
// instance.interceptors.response.use(
//     (response: any) => {
//         const res = response.data
//         if (!res.isSuccess) {
//             // 错误提示
//         }
//         return res
//     },
//     (error: any) => {
//         return Promise.reject('网络开小差儿了，请刷新重试')
//     },
// )
// export default instance