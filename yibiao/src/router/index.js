import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
        mode: 'hash',
        routes: [{
                path: '/',
                redirect: '/login'
            },
            {
                name: 'login',
                path: '/login',
                component: (resolve) => require(['@/views/login'], resolve),
            },
            {
                name: 'home',
                path: '/home',
                component: (resolve) => require(['@/views/home'], resolve),
            },
            {
                name: 'phoneBook',
                path: '/phoneBook',
                component: (resolve) => require(['@/views/phoneBook'], resolve),
            },
            { //我的
                name: 'myInfo',
                path: '/myInfo',
                component: (resolve) => require(['@/views/myInfo/myInfo'], resolve),
            },
            { //广告
                name: 'advertisement',
                path: '/advertisement',
                component: (resolve) => require(['@/views/advertisement'], resolve),
            },
            { //考勤打卡
                name: 'clockIn',
                path: '/clockIn',
                component: (resolve) => require(['@/views/score/clockIn'], resolve),
            },
            { //自评打分
                name: 'scroing',
                path: '/scroing',
                component: (resolve) => require(['@/views/score/scroing'], resolve),
            },
            { //自评打分
                name: 'test',
                path: '/test',
                component: (resolve) => require(['@/views/score/test'], resolve),
            },
            // { //岗位标准
            //     name: 'jobStandard',
            //     path: '/jobStandard',
            //     component: (resolve) => require(['@/views/score/jobStandard'], resolve),
            // },
            { //申诉管理
                name: 'grievanceManagement',
                path: '/grievanceManagement',
                component: (resolve) => require(['@/views/score/grievanceManagement'], resolve),
            },
            { //出勤打卡
                name: 'attendancePunch',
                path: '/attendancePunch',
                component: (resolve) => require(['@/views/score/attendancePunch'], resolve),
            }, { //岗位标准
                name: 'postStandard',
                path: '/postStandard',
                component: (resolve) => require(['@/views/PostStandard/postStandard'], resolve)
            }, { //岗位详情 positionDetail
                name: 'positionDetail',
                path: '/positionDetail',
                component: (resolve) => require(['@/views/PostStandard/positionDetail'], resolve)
            }, { //轮岗经历 workingExperience
                name: 'workingExperience',
                path: '/workingExperience',
                component: (resolve) => require(['@/views/PostStandard/workingExperience'], resolve)
            }, { //出勤休假 AttendanceOnVacation
                name: 'attendanceOnVacation',
                path: '/attendanceOnVacation',
                component: (resolve) => require(['@/views/AttendanceOnVacation/attendanceOnVacation'], resolve),
                // meta: {
                //     keepAlive: true // 需要被缓存
                // }
            },
            { //新增出勤休假 addAttendance
                name: 'addAttendance',
                path: '/addAttendance',
                component: (resolve) => require(['@/views/AttendanceOnVacation/addAttendance'], resolve)
            },
            { //出勤休假审核 reviewOperation
                name: 'reviewOperation',
                path: '/reviewOperation',
                component: (resolve) => require(['@/views/AttendanceOnVacation/reviewOperation'], resolve)
            },
            { //出勤休假详情 attendanceDetail
                name: 'attendanceDetail',
                path: '/attendanceDetail',
                component: (resolve) => require(['@/views/AttendanceOnVacation/attendanceDetail'], resolve)
            }, { //通讯录 addressBook
                name: 'addressBook',
                path: '/addressBook',
                component: (resolve) => require(['@/views/TheAddressBook/addressBook'], resolve)
            }, { //通讯录详情 addressBookDetail
                name: 'addressBookDetail',
                path: '/addressBookDetail',
                component: (resolve) => require(['@/views/TheAddressBook/addressBookDetail'], resolve)
            }, { //个人信息 personalInfo
                name: 'personalInfo',
                path: '/personalInfo',
                component: (resolve) => require(['@/views/myInfo/personalInfo'], resolve)
            }, { //设置 setUp
                name: 'setUp',
                path: '/setUp',
                component: (resolve) => require(['@/views/myInfo/setUp'], resolve)
            }, { //版本历史 version
                name: 'version',
                path: '/version',
                component: (resolve) => require(['@/views/myInfo/version'], resolve)
            }, { // 修改密码 changePwd
                name: 'changePwd',
                path: '/changePwd',
                component: (resolve) => require(['@/views/myInfo/changePwd'], resolve)
            }, { //我的考勤 myAttendance
                name: 'myAttendance',
                path: '/myAttendance',
                component: (resolve) => require(['@/views/myInfo/myAttendance'], resolve)
            }, { //打卡日历 clockCalendar
                name: 'clockCalendar',
                path: '/clockCalendar',
                component: (resolve) => require(['@/views/myInfo/clockCalendar'], resolve)
            },
            { //个人评分
                name: 'personalRating',
                path: '/personalRating',
                component: (resolve) => require(['@/views/score/personalRating'], resolve),
            },
            { //评分新增
                name: 'ratingReview',
                path: '/ratingReview',
                component: (resolve) => require(['@/views/score/ratingReview'], resolve),
            },
            { //评分审核
                name: 'approva',
                path: '/approva',
                component: (resolve) => require(['@/views/score/approva'], resolve),
            },
            { //评分详情表格页
                name: 'scoringDetails',
                path: '/scoringDetails',
                component: (resolve) => require(['@/views/score/scoringDetails'], resolve),
            },
            { //评分详情员工表格页
                name: 'staffScoringDetails',
                path: '/staffScoringDetails',
                component: (resolve) => require(['@/views/score/staffScoringDetails'], resolve),
            },

            { //申诉详情
                name: 'complaintDetails',
                path: '/complaintDetails',
                component: (resolve) => require(['@/views/score/complaintDetails'], resolve),
            },
            { // 个人申诉
                name: 'personalComplaints',
                path: '/personalComplaints',
                component: (resolve) => require(['@/views/score/personalComplaints'], resolve),
            },
            { // 申诉审核
                name: 'toExamine',
                path: '/toExamine',
                component: (resolve) => require(['@/views/score/toExamine'], resolve),
            },
            { // 百度地图
                name: 'map',
                path: '/map',
                component: (resolve) => require(['@/views/score/map'], resolve),
            },



        ]
    })
    //路由白名单，没有权限也能访问的页面
let whiteList = ['/login', '/home']
    //全局前置导航守卫，每次跳转前都会调用该
router.beforeEach((to, from, next) => {
    next()
    if (to.path == '/map' && from.path == '/clockIn') {
        next()
    } else if (to.path == '/clockIn' && from.path == '/map') {
        next()
    } else if (to.path == '/clockIn') {
        next()
    } else if (to.path == '/map') {
        next()
    } else {
        if (sessionStorage.getItem('photo') || sessionStorage.getItem('type')) {
            sessionStorage.removeItem('photo')
            sessionStorage.removeItem('type')
        }
        next()
    }

    //to是将要访问的路由对象
    //from是将要离开的路由对象
    //访问路径在白名单内，任其跳转
    if (whiteList.includes(to.path)) {
        next() //记住一定要next()
    } else {
        if (sessionStorage.getItem('token')) { //已经登录的，任其跳转
            next()
        } else {
            // alert('请先登录')
            // next('/login') //没有登录的跳转到登录页面
        }
    }
})
export default router
