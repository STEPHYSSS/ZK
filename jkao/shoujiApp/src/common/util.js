import axios from 'axios'
let baseUrl = '/'
if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://192.168.1.168:8086/';
    baseUrl = 'http://192.168.1.202:8086/';
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = '/';
}
export const util = axios.create({
    baseURL: baseUrl,
    // baseURL: '/'
    // baseURL: ajaxUrl,
    // timeout: 60000,
})
const httpPlugin = {}

httpPlugin.install = function(Vue) {
    Vue.prototype.$axios = util
}

export default httpPlugin