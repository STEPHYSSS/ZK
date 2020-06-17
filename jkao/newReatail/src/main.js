import Vue from 'vue'
import App from './App.vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// import Axios from 'axios'
// import qs from 'qs'
// import { Promise } from 'q';
// 1.2 安装路由
Vue.use(VueRouter)
    // Vue.prototype.$axios = Axios;







import Moment from 'moment'
Vue.filter('converTime', function(data, formatStr) {
    return Moment(data).format(formatStr);
})
Vue.filter('fmtDate', function(v) {
    return Moment(v).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('fmtDate1', function(v) {
    return Moment(v).format('HH:mm')
})
Vue.filter('fmtDate2', function(v) {
    return Moment(v).format('YYYY-MM-DD')
})
Vue.prototype.$moment = Moment

// console.log(location.origin + location.pathname)
import ElementUI from 'element-ui'
import VDistpicker from 'v-distpicker'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './styles/common.css'
import './styles/zStyle.css'
import './static/http.js'
import util from '@/common/util.js'
Vue.use(util)
Vue.use(ElementUI)
    // 注册全局组件
Vue.component('v-distpicker', VDistpicker)

Vue.prototype.uploadUrl = ''

if (process.env.NODE_ENV == 'development') {
    // Vue.prototype.uploadUrl = 'http://192.168.1.202:8086'
}


// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
    //1.3导入自己的路由
import router from './router.js'

// no-unused-vars
//  new Vue({
//     el: '#app',
//     router,
//     render: c => c(App)
// })


new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

/* 
let startApp = function() {
    axios.get('/static/config.json').then((res) => {
        // 基础地址
        Vue.prototype.BASE_URL = res.BASE_URL;
        new Vue({
                el: '#app',
                router,
                render: h => h(App)
            })
            //   new Vue({
            //     el: '#app',
            //     router,
            //     store,
            //     components: {
            //       App
            //     },
            //     template: '<App/>'
            //   })
    })
}

startApp() */