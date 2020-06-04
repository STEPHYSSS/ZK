import axios from 'axios';
import {
    Message,
    Loading
} from 'element-ui';
import moment from 'moment';
import router from '@/router/index.js'

let serverurl = location.hostname;
let port = location.port;
// let port = '8080'
let ajaxUrl = 'http://' + serverurl + ':' + port + '/taxexam/';
// let ajaxUrl = 'http://' + serverurl + ':' + port;

let baseUrl = ajaxUrl
let baseImgUrl = ajaxUrl

if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://192.168.1.120:8080/taxexam/';
    // baseUrl = "http://192.168.1.171:8080"
    // baseUrl = "http://192.168.1.168:8086/teach_exam/"
    // baseImgUrl = 'http://192.168.1.120:8080/taxexam/'
    // baseUrl = 'http://192.168.1.120:8080/';
    // baseImgUrl = 'http://192.168.1.120:8080/'
} else if (process.env.NODE_ENV == 'production') {
    baseUrl = ajaxUrl;
}

export const util = axios.create({
    // baseURL: baseUrl,
    timeout: 10000
})

util.isSeek = true
util.serverUrl = baseImgUrl

let loadingInstance
util.interceptors.request.use(config => {
    if (config.url !== 'exam/login') {
        const AUTH_TOKEN = sessionStorage.getItem('token')
            // config.headers.common['auth_token'] = AUTH_TOKEN;
        config.headers.common['token'] = AUTH_TOKEN;
    }
    util.openFullScreen()
    return config;
}, error => {
    return Promise.reject(error);
})

util.momentTime = function(v) {
    return moment(v).format('YYYY-MM-DD HH:mm:ss')
}

util.momentDate = function(v) {
    return moment(v).format('YYYY-MM-DD')
}


util.openFullScreen = function() {
    loadingInstance = Loading.service({
        lock: true,
        text: '拼命加载中,请稍后...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
    })
    return loadingInstance
}

util.checkStrong = function(sValue) {
    let modes = 0
    if (sValue.length < 6) return modes
    if (/\d/.test(sValue)) modes++
        if (/[a-zA-Z]/.test(sValue)) modes++
            if (/\W/.test(sValue)) modes++

                switch (modes) {
                    case 1:
                        return 1
                        break
                    case 2:
                        return 2
                        break
                        // case 3:
                        // case 4:
                        //   return sValue.length < 12 ? 3 : 4
                        //   break
                }
    return modes
}

util.interceptors.response.use(res => {
        loadingInstance.close()
        const { status, data: { code, msg } } = res
        if (code == '6666' || code == '401') {
            Message('请重新登录。。')
            router.push({ name: 'register' })
                // router.push({name : 'notFind'})
        }
        // else if (code == '6666') {
        //     Message('请重新登录。。')
        //     router.push({ name: 'register' })
        // }
        return res;
    }, error => {
        loadingInstance.close()
        return Promise.reject(error);
    })
    //证件类型转换
util.getZjlx = function(lx) {
    let strZjlx = "";
    switch (lx) {
        case "11":
            strZjlx = "中华人民共和国居民身份证";
            break;
        case "12":
            strZjlx = "中华人民共和国护照";
            break;
        case "13":
            strZjlx = "港澳居民来往内地通行证";
            break;
        case "14":
            strZjlx = "台湾居民来往大陆通行证";
            break;
        case "15":
            strZjlx = "港澳居民居住证";
            break;
        case "16":
            strZjlx = "台湾居民居住证";
            break;
        case "17":
            strZjlx = "外国护照";
            break;
        case "18":
            strZjlx = "外国人永久居留证";
            break;
        case "19":
            strZjlx = "外国人工作许可证(A类)";
            break;
        case "20":
            strZjlx = "外国人工作许可证(B类)";
            break;
        default:
            break;
    }
    return strZjlx;
}

// 以下都是tax
util.title = function(title) {
    title = title ? title + ' - 税务系统' : ' 税务系统';
    window.document.title = title;
};
util.getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var str = window.location.href;
    var params = str.substring(str.indexOf('?') + 1);
    var r = params.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
const kh = util.getQueryString('kh');
const sjh = util.getQueryString('sjh');

util.kh = kh;
util.sjh = sjh;
// util.kh = '801';
// util.sjh = '2018701';


util.time = 1; //1小时
util.setCookie = function(name, value) {
    let exp = new Date();
    let str = name + "=" + value;
    exp.setTime(exp.getTime() + util.time * 60 * 60 * 1000);
    document.cookie = str + ";expires=" + exp.toGMTString();
}

//获取cookies
util.getCookie = function(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
util.getNowFormatDate = function(t) {
    let month = '',
        strDate = '',
        y = '';
    // let month, strDate, y = '';
    let date = new Date();
    let date2 = new Date();
    let h = date2.getHours();
    if (h < 10) h = "0" + h;
    let m = date2.getMinutes();
    if (m < 10) m = "0" + m;
    let s = date2.getSeconds();
    if (s < 10) s = "0" + s;
    let seperator1 = "-";
    let seperator2 = ":";
    let currentdate = "";
    if (t) {
        currentdate = t + " " + h + seperator2 + m + seperator2 + s;
        window.sessionStorage.zfrq = t;
    } else {
        month = date.getMonth() + 1;
        strDate = date.getDate();
        y = date.getFullYear();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        window.sessionStorage.zfrq = y + seperator1 + month + seperator1 + strDate;
        currentdate = y + seperator1 + month + seperator1 + strDate +
            " " + h + seperator2 + m +
            seperator2 + s;
    }

    return currentdate;
}

//申报状态转换
util.getSbzt = function(sbzt) {
        let strSbzt = "";
        switch (sbzt) {
            case "10":
                strSbzt = "未填写";
                break;
            case "11":
                strSbzt = "填写不完整";
                break;
            case "12":
                strSbzt = "填写完整";
                break;
            case "13":
                strSbzt = "申报作废";
                break;
            case "16":
                strSbzt = "申报成功";
                break;
            case "17":
                strSbzt = "缴款成功";
                break;
            default:
                break;
        }
        return strSbzt;
    }
    //填写状态转换
util.getTxzt = function(zt) {
        let strzt = "";
        switch (zt) {
            case "21":
                strzt = "未填写";
                break;
            case "22":
                strzt = "已填写";
                break;
            case "23":
                strzt = "暂不能填写";
                break;
            default:
                break;
        }
        return strzt;
    }
    //发票类型代码转换
util.getFpDmMc = function(dm) {
        let str = "";
        switch (dm) {
            case "11":
                str = "防伪税控专用发票";
                break;
            case "12":
                str = "税控机动车专用发票";
                break;
            case "13":
                str = "海关缴款书";
                break;
            case "14":
                str = "农副产品收购发票";
                break;
            case "15":
                str = "农副产品取得发票";
                break;
            case "16":
                str = "代扣代缴通用缴款书";
                break;
            case "21":
                str = "增值税专用发票";
                break;
            case "22":
                str = "税控机动车发票";
                break;
            case "23":
                str = "增值税普通发票";
                break;
            case "24":
                str = "无票视同销售";
                break;
            case "25":
                str = "纳税检查调整";
                break;
            default:
                break;
        }
        return str;
    }
    //日期格式转换yyyy-mm-dd 转换成年月日
util.dateFormat = function(str) {
        if (str) {
            let arr = str.split('-');
            return arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
        } else {
            return "";
        }
    }
    //日期格式转换yyyy-mm-dd 转换成年月
util.dateFormatNOdd = function(str) {
    if (str) {
        let arr = str.split('-');
        return arr[0] + '年' + arr[1] + '月';
    } else {
        return "";
    }
};
//传入2017-12-13 传出2017-12-14
util.getNextDate = function(dayStr) {
    let dd = new Date(dayStr);
    dd.setDate(dd.getDate() + 1);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1; //获取当前月份的日期
    m = m > 9 ? m : '0' + m;
    let d = dd.getDate();
    d = d > 9 ? d : '0' + d
    return y + "-" + m + "-" + d;
};

const httpPlugin = {}

httpPlugin.install = function(Vue) {
    Vue.prototype.$utils = util
}

export default httpPlugin