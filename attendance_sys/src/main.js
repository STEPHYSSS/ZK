// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
import moment from 'moment'
Vue.use(ElementUI)

Vue.config.productionTip = false
import './style/base.css'
import './style/lt.css'
import './style/secondary.css'

Vue.filter('fmtDate', function(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
})

import VueAMap from 'vue-amap'
Vue.use(VueAMap)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: '627864f9f696fb26c6e2f60fce090135',
  plugin: ['AMap.Geolocation', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'Geocoder', 'AMap.Autocomplete'],
  uiVersion: '1.0.11' // 版本号
})
// 请求文件内容
import axios from 'axios'
Vue.prototype['reqApi'] = {}
Vue.prototype['reqApi']['baseUrl'] = sessionStorage.baseUrl
Vue.prototype['reqApi']['baseImgUrl'] = sessionStorage.baseImgUrl
function getServerConfig() {
    return new Promise((resolve, reject) => {
        axios.get('./static/serverConfig.json').then(result => {
            Vue.prototype.reqApi = result.data;
            let protocol = window.location.protocol
            if ('http:' == protocol) {
                Vue.prototype.reqApi.baseUrl = Vue.prototype.reqApi.baseUrl.replace('https', 'http')
                Vue.prototype.reqApi.baseImgUrl = Vue.prototype.reqApi.baseImgUrl.replace('https', 'http')
            }
            sessionStorage.baseUrl = Vue.prototype.reqApi.baseUrl
            sessionStorage.baseImgUrl = Vue.prototype.reqApi.baseImgUrl
            resolve();
        })
    })
    }
    // 请求文件内容及创建实例
    async function main() {
        await getServerConfig();
    }
    // 方法初始执行
    main();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})