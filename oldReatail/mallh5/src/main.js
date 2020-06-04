import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'amfe-flexible/index.js'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$qs = qs;
import '@/assets/base.css'
import {
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
} from 'vant';
import {
    Lazyload
} from 'vant';
import {
    ImagePreview
} from 'vant';
Vue.prototype.$axios = axios
Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton);
Vue.config.productionTip = false;
import util from '@/util/util.js'
Vue.use(util)
Vue.use(ImagePreview);
Vue.use(Vant);
Vue.use(Lazyload)
import Moment from 'moment'
Vue.filter('fmtDate', function(v) {
    return Moment(v).format('YYYY-MM-DD HH:mm:ss')
})
Vue.prototype.$moment = Moment
Vue.filter('serverUrl', function(v) {
    // return "http://192.168.1.168:8080" + v
    return "" + v
})
document.documentElement.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

// 滚动位置
let homeScrollTop = 0;
Vue.prototype.$homeScroll = homeScrollTop;

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");