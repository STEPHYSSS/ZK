/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */

//修改配置文件
import Vue from 'vue'

let baseUrl;
let routerMode = 'hash'
// let baseImgPath;


// baseImgPath = Vue.prototype.reqApi.baseUrl

export {
    baseUrl,
    routerMode
}