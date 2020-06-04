import axios from 'axios';
import { Message, Loading } from 'element-ui';

let service = axios.create({
    // baseURL: baseUrl,
    timeout: 30000
});

let loadingInstance;

service.openFullScreen = function() {
    loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
    })
    return loadingInstance
}

/* 请求拦截 */
service.interceptors.request.use(config => {
    if (config.url !== 'exam/login') {
        const AUTH_TOKEN = sessionStorage.getItem('token')
        config.headers.common['token'] = AUTH_TOKEN;
    }
    service.openFullScreen()
    return config;
}, error => {
    return Promise.reject(error);
});

/* 响应拦截 */
service.interceptors.response.use(res => {
    loadingInstance.close()
    const { status, data: { code, msg } } = res
    if (code == '999') {
        // router.push({name : 'notFind'})
    } else if (code == '33') {
        Message('请重新登录。')
        router.push({ name: 'register' })
    }
    return res;
}, error => {
    loadingInstance.close()
    return Promise.reject(error);
})

export default service;