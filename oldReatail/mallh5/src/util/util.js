import axios from 'axios'

/* let devUrl = 'http://192.168.1.168:8080/'
    // let protocol = location.protocol //1
    // let hostname = location.hostname //2
    // let port = location.port //3
let pathname = location.pathname //4
let baseURL = ''
let proBaseUrl = pathname

if (process.env.NODE_ENV == 'development') {
    baseURL = devUrl
} else if (process.env.NODE_ENV == 'production') {
    // baseURL = proBaseUrl
    baseURL = './'
}
export const util = axios.create({
    // baseURL: baseURL,
    baseURL: '/',
    // baseURL: ajaxUrl,
    timeout: 10000,
}) */
// let devUrl = 'http://192.168.1.168:8080/';
// let protocol = location.protocol //1
// let hostname = location.hostname //2
// let port = location.port //3
// let pathname = location.pathname; //4
// let baseURL = '';
// let proBaseUrl = pathname;
let baseURL = ''
if (process.env.NODE_ENV == 'development') {
    // baseURL = 'http://192.168.1.131:8080/'
} else if (process.env.NODE_ENV == 'production') {
    // baseURL = proBaseUrl
    baseURL = '/';
};
export const util = axios.create({
    baseURL: baseURL,
    // baseURL: '/',
    timeout: 10000,
});

const httpPlugin = {};

httpPlugin.install = function(Vue) {
    Vue.prototype.$axios = util;
};
export default httpPlugin;