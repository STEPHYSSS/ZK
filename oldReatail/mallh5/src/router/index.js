import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
// import Home from "@/views/Home.vue";
import Home from "../views/Home.vue";
import Card from "../views/Card.vue";
import login from '@/components/login/login.vue'
import register from '@/components/login/register.vue'
import myOrder from '@/components/login/myOrder.vue'
import myinfo from '@/components/information/myinfo.vue' //我的信息
import addresList from '@/components/information/addresList.vue' // 我的地址
import addressEdit from '@/components/information/addressEdit.vue' //地址新增编辑
import Classification from "../views/Classification.vue"; //商品分类
import shopsInfo from '../components/classifi/shopsInfo.vue'; //商品信息
import goodsDetail from "../components/classifi/goodsDetail.vue"; //商品详情
import buyNow from "@/components/classifi/buyNow.vue" //立即购买
import pay from "@/components/classifi/pay.vue" //支付方式
import alreadySigned from '@/components/information/alreadySigned.vue' // 订单签收
import orderCompleted from '@/components/information/orderCompleted.vue' // 订单已完成
import infosetting from '@/components/information/infosetting.vue' // 设置
import presonalInfo from '@/components/information/presonalInfo.vue' //个人信息
import checkPsw from '@/components/information/checkPsw.vue' // 修改密码
import couponList from '@/components/information/couponList.vue' //优惠券列表
import integralList from '@/components/information/integralList.vue' // 积分列表





const routes = [{
        path: "/",
        component: Home,
        redirect: "/Home"
    },
    {
        path: "/Home",
        name: "Home",
        component: Home
    }, {
        path: "/Card",
        name: "Card",
        component: Card
    }, {
        path: "/Classification",
        name: "Classification",
        component: Classification
    }, {
        path: "/shopsInfo",
        name: "shopsInfo",
        component: shopsInfo
    }, {
        path: "/goodsDetail",
        name: "goodsDetail",
        component: goodsDetail
    }, {
        path: '/buyNow',
        name: "buyNow",
        component: buyNow
    }, {
        path: '/pay',
        name: "pay",
        component: pay
    }, {
        path: "/login",
        name: "login",
        component: login

    },
    {
        path: "/register",
        name: "register",
        component: register
    },

    {
        path: "/myOrder",
        name: "myOrder",
        component: myOrder
    },
    {
        path: "/myinfo",
        name: "myinfo",
        component: myinfo
    },
    {
        path: "/addresList",
        name: "addresList",
        component: addresList
    },
    {
        path: "/alreadySigned",
        name: "alreadySigned",
        component: alreadySigned
    },
    {
        path: "/orderCompleted",
        name: "orderCompleted",
        component: orderCompleted
    },
    {
        path: "/infosetting",
        name: "infosetting",
        component: infosetting
    },
    {
        path: "/presonalInfo",
        name: "presonalInfo",
        component: presonalInfo
    },
    {
        path: "/checkPsw",
        name: "checkPsw",
        component: checkPsw
    },
    {
        path: "/couponList",
        name: "couponList",
        component: couponList
    },
    {
        path: "/integralList",
        name: "integralList",
        component: integralList
    },
    {
        path: "/addressEdit",
        name: "addressEdit",
        component: addressEdit
    },



];
const router = new VueRouter({
    mode: "hash",
    // base: process.env.BASE_URL,
    routes
});

export default router;