import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [
        { path: '/', component: login, redirect: '/login' },
        { path: '/login', component: login, name: 'login' },
        {
            path: '/cashier',
            name: 'cashier',
            component: () =>
                import ('./views/cashier.vue')
        }, {
            path: '/shif',
            name: 'shif',
            component: () =>
                import ('./views/shif.vue')
        }, {
            path: '/query',
            name: 'query',
            component: () =>
                import ('./views/query.vue')
        }, {
            path: '/receipts',
            name: 'receipts',
            component: () =>
                import ('./views/receipts.vue')
        }, {
            path: '/moneyhome',
            name: 'moneyhome',
            component: () =>
                import ('./components/moneyhome.vue')
        }

    ]
})