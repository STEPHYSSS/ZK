import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
import Util from './common/util';
import Axios from 'axios'
import router from './router'
import myBread from '@/components/myBread.vue'
import myBread2 from '@/components/myBread2.vue'
import myCrumbs from '@/components/myCrumbs.vue'
import addHeader from '@/components/addHeader.vue'
import addBtn from '@/components/addBtn.vue'
import moment from 'moment'
import echarts from 'echarts'
import 'babel-polyfill'
import './style/base.css'
import './style/litao.css'
import './style/cx.css'
// import './style/tax.css'
import './style/lookDe.css'
import './style/taxFonts/iconfont.css'
import './style/font/iconfont.css'
// import './views/clientGs/gs.css'
//日历插件
import component from './components/VueDatepickerLocal.vue'



Vue.use(ElementUI)
Vue.prototype.$axios = Axios;
Vue.use(Util)
Vue.prototype.$echarts = echarts

Vue.component(myBread.name, myBread)
Vue.component(myBread2.name, myBread2)
Vue.component(addHeader.name, addHeader)
Vue.component(addBtn.name, addBtn)
Vue.component(myCrumbs.name, myCrumbs);

//公用日历组件
Vue.component(component.name, component)

Vue.filter('fmtDate', function(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('fmtDate1', function(v) {
    return moment(v).format('YYYY-MM-DD')
})
Vue.filter('monthDate', function(v) {
    return moment(v).format('YYYY-MM')
})
Vue.filter('converTime', function(data, formatStr) {
    return moment(data).format(formatStr);
})
Vue.filter('fmtDate2', function(v) {
    return moment(v).format('YYYY-MM-DD')
})
Vue.prototype.$moment = moment
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path == '/examinationAnalysis' && from.path == '/specificAnalysis') {
        next()
    } else if (from.path == '/examinationAnalysis' && to.path == '/specificAnalysis') {
        next()
    } else {
        if (sessionStorage.getItem('examId')) {
            sessionStorage.removeItem('examId')
        }
        next()
    }
})



//vue滚动条插件
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import VueDatepickerLocal from "./components/VueDatepickerLocal";
import VueDatepickerLocalCalendar from "./components/VueDatepickerLocalCalendar";
Vue.use(vuescroll);
//修改配置文件
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.reqApi = {}
    // Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.202:8086/teach_exam'
    // console.log(123)
    // 请求文件内容
function getServerConfig() {
    return new Promise((resolve, reject) => {
        axios.get('./static/serverConfig.json').then(result => {
            Vue.prototype.reqApi = result.data;
            if ('http:' == window.location.protocol) {
                Vue.prototype.reqApi.ziyuankuUrl = Vue.prototype.reqApi.ziyuankuUrl.replace('https', 'http')
                Vue.prototype.reqApi.fileUpload = Vue.prototype.reqApi.fileUpload.replace('https', 'http')
                Vue.prototype.reqApi.fileyulan = Vue.prototype.reqApi.fileyulan.replace('https', 'http')
                Vue.prototype.reqApi.shuiwuUrl = Vue.prototype.reqApi.shuiwuUrl.replace('https', 'http')
                Vue.prototype.reqApi.xinls = Vue.prototype.reqApi.xinls.replace('https', 'http')
            }

            if (process.env.NODE_ENV == 'development') {
                Vue.prototype.reqApi.ziyuankuUrl = 'http://192.168.1.202:8086/resource/'
                Vue.prototype.reqApi.fileUpload = 'http://192.168.1.202:8086/resource/'
                Vue.prototype.reqApi.fileyulan = "http://192.168.1.202:8086/resource/"
                Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.202:8086/teach_exam/'
                    // Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.171:8080'
                Vue.prototype.reqApi.xinls = 'http://192.168.1.202:8086'
                    /*  Vue.prototype.reqApi.xinls = 'http://demo2.seekerp.com/teach_exam'
                  Vue.prototype.reqApi.ziyuankuUrl = 'http://demo2.seekerp.com/teach_exam'
                  Vue.prototype.reqApi.fileUpload = 'http://demo2.seekerp.com/teach_exam'
                  Vue.prototype.reqApi.fileyulan = "http://demo2.seekerp.com/teach_exam"
                      // Vue.prototype.reqApi.shuiwuUrl = 'http://192.168.1.168:8086/teach_exam/'
                  Vue.prototype.reqApi.shuiwuUrl = 'http://demo2.seekerp.com/teach_exam'
              Vue.prototype.reqApi.xinls = 'http://demo2.seekerp.com/' */
            } else if (process.env.NODE_ENV == 'production') {}
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
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
})