import Vue from 'vue'
import VueRouter from 'vue-router'
import cxPage from './cxPage/cxPage' //学生端
import myPage from './myPage/myPage' // 老师端
// const routerPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error)
// }
Vue.use(VueRouter)
    /* import axios from 'axios'

    function getServerConfig() {
        return new Promise((resolve, reject) => {

            axios.get('./static/serverConfig.json').then(result => {
                let rdata = result
                if (!result.data.ziyuankuUrl || result.data.ziyuankuUrl == undefined) {
                    axios.get('../../static/serverConfig.json').then(res => {
                        rdata = res
                    })
                }
                Vue.prototype.reqApi = rdata.data;
                if ('http:' == window.location.protocol) {
                    Vue.prototype.reqApi.ziyuankuUrl = Vue.prototype.reqApi.ziyuankuUrl.replace('https', 'http')
                    Vue.prototype.reqApi.fileUpload = Vue.prototype.reqApi.fileUpload.replace('https', 'http')
                    Vue.prototype.reqApi.fileyulan = Vue.prototype.reqApi.fileyulan.replace('https', 'http')
                    Vue.prototype.reqApi.shuiwuUrl = Vue.prototype.reqApi.shuiwuUrl.replace('https', 'http')
                    Vue.prototype.reqApi.xinls = Vue.prototype.reqApi.xinls.replace('https', 'http')
                }
                if (process.env.NODE_ENV == 'development') {
                    // Vue.prototype.reqApi.ziyuankuUrl = 'http://192.168.1.120:8080/resource_exam/'
                    // Vue.prototype.reqApi.fileUpload = 'http://192.168.1.120:8081/'
                    // Vue.prototype.reqApi.fileyulan = "http://192.168.1.120:8012"
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
    main(); */

const router = new VueRouter({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/register',
        },
        {
            name: 'register',
            path: '/register',
            component: (resolve) => require(['@/views/register'], resolve),
        },
        { //老师端首页
            name: 'mindex',
            path: '/mindex',
            component: (resolve) => require(['@/views/mindex'], resolve), // 老师端顶部和侧边栏
            redirect: '/mpage',
            children: [
                ...myPage
            ]
        },
        // cx  老师端顶部和侧边栏
        {
            name: 'index',
            path: '/index',
            component: (resolve) => require(['@/views/index.vue'], resolve),
            redirect: '/page',
            children: [
                ...cxPage
            ]
        },
        { //开始考试
            name: 'exam',
            path: '/exam',
            // path: '/exam',
            component: (resolve) => require(['@/views/cx/myTest/exam'], resolve),
        },
        {
            name: 'notFind',
            path: '*',
            component: (resolve) => require(['@/views/notFind'], resolve),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

/* 导航守卫*/
router.beforeEach((to, from, next) => {
    if (to.path === '/register') {
        sessionStorage.removeItem('token')
        next()
    }
    next()
})
export default router