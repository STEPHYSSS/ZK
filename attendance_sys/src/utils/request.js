import axios from 'axios';
import { Message } from 'element-ui';
// import { baseUrl } from './env'

let service = axios.create({
    // baseURL: baseUrl,
    timeout: 60000
});

/* 请求拦截 */
service.interceptors.request.use(config => {
    if (config.url !== 'exam/login') {
        const AUTH_TOKEN = sessionStorage.getItem('token')
        config.headers.common['token'] = AUTH_TOKEN;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

/* 响应拦截 */
service.interceptors.response.use(res => {
    const {  data: { code, msg } } = res
    if (code == '0000') {
    } else if (code == '6666') {
        Message.error('Token超时，请重新登录')
        router.push({ name: 'login' })
    } else {
        Message.error(msg)
    }
    return res;
}, error => {
    return Promise.reject(error);
})

export default service;