// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/base.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Vant);
import { Lazyload } from "vant"

Vue.use(Lazyload)
import 'vant/lib/index.css';
// Vue.use(Table)
// rem h5 适配
import 'amfe-flexible/index.js'
Vue.use(ElementUI);


// 百度地图
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//     ak: 'GpRqD2Sowifs********RRRRVl9'
// });
// import BMap from 'BMap'



import Moment from 'moment'
Vue.filter('fmtDate', function(v) {
    return Moment(v).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('fmtDateHour', function(v) {
    return Moment(v).format('HH:mm:ss')
})
Vue.filter('fmtDate1', function(v) {
    return Moment(v).format('YYYY-MM-DD')
})
Vue.filter('fmtDateYear', function(v) {
    return Moment(v).format('YYYY')
})
Vue.filter('conTime', function(data, formatStr) {
    return Moment(data).format(formatStr);
})
Vue.prototype.$moment = Moment
import Util from './common/util';
Vue.use(Util)
Vue.config.productionTip = false
    //修改配置文件
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.reqApi = {}
let serverurl = location.hostname;
let port = location.port;
let ajaxUrl = 'http://' + serverurl + ':' + port;
Vue.prototype.reqApi['yiBSchool'] = ajaxUrl
    // Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.202:8086/teach_exam'
    // console.log(123)
    // 请求文件内容

// import vConsole from 'vconsole'

// // 移动端打印
// Vue.prototype.$vConsole = new vConsole()

function getServerConfig() {
    return new Promise((resolve, reject) => {
        axios.get('./static/serverConfig.json').then(result => {
            Vue.prototype.reqApi = result.data;
            if ('http:' == window.location.protocol) {
                Vue.prototype.reqApi.ziyuankuUrl = Vue.prototype.reqApi.ziyuankuUrl.replace('https', 'http')
                Vue.prototype.reqApi.fileUpload = Vue.prototype.reqApi.fileUpload.replace('https', 'http')
                Vue.prototype.reqApi.fileyulan = Vue.prototype.reqApi.fileyulan.replace('https', 'http')
                Vue.prototype.reqApi.shuiwuUrl = Vue.prototype.reqApi.shuiwuUrl.replace('https', 'http')
                    // Vue.prototype.reqApi.xinls = Vue.prototype.reqApi.xinls.replace('https', 'http')
                Vue.prototype.reqApi.yiBSchool = Vue.prototype.reqApi.yiBSchool.replace('https', 'http')
            }

            if (process.env.NODE_ENV == 'development') {
                Vue.prototype.reqApi.yiBSchool = 'http://192.168.1.202:8085'
                // Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.131:8080'

            } else if (process.env.NODE_ENV == 'production') {
                // Vue.prototype.reqApi.yiBSchool = 'http://192.168.1.171:8085'
            }
            resolve();
        })
    })
}
window.onload = function() {
        // 阻止双击放大
        var lastTouchEnd = 0;
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        document.addEventListener('touchend', function(event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // 阻止双指放大
        document.addEventListener('gesturestart', function(event) {
            event.preventDefault();
        });
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
