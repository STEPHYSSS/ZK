import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './lib/mui/css/mui.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import util from '../src/common/util'
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.filter('converTime', function(data, formatStr) {
    return moment(data).format(formatStr);
})
Vue.filter('numFilter', function(value) {
        // 截取当前数据到小数点后两位
        let realVal = parseFloat(value).toFixed(2)
        return realVal
    })
    // Vue.filter('fmtDate', function(v) {
    //     console.log(v)
    //     return moment(v).format('YYYY-MM-DD hh:mm:ss')
    // })
Vue.filter('fmtDate', function(value, format = "YYYY-MM-DD HH:mm:ss") {
    if (value) {
        return moment(value).format(format)
    }

})
Vue.prototype.teacherSide = '/teach_exam/'
Vue.prototype.backExam = '/teach_exam/'
Vue.prototype.getToken = ''
if (process.env.NODE_ENV == 'development') {
    Vue.prototype.teacherSide = 'http://192.168.1.202:8086/teach_exam/';
    Vue.prototype.backExam = 'http://192.168.1.202:8086/teach_exam/';
    Vue.prototype.getToken = 'http://192.168.1.202:8086/'
}

import Mint from 'mint-ui'
import { Tabbar, TabItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
import './assets/common/common.css'
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Mint);
Vue.use(util)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')