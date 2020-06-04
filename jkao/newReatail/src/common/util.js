import axios from 'axios'
import { Message, Loading } from 'element-ui';
let baseURL = '/'

if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://192.168.1.202:8086'
} else if (process.env.NODE_ENV == 'production') {
    // baseURL = proBaseUrl
    baseURL = '/'
}
export const util = axios.create({
        baseURL: baseURL,
        // baseURL: '/',
        timeout: 10000,
    })
    // 添加请求拦截器
let loadingInstance
util.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    util.openFullScreen()
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})
util.interceptors.request.use(config => {
    if (config.url !== 'exam/login') {
        const AUTH_TOKEN = sessionStorage.getItem('token')
            // config.headers.common['auth_token'] = AUTH_TOKEN;
        config.headers.common['token'] = AUTH_TOKEN;
    }
    util.openFullScreen()
    return config;
}, error => {
    return Promise.reject(error);
})
util.openFullScreen = function() {
    loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    return loadingInstance
}

util.interceptors.response.use(res => {
    loadingInstance.close()
    return res;
}, error => {
    Message.error('网络异常')
    loadingInstance.close()
    return Promise.reject(error);
})


const httpPlugin = {}

httpPlugin.install = function(Vue) {
    Vue.prototype.$axios = util
}
export default httpPlugin