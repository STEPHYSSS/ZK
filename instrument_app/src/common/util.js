import axios from 'axios';
// import moment from 'moment';
import router from '@/router/index.js'
import { Toast } from 'vant';
// debugger
let serverurl = location.hostname;
let port = location.port;
let ajaxUrl = 'http://' + serverurl + ':' + port + '/taxexam/';
// let ajaxUrl = 'http://' + serverurl + ':' + port;

let baseUrl = ajaxUrl

if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {
    baseUrl = ajaxUrl;
}

export const util = axios.create({
    // baseURL: baseUrl,
    timeout: 10000
})
let loadingInstance
util.interceptors.request.use(config => {
    if (config.url !== '/login') {
        const AUTH_TOKEN = sessionStorage.getItem('token')
            // config.headers.common['auth_token'] = AUTH_TOKEN;
        config.headers.common['token'] = AUTH_TOKEN;
    }
    // util.openFullScreen()
    return config;
}, error => {
    return Promise.reject(error);
})

util.interceptors.response.use(res => {
    // loadingInstance.close()
    const { status, data: { code, msg } } = res
    if (code == '6666') {
        Toast('请先登录')
            // Message('请重新登录。。')
        router.push({ name: 'login' })
            // router.push({name : 'notFind'})
    }
    return res;
}, error => {
    return Promise.reject(error);
})

const httpPlugin = {}

httpPlugin.install = function(Vue) {
    Vue.prototype.$utils = util
}

export default httpPlugin